# Technical Design: Medical Consultation Transcription

## 1. References

- **Constitution**: `/examples/CONSTITUTION.md`
- **Use Case**: `/examples/tasks/usecase-transcribe-consultation.md`
- **Created**: 2025-11-23
- **Status**: Draft

## 2. Overview

This document specifies the technical implementation for the two-phase medical consultation transcription feature. The system provides live transcription during consultations using the Web Speech API, then generates an optimized version via external LLM API after the consultation ends.

### High-Level Architecture

```
Doctor's Browser → Web Speech API (live) → Frontend State → Display
                ↓
        MediaRecorder API → Audio Blob
                ↓
        POST /api/consultations → Golang Backend → Async Job Queue
                ↓
        External LLM API → Optimized Transcription
                ↓
        Database Storage ← Polling (GET /api/consultations/:id)
```

## 3. Constitutional Constraints

Per `CONSTITUTION.md`:

- **Speed of Delivery**: Ship MVP with minimal dependencies (Web Speech API + external LLM only)
- **Test Critical Paths Only**: Focus tests on audio upload, LLM integration, data persistence
- **Trust LLM**: Use external LLM for optimization without custom post-processing
- **Ship Through Automation**: Heroku deployment via GitHub Actions on merge to main
- **Privacy by Default**: No cloud storage of audio; ephemeral processing only

### Technology Stack

- **Backend**: Golang with standard library + Gorilla/Mux
- **Frontend**: Vue3 Composition API
- **Deployment**: Heroku
- **External Services**: LLM API (e.g., OpenAI Whisper for optimization)

## 4. System Components

### Frontend Components (Vue3)

1. **ConsultationRecorder.vue**
   - Manages Web Speech API lifecycle
   - Handles MediaRecorder for audio capture
   - Displays live transcription in real-time
   - Uploads audio blob on stop

2. **ConsultationsList.vue**
   - Fetches consultations from backend API
   - Displays status (processing/completed)
   - Polls for optimization completion
   - Shows both live and optimized transcriptions

3. **Composables**
   - `useSpeechRecognition.js`: Web Speech API wrapper
   - `useAudioRecorder.js`: MediaRecorder wrapper
   - `useConsultations.js`: API client for consultations

### Backend Services (Golang)

1. **HTTP Handlers** (`handlers/consultations.go`)
   - `POST /api/consultations`: Create consultation, start async optimization
   - `GET /api/consultations`: List consultations for current doctor
   - `GET /api/consultations/:id`: Get single consultation with status

2. **Job Queue** (`jobs/transcription.go`)
   - In-memory channel-based queue (MVP)
   - Worker pool for async LLM calls
   - Constitutional alignment: Simple, ships fast

3. **LLM Client** (`services/llm.go`)
   - External LLM API integration
   - Audio upload and transcription retrieval
   - Error handling and retries

4. **Repository** (`repository/consultations.go`)
   - Database operations (Heroku Postgres)
   - CRUD for consultation records

## 5. Data Flow

### Recording Phase

```
1. Doctor clicks "Start Recording"
   → Frontend: Initialize Web Speech API + MediaRecorder
   → Frontend: Display live transcription in UI

2. Doctor clicks "Stop Recording"
   → Frontend: Stop both APIs, get audio blob
   → Frontend: POST to /api/consultations with:
      - liveTranscription (string)
      - audioFile (multipart/form-data)
   → Backend: Create DB record (status: "processing")
   → Backend: Enqueue optimization job
   → Backend: Return consultation ID
   → Frontend: Navigate to consultations list
```

### Optimization Phase

```
1. Background Worker
   → Dequeue job
   → Upload audio to external LLM API
   → Poll LLM for completion (or webhook if available)
   → Receive optimized transcription
   → Update DB record (status: "completed", optimizedTranscription)

2. Frontend Polling
   → Every 5 seconds: GET /api/consultations/:id
   → Check status field
   → Display optimized transcription when status = "completed"
```

## 6. API Specifications

### POST /api/consultations

**Request**:
```http
POST /api/consultations HTTP/1.1
Content-Type: multipart/form-data

liveTranscription: "Patient reports headache for 3 days..."
audioFile: <binary audio data>
```

**Response** (201 Created):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "processing",
  "liveTranscription": "Patient reports headache for 3 days...",
  "optimizedTranscription": null,
  "createdAt": "2025-11-23T10:30:00Z"
}
```

### GET /api/consultations

**Response** (200 OK):
```json
{
  "consultations": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "completed",
      "createdAt": "2025-11-23T10:30:00Z",
      "patientSummary": "Headache consultation"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "status": "processing",
      "createdAt": "2025-11-23T11:00:00Z",
      "patientSummary": "Follow-up visit"
    }
  ]
}
```

### GET /api/consultations/:id

**Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "liveTranscription": "Patient reports headache for 3 days...",
  "optimizedTranscription": "Chief Complaint: Headache\n\nHistory of Present Illness:\nThe patient reports experiencing headaches for the past 3 days...",
  "createdAt": "2025-11-23T10:30:00Z",
  "completedAt": "2025-11-23T10:32:15Z"
}
```

## 7. Frontend Implementation

### ConsultationRecorder.vue

```vue
<template>
  <div class="recorder">
    <button @click="toggleRecording" :disabled="isUploading">
      {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
    </button>
    
    <div v-if="isRecording" class="live-transcription">
      <h3>Live Transcription</h3>
      <p>{{ liveTranscription }}</p>
    </div>
    
    <div v-if="isUploading" class="uploading">
      Uploading consultation...
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSpeechRecognition } from '@/composables/useSpeechRecognition'
import { useAudioRecorder } from '@/composables/useAudioRecorder'
import { useRouter } from 'vue-router'

const router = useRouter()
const isRecording = ref(false)
const isUploading = ref(false)
const liveTranscription = ref('')

const { start: startSpeech, stop: stopSpeech, transcript } = useSpeechRecognition()
const { start: startRecorder, stop: stopRecorder } = useAudioRecorder()

const toggleRecording = async () => {
  if (isRecording.value) {
    // Stop recording
    isRecording.value = false
    stopSpeech()
    const audioBlob = await stopRecorder()
    
    // Upload
    isUploading.value = true
    const formData = new FormData()
    formData.append('liveTranscription', liveTranscription.value)
    formData.append('audioFile', audioBlob, 'consultation.webm')
    
    const response = await fetch('/api/consultations', {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()
    router.push('/consultations')
  } else {
    // Start recording
    isRecording.value = true
    liveTranscription.value = ''
    startSpeech((text) => {
      liveTranscription.value = text
    })
    startRecorder()
  }
}
</script>
```

### useConsultations.js

```javascript
import { ref } from 'vue'

export function useConsultations() {
  const consultations = ref([])
  const loading = ref(false)
  
  const fetchConsultations = async () => {
    loading.value = true
    const response = await fetch('/api/consultations')
    consultations.value = await response.json()
    loading.value = false
  }
  
  const pollConsultation = async (id, onComplete) => {
    const interval = setInterval(async () => {
      const response = await fetch(`/api/consultations/${id}`)
      const data = await response.json()
      
      if (data.status === 'completed') {
        clearInterval(interval)
        onComplete(data)
      }
    }, 5000) // Poll every 5 seconds
    
    return () => clearInterval(interval)
  }
  
  return {
    consultations,
    loading,
    fetchConsultations,
    pollConsultation
  }
}
```

## 8. Backend Implementation

### handlers/consultations.go

```go
package handlers

import (
    "encoding/json"
    "io"
    "net/http"
    "github.com/gorilla/mux"
    "mediaid/jobs"
    "mediaid/models"
    "mediaid/repository"
)

type ConsultationsHandler struct {
    repo *repository.ConsultationsRepository
    queue *jobs.TranscriptionQueue
}

func (h *ConsultationsHandler) Create(w http.ResponseWriter, r *http.Request) {
    // Parse multipart form
    if err := r.ParseMultipartForm(32 << 20); err != nil {
        http.Error(w, "Failed to parse form", http.StatusBadRequest)
        return
    }
    
    liveTranscription := r.FormValue("liveTranscription")
    file, _, err := r.FormFile("audioFile")
    if err != nil {
        http.Error(w, "Missing audio file", http.StatusBadRequest)
        return
    }
    defer file.Close()
    
    // Read audio data
    audioData, err := io.ReadAll(file)
    if err != nil {
        http.Error(w, "Failed to read audio", http.StatusInternalServerError)
        return
    }
    
    // Create consultation record
    consultation := &models.Consultation{
        LiveTranscription: liveTranscription,
        Status: "processing",
    }
    
    if err := h.repo.Create(consultation); err != nil {
        http.Error(w, "Failed to create consultation", http.StatusInternalServerError)
        return
    }
    
    // Enqueue optimization job
    h.queue.Enqueue(jobs.TranscriptionJob{
        ConsultationID: consultation.ID,
        AudioData: audioData,
    })
    
    // Return consultation
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(consultation)
}

func (h *ConsultationsHandler) List(w http.ResponseWriter, r *http.Request) {
    consultations, err := h.repo.List()
    if err != nil {
        http.Error(w, "Failed to fetch consultations", http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "consultations": consultations,
    })
}

func (h *ConsultationsHandler) Get(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    
    consultation, err := h.repo.GetByID(id)
    if err != nil {
        http.Error(w, "Consultation not found", http.StatusNotFound)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(consultation)
}
```

### jobs/transcription.go

```go
package jobs

import (
    "mediaid/models"
    "mediaid/repository"
    "mediaid/services"
)

type TranscriptionJob struct {
    ConsultationID string
    AudioData []byte
}

type TranscriptionQueue struct {
    jobs chan TranscriptionJob
    repo *repository.ConsultationsRepository
    llm *services.LLMClient
}

func NewTranscriptionQueue(repo *repository.ConsultationsRepository, llm *services.LLMClient) *TranscriptionQueue {
    q := &TranscriptionQueue{
        jobs: make(chan TranscriptionJob, 100),
        repo: repo,
        llm: llm,
    }
    
    // Start worker pool (constitutional: simple, ships fast)
    for i := 0; i < 5; i++ {
        go q.worker()
    }
    
    return q
}

func (q *TranscriptionQueue) Enqueue(job TranscriptionJob) {
    q.jobs <- job
}

func (q *TranscriptionQueue) worker() {
    for job := range q.jobs {
        // Call external LLM API
        optimizedText, err := q.llm.Transcribe(job.AudioData)
        
        // Update consultation record
        if err != nil {
            q.repo.UpdateStatus(job.ConsultationID, "failed")
        } else {
            q.repo.UpdateOptimized(job.ConsultationID, optimizedText)
        }
    }
}
```

### services/llm.go

```go
package services

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "os"
)

type LLMClient struct {
    apiKey string
    baseURL string
}

func NewLLMClient() *LLMClient {
    return &LLMClient{
        apiKey: os.Getenv("LLM_API_KEY"),
        baseURL: os.Getenv("LLM_BASE_URL"),
    }
}

func (c *LLMClient) Transcribe(audioData []byte) (string, error) {
    // Upload audio to LLM API
    req, err := http.NewRequest("POST", c.baseURL + "/v1/audio/transcriptions", bytes.NewReader(audioData))
    if err != nil {
        return "", err
    }
    
    req.Header.Set("Authorization", "Bearer " + c.apiKey)
    req.Header.Set("Content-Type", "audio/webm")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        return "", fmt.Errorf("LLM API returned status %d", resp.StatusCode)
    }
    
    // Parse response
    var result struct {
        Text string `json:"text"`
    }
    
    body, _ := io.ReadAll(resp.Body)
    if err := json.Unmarshal(body, &result); err != nil {
        return "", err
    }
    
    return result.Text, nil
}
```

## 9. Data Models

### Database Schema (PostgreSQL)

```sql
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL,
    live_transcription TEXT NOT NULL,
    optimized_transcription TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('processing', 'completed', 'failed')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE INDEX idx_consultations_doctor_id ON consultations(doctor_id);
CREATE INDEX idx_consultations_status ON consultations(status);
```

### Golang Models

```go
package models

import "time"

type Consultation struct {
    ID                   string     `json:"id" db:"id"`
    DoctorID             string     `json:"doctorId" db:"doctor_id"`
    LiveTranscription    string     `json:"liveTranscription" db:"live_transcription"`
    OptimizedTranscription *string  `json:"optimizedTranscription" db:"optimized_transcription"`
    Status               string     `json:"status" db:"status"`
    CreatedAt            time.Time  `json:"createdAt" db:"created_at"`
    CompletedAt          *time.Time `json:"completedAt,omitempty" db:"completed_at"`
}
```

## 10. Error Handling

### Frontend Error States

1. **Web Speech API Unavailable**
   - Display: "Your browser doesn't support live transcription. Please use Chrome or Edge."
   - Fallback: Allow recording without live transcription

2. **Upload Failure**
   - Retry logic: 3 attempts with exponential backoff
   - Display: "Failed to upload consultation. Retrying..."
   - Final failure: Save to local storage, retry on next app open

3. **Polling Timeout**
   - After 5 minutes of polling, display: "Optimization is taking longer than expected. We'll notify you when it's ready."
   - Implementation: Stop polling, add periodic check (every 30s)

### Backend Error Handling

1. **LLM API Failure**
   - Retry: 3 attempts with exponential backoff
   - Update status to "failed" after final retry
   - Log error for manual review

2. **Database Errors**
   - Return 500 status code
   - Log error with context (consultation ID, operation)
   - Constitutional: Don't over-engineer error recovery for MVP

3. **Audio Processing Errors**
   - Validate audio format before queueing
   - Return 400 for invalid formats
   - Support: webm, mp4, wav (Web Speech API common formats)

## 11. Testing Strategy

Per `CONSTITUTION.md` (Test Critical Paths Only):

### Critical Paths to Test

1. **Audio Upload Flow**
   ```go
   func TestCreateConsultation(t *testing.T) {
       // Test multipart form parsing
       // Test consultation creation in DB
       // Test job enqueuing
   }
   ```

2. **LLM Integration**
   ```go
   func TestLLMTranscription(t *testing.T) {
       // Test successful API call
       // Test retry logic
       // Test error handling
   }
   ```

3. **Status Polling**
   ```javascript
   describe('useConsultations', () => {
       it('polls until completion', async () => {
           // Mock API responses
           // Verify polling interval
           // Verify completion callback
       })
   })
   ```

### Non-Critical Paths (Skip for MVP)

- Web Speech API wrapper (trust browser API)
- MediaRecorder wrapper (trust browser API)
- Database repository methods (trust SQL)
- Frontend UI rendering (manual QA)

## 12. Deployment Considerations

### Environment Variables (Heroku)

```bash
# LLM API Configuration
LLM_API_KEY=sk-proj-...
LLM_BASE_URL=https://api.openai.com

# Database (Heroku Postgres Add-on)
DATABASE_URL=postgres://... # Auto-provisioned

# Application
PORT=8080 # Auto-set by Heroku
```

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Heroku

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "mediaid-prod"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
```

### Database Migration

```bash
# migrations/001_create_consultations.up.sql
# Run on first deploy
heroku run go run migrations/migrate.go
```

## 13. Implementation Notes

### Privacy Compliance (Constitutional: Privacy by Default)

- **No Audio Storage**: Audio blob uploaded to LLM API, never stored in database
- **Ephemeral Processing**: Audio exists only in memory during worker processing
- **HTTPS Only**: Enforce TLS for all API calls
- **Future**: Consider encrypting transcriptions at rest (post-MVP)

### Browser Compatibility

- **Web Speech API**: Chrome 25+, Edge 79+, Safari 14.1+
- **MediaRecorder API**: Chrome 47+, Firefox 25+, Safari 14.1+
- **Fallback**: Display browser compatibility warning on load

### Performance Optimization (Post-MVP)

- Consider WebSocket for status updates instead of polling
- Add Redis for job queue if in-memory queue becomes bottleneck
- Implement audio compression before upload (reduce LLM API costs)

## 14. Open Questions

1. **LLM API Choice**: Which external LLM service? (OpenAI Whisper, AssemblyAI, Deepgram)
   - Decision needed before implementation
   - Consider: pricing, accuracy, latency, HIPAA compliance

2. **Audio Format**: What format should MediaRecorder use?
   - Recommendation: webm (best browser support)
   - Verify LLM API supports webm format

3. **Notification System**: How to notify doctor when optimization completes?
   - MVP: No notifications, doctor checks manually
   - Post-MVP: Email, push notifications, or in-app alerts

4. **Transcription Accuracy**: What's acceptable accuracy threshold?
   - Defer to user testing
   - Constitutional: Trust LLM, don't over-engineer validation

5. **Multi-Language Support**: Does system need to support non-English consultations?
   - Clarify with product owner
   - Web Speech API supports 120+ languages, LLM API may vary

---

**Next Steps**: Review this design, implement backend API endpoints, then frontend components. Deploy to Heroku staging environment for QA testing.
