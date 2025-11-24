# ADR: Medical Consultation Transcription Architecture

**Status:** Accepted  
**Date:** 2025-11-23  
**Context:** Use case `usecase-transcribe-consultation.md`, Constitution `CONSTITUTION.md`

## Decision Summary

Two-phase transcription system using browser Web Speech API for live transcription during consultations, followed by asynchronous optimized transcription via external LLM API. Live transcription runs entirely client-side with no backend involvement, while audio recording is uploaded to backend for async optimization processing. System prioritizes immediate doctor feedback and simplicity over transcription perfection, with quality improvement happening asynchronously after the consultation.

## Context and Problem Statement

Doctors conducting patient consultations need:
1. **Immediate feedback**: Live transcription visible during consultation for quick reference
2. **Quality documentation**: Optimized transcription for medical records later
3. **Non-disruptive workflow**: Recording must not interfere with patient interaction
4. **Access flexibility**: Review transcriptions hours after recording

The solution must align with constitutional principles:
- **Speed of Delivery**: Ship minimal viable solution quickly
- **Test Critical Paths Only**: Focus testing on record → transcribe → retrieve workflow
- **Trust the LLM**: Leverage external services, handle failures simply
- **Ship Through Automation**: Deploy via GitHub Actions to Heroku
- **Privacy by Default**: Minimize data storage, encrypt in transit and at rest

Constitutional constraint: "No database yet" suggests avoiding complex persistence initially, but transcription storage requires some persistence mechanism. This tension drives key architectural decisions below.

## Key Architectural Decisions

### Decision 1: Client-Side Live Transcription with Web Speech API

**Choice:** Live transcription runs entirely client-side using browser Web Speech API with no backend involvement during the recording phase.

**Rationale:**
- **Constitutional: "Speed of Delivery"** - Web Speech API requires zero backend setup, fastest path to MVP
- **Constitutional: "Trust the LLM"** - Trust browser's built-in speech recognition (Google's API under the hood)
- **Technical:** Sub-second latency required for "live" feedback; client-side processing eliminates network roundtrips
- **Simplicity:** No streaming infrastructure, WebSocket servers, or real-time backend complexity
- **Privacy:** Audio processing happens locally, reduces data transmission

**Alternatives Considered:**
- **Backend streaming to LLM API**: Rejected due to complexity (WebSocket infrastructure), latency (network overhead), and constitutional "Speed of Delivery" principle
- **Hybrid approach (client + backend backup)**: Rejected as over-engineering for MVP; adds complexity without clear value
- **Record-only, optimize-only (no live)**: Rejected as it fails use case requirement for immediate reference during consultation

**Consequences:**
- **Positive:** Immediate implementation, no backend infrastructure, lowest latency, works offline during recording
- **Negative:** Browser compatibility constraints (Chrome/Edge/Safari only), quality dependent on browser implementation, no central control over transcription quality
- **Risks:** Web Speech API accuracy may frustrate doctors (mitigated by async optimization phase); browser API changes could break functionality (monitored via compatibility tracking)

### Decision 2: Async Job Queue for Optimization Processing

**Choice:** Frontend uploads audio blob after recording stops. Backend queues async job, worker pool processes optimization via external LLM API.

**Rationale:**
- **Constitutional: "Speed of Delivery"** - In-memory job queue (Go channels) is simplest async pattern, no message broker needed
- **Constitutional: "Test Critical Paths Only"** - Simple async pattern easier to test than synchronous long-polling or WebSocket
- **Technical:** Audio transcription takes 30 seconds to 2 minutes; blocking HTTP request risks timeout and poor UX
- **Use Case:** Doctors complete consultation then move to next patient; async processing fits workflow (check later)

**Alternatives Considered:**
- **Synchronous LLM call with timeout**: Rejected due to HTTP timeout risks (Heroku 30s limit), doctor must wait before moving to next patient
- **Frontend background upload during consultation**: Rejected as premature optimization; upload after recording is simpler and sufficient
- **Immediate optimization start during recording**: Rejected as over-engineering; constitutional "Speed of Delivery" favors simple sequential flow

**Consequences:**
- **Positive:** Simple implementation (Go goroutines + channels), natural fit for use case workflow, HTTP request returns immediately
- **Negative:** In-memory queue loses jobs on server restart, no visibility into queue depth or processing time
- **Risks:** Server restart loses pending optimizations (accepted for MVP; constitution values speed over robustness), queue could back up under load (monitor in production, add persistence post-MVP if needed)

### Decision 3: Database for Transcription Persistence

**Choice:** Add PostgreSQL database to store consultation metadata, live transcription, optimized transcription, and processing status. No audio storage (ephemeral only).

**Rationale:**
- **Constitutional Tension:** Constitution states "No database yet" but use case explicitly requires accessing transcriptions hours later (Step 9-13). Database is minimal viable solution for this requirement.
- **Constitutional: "Speed of Delivery"** - Heroku Postgres add-on deploys in minutes, minimal setup overhead
- **Constitutional: "Privacy by Default"** - Audio is never stored (ephemeral), only text transcriptions persisted; reduces HIPAA surface area
- **Use Case:** Doctors must see "list of today's consultations" and "view optimized transcription when ready" hours after recording

**Alternatives Considered:**
- **Client-side only (localStorage)**: Rejected as transcriptions wouldn't sync across devices, lost if browser cache cleared
- **External blob storage with metadata API**: Rejected as more complex than database (two systems to manage)
- **Cloud storage with shareable links**: Rejected as doesn't support "list view" or status tracking well

**Consequences:**
- **Positive:** Enables core use case (access hours later), simple query model for listing consultations, supports multi-device access (future)
- **Negative:** Violates constitutional "no database yet" guidance, adds operational overhead (backups, migrations), increases hosting cost slightly
- **Risks:** Database becomes dependency (monitor uptime), schema migrations needed for future changes (keep simple for MVP)

**Note:** This decision updates the constitution's technical decisions. Recommend updating `CONSTITUTION.md` to reflect "PostgreSQL for transcription persistence" as accepted technical choice.

### Decision 4: Backend API for Transcription Retrieval

**Choice:** Doctors return to app, frontend fetches consultations list and individual transcriptions from backend REST API backed by PostgreSQL database.

**Rationale:**
- **Use Case Requirement:** "Doctor returns to mediaid app later, sees list of today's consultations, taps on specific patient's consultation" (Steps 9-12)
- **Constitutional: "Speed of Delivery"** - REST API with Gorilla/Mux is constitutional choice, simplest pattern for CRUD operations
- **Technical:** Database enables efficient filtering (today's consultations), status tracking (processing/completed), and metadata queries

**Alternatives Considered:**
- **Download/export after recording**: Rejected as poor UX (doctor manages files), doesn't support "list view" or status indicators
- **Email with links**: Rejected as adds email infrastructure complexity, poor UX for batch review
- **Cloud storage links**: Rejected as doesn't support filtering, searching, or status tracking

**Consequences:**
- **Positive:** Natural REST pattern, aligns with constitutional tech choices, supports filtering and searching (future), clean separation of concerns
- **Negative:** Requires internet connection to access old transcriptions (no offline access), API becomes critical path for access workflow
- **Risks:** API downtime blocks access to transcriptions (monitor uptime, add status page)

### Decision 5: Raw WebM Audio Upload to LLM

**Choice:** MediaRecorder API records in WebM format (browser default), frontend uploads raw audio blob to backend, backend forwards to LLM API without conversion.

**Rationale:**
- **Constitutional: "Speed of Delivery"** - No audio processing infrastructure, no ffmpeg, no codec complexity
- **Constitutional: "Trust the LLM"** - Trust LLM API accepts WebM format (verify during implementation)
- **Technical:** Client-side compression adds complexity (library size, processing time), backend conversion adds infrastructure (ffmpeg binary, CPU overhead)
- **Simplicity:** WebM is browser default, modern LLM APIs support multiple formats

**Alternatives Considered:**
- **Client-side compression before upload**: Rejected as premature optimization; constitutional "Speed of Delivery" favors simplicity
- **Backend format conversion**: Rejected as adds operational complexity (ffmpeg deployment, CPU usage), slows processing
- **Chunked streaming during recording**: Rejected as over-engineering for MVP; sequential flow (record → upload → process) is simpler

**Consequences:**
- **Positive:** Zero audio processing infrastructure, fast implementation, leverages browser and LLM API capabilities
- **Negative:** Larger upload size (raw audio), network cost higher, slower upload on poor connections
- **Risks:** LLM API may not support WebM (verify with chosen provider; fallback: add lightweight conversion layer only if needed), large files may hit Heroku request size limits (monitor file sizes, add client-side compression post-MVP if needed)

## System Architecture Overview

### Component Responsibilities

**Frontend (Vue3):**
- **Recorder Component**: Manages Web Speech API lifecycle, displays live transcription, handles MediaRecorder for audio capture
- **Consultations List Component**: Fetches consultations from backend API, displays status indicators (processing/completed), enables navigation to detail view
- **Transcription Detail Component**: Displays live and optimized transcriptions, handles polling for status updates
- **API Client Composable**: Wraps fetch calls to backend REST API

**Backend (Golang):**
- **HTTP Handlers**: REST endpoints for creating consultations (upload audio), listing consultations, fetching individual consultation details
- **Job Queue**: In-memory channel-based async processor, worker pool pattern (5 workers for MVP)
- **LLM Client Service**: Wrapper for external LLM API calls, handles audio upload and transcription retrieval
- **Repository Layer**: Database operations (CRUD for consultations table)

**External Services:**
- **LLM API**: Transcription optimization service (OpenAI Whisper, AssemblyAI, or Deepgram - TBD during implementation)
- **PostgreSQL**: Consultation metadata and transcriptions storage (Heroku Postgres add-on)

### Data Flow

**Recording Phase:**
```
1. Doctor taps "Start Recording"
   → Frontend: Initialize Web Speech API (live transcription)
   → Frontend: Initialize MediaRecorder (audio capture)
   → Frontend: Display live transcription in real-time

2. Doctor taps "Stop Recording"
   → Frontend: Stop both APIs, collect audio blob
   → Frontend: POST /api/consultations
      - Body: { liveTranscription: "...", audioFile: <blob> }
   → Backend: Create DB record (status: "processing")
   → Backend: Enqueue optimization job
   → Backend: Return consultation ID + status
   → Frontend: Navigate to consultations list
```

**Optimization Phase (Async):**
```
Background Worker:
   → Dequeue job
   → Upload audio to LLM API
   → Wait for LLM response
   → Update DB record (status: "completed", optimizedTranscription: "...")

Frontend Polling (when viewing consultation):
   → GET /api/consultations/:id (every 5 seconds)
   → Check status field
   → Display optimized transcription when status = "completed"
```

**Retrieval Phase:**
```
1. Doctor opens app hours later
   → GET /api/consultations?date=today
   → Backend queries DB for today's consultations
   → Frontend displays list with status indicators

2. Doctor taps specific consultation
   → GET /api/consultations/:id
   → Backend returns full consultation (live + optimized transcriptions)
   → Frontend displays both versions
```

### Integration Points

- **Web Speech API**: Browser-provided, client-side only, no backend integration
- **MediaRecorder API**: Browser-provided, client-side only, no backend integration
- **External LLM API**: Backend HTTP client to third-party service (TLS required)
- **PostgreSQL**: Backend database connection via standard library `database/sql`

### State Management

- **Live Transcription State**: Vue component-level reactive state (not persisted)
- **Recording State**: Vue component-level (isRecording, audio blob)
- **Consultations List**: Fetched from backend API on component mount, stored in component state
- **Transcription Detail**: Fetched from backend API, polling loop updates component state
- **Processing Status**: Authoritative source is database, frontend polls for updates

**Rationale for Component-Level State:**
- Constitutional tech choice: "Vue3 Composition API without large state management libraries"
- App is simple enough that component-level state + API fetching is sufficient
- No complex cross-component state sharing needed for MVP

## API Contract Decisions

### Endpoint Design Pattern

**Choice:** REST with JSON for data exchange

**Rationale:**
- **Constitutional:** "Standard library + Gorilla/Mux" - REST is natural fit
- **Simplicity:** Familiar pattern, easy to test, minimal overhead
- **Use Case Fit:** CRUD operations (create consultation, list consultations, get consultation) map cleanly to REST

**Endpoints:**
- `POST /api/consultations` - Create consultation with audio upload
- `GET /api/consultations` - List consultations (filterable by date)
- `GET /api/consultations/:id` - Get single consultation with status

### Request/Response Patterns

**Choice:** Synchronous HTTP for all endpoints, polling for status updates (no WebSocket, no server-sent events)

**Rationale:**
- **Constitutional: "Speed of Delivery"** - Polling is simplest async pattern, no persistent connection infrastructure
- **Use Case Fit:** Doctor checks optimization status minutes/hours later (not real-time requirement)
- **Simplicity:** Standard HTTP requests, no connection management, easy to debug

**Polling Strategy:**
- 5-second interval when viewing consultation in "processing" state
- Stop polling when status = "completed" or doctor navigates away
- No long-polling or WebSocket complexity for MVP

### Error Handling Approach

**Choice:** HTTP status codes + simple error messages, frontend retry logic for transient failures

**Rationale:**
- **Constitutional: "Trust the LLM, Handle Errors When They Happen"** - Simple error handling, show clear messages, let users retry
- **Constitutional: "Speed of Delivery"** - Don't over-engineer error recovery
- **Use Case:** Audio saved before LLM call (data never lost), retry is acceptable UX

**Error Patterns:**
- 400 Bad Request: Invalid audio format or missing fields
- 500 Internal Server Error: LLM API failure, database error
- Frontend: 3 retries with exponential backoff for transient failures
- Frontend: Display "Something went wrong. Please try again." on final failure
- Backend: Log errors with consultation ID for debugging

### Authentication/Authorization

**Choice:** Deferred to post-MVP (no auth for initial version)

**Rationale:**
- **Constitutional: "Speed of Delivery"** - Ship core workflow first, add auth when multi-doctor usage emerges
- **Risk Accepted:** Initial version is single-doctor pilot, auth not required
- **Future:** Add simple token-based auth when scaling to multiple doctors

**Note:** Constitution's "Privacy by Default" focuses on data encryption and logging, not access control (yet).

## Data Architecture Decisions

### Storage Strategy

**Choice:** Database stores consultation metadata + transcriptions, audio is ephemeral (never stored after LLM processing)

**Rationale:**
- **Constitutional: "Privacy by Default"** - Minimize sensitive data storage, audio is highest risk
- **Use Case:** Doctors need text transcriptions for records, not audio playback (audio access is "Alternative Path B" - nice-to-have)
- **Compliance:** Reduces HIPAA surface area, simpler data retention policy
- **Simplicity:** No blob storage infrastructure, no audio lifecycle management

**What Gets Stored:**
- Consultation ID, doctor ID (future), timestamp, status
- Live transcription text (from Web Speech API)
- Optimized transcription text (from LLM API)
- Metadata: created_at, completed_at

**What Doesn't Get Stored:**
- Audio files (deleted after LLM processing)
- Web Speech API interim results (only final live transcription persisted)

### Data Models (Conceptual)

**Consultation Entity:**
- Unique identifier (UUID)
- Timestamps (created, completed)
- Status (processing, completed, failed)
- Live transcription (text from Web Speech API)
- Optimized transcription (text from LLM API, nullable until completed)
- Doctor reference (future: foreign key when auth added)

**Relationships:**
- One doctor has many consultations (future)
- Consultations are independent (no patient entity yet)

### Data Lifecycle

**Creation:**
- Frontend uploads audio + live transcription → backend creates DB record (status: processing)
- Audio passed to background worker, never written to disk

**Processing:**
- Worker uploads audio to LLM API
- LLM returns optimized transcription
- Worker updates DB record (status: completed, optimizedTranscription: text)
- Audio discarded from memory

**Retention:**
- Transcriptions persisted indefinitely (MVP - no automatic deletion)
- Future: Add retention policy (30 days? 90 days?) based on doctor feedback

**Deletion:**
- Manual deletion only (future feature)
- Constitutional "Privacy by Default" suggests adding automatic retention limits post-MVP

### Privacy Considerations

**Encryption in Transit:**
- All API calls use HTTPS/TLS (Heroku default)
- LLM API calls use provider's TLS

**Encryption at Rest:**
- Database encryption via Heroku Postgres (default for paid tiers)
- No application-level encryption (defer to post-MVP if compliance requires)

**Logging:**
- No PII in application logs (use anonymized consultation IDs)
- Access logs track which consultations were accessed (audit trail for future)
- Constitutional guidance: "No PII in logs"

**Audio Handling:**
- Audio exists only in memory during worker processing
- No temp files written to disk
- Audio never logged or transmitted except to LLM API

## Frontend Architecture Decisions

### Component Structure

**Choice:** Three main components with separation of concerns: Recorder (capture), List (overview), Detail (view)

**Rationale:**
- **Separation of Concerns:** Each component has single responsibility
- **Use Case Mapping:** Components mirror use case phases (record → list → detail)
- **Simplicity:** Flat component hierarchy, minimal prop drilling, Vue3 Composition API for shared logic

**Component Hierarchy:**
```
App
├── RecorderView (route: /record)
│   └── RecorderComponent
├── ConsultationsView (route: /)
│   └── ConsultationsListComponent
└── ConsultationDetailView (route: /consultations/:id)
    └── ConsultationDetailComponent
```

**Shared Logic (Composables):**
- `useSpeechRecognition()`: Web Speech API wrapper
- `useAudioRecorder()`: MediaRecorder API wrapper
- `useConsultations()`: API client for backend calls

### Browser API Decisions

**Choice:** Use Web Speech API for live transcription, MediaRecorder API for audio capture

**Rationale:**
- **Constitutional: "Trust the LLM"** - Trust browser APIs (which leverage Google's speech services)
- **Constitutional: "Speed of Delivery"** - Native APIs require no external libraries
- **Use Case Fit:** Both APIs provide exactly what's needed (real-time text + audio recording)

**Browser Compatibility:**
- Web Speech API: Chrome 25+, Edge 79+, Safari 14.1+
- MediaRecorder API: Chrome 47+, Firefox 25+, Safari 14.1+
- Overlap: Modern browsers only (acceptable for doctor-facing tool)
- Handle unsupported browsers with clear error message

**Fallback Strategy:**
- If Web Speech API unavailable: Display warning, allow audio-only recording (skip live transcription phase)
- If MediaRecorder unavailable: Display error, block feature entirely (no fallback for MVP)

### Error Handling (Frontend)

**Choice:** Display simple error messages, provide manual retry buttons, no automatic retry for user-facing errors

**Rationale:**
- **Constitutional: "Trust the LLM, Handle Errors When They Happen"** - Retry buttons give users control
- **Constitutional: "Test Critical Paths Only"** - Simple error handling easier to test
- **UX:** Doctors want transparency and control over retries (medical context)

**Error Scenarios:**
- Upload failure: "Failed to upload recording. Please try again." + retry button
- LLM processing failure: Status shows "failed", detail view offers re-process option (future)
- Polling timeout: After 5 minutes, stop polling, show "Optimization taking longer than expected"
- Browser API failure: "Your browser doesn't support this feature. Please use Chrome, Edge, or Safari."

## Backend Architecture Decisions

### Service Organization

**Choice:** Layered architecture: Handlers → Services → Repository

**Rationale:**
- **Constitutional: "Standard library + Gorilla/Mux"** - Simple layering fits standard Go patterns
- **Testability:** Service layer isolates business logic for testing (aligns with "Test Critical Paths Only")
- **Clarity:** Clear separation of HTTP concerns, business logic, and data access

**Layers:**
- **Handlers**: HTTP routing, request/response marshaling, input validation
- **Services**: Business logic (job queuing, LLM integration, status management)
- **Repository**: Database queries, transaction management

### Concurrency Model

**Choice:** In-memory job queue using Go channels, fixed-size worker pool (5 workers for MVP)

**Rationale:**
- **Constitutional: "Speed of Delivery"** - Channels are Go's native concurrency primitive, simplest async pattern
- **Use Case Fit:** Consultations arrive sequentially (one doctor at a time), low volume for MVP
- **Simplicity:** No external dependencies (Redis, RabbitMQ), no queue configuration

**Implementation Pattern:**
```
Queue: buffered channel (capacity 100)
Workers: 5 goroutines in pool pattern
Processing: Each worker dequeues job, calls LLM API, updates DB
```

**Risks and Mitigations:**
- Queue overflow: Channel capacity 100 (monitor in production, increase if needed)
- Job loss on restart: Accepted for MVP (constitutional: speed over robustness)
- No job persistence: Deferred to post-MVP (add Redis if needed)

### External LLM Integration

**Choice:** HTTP client wrapper service, synchronous call per job (no streaming, no batching)

**Rationale:**
- **Constitutional: "Trust the LLM"** - Basic timeout handling (60s), trust API reliability
- **Simplicity:** One HTTP request per consultation, no complex state management
- **Use Case Fit:** Consultations are independent, no batching opportunity

**LLM Provider Selection (Open Question):**
- Options: OpenAI Whisper, AssemblyAI, Deepgram
- Criteria: WebM support, cost, HIPAA compliance, accuracy
- Decision deferred to implementation phase

**Error Handling:**
- LLM API timeout (60s): Update consultation status to "failed"
- LLM API error (4xx/5xx): Update status to "failed", log error with consultation ID
- Retry logic: None for MVP (constitutional: simple error handling, let users retry manually)

### Backend Error Handling

**Choice:** Log errors with consultation ID, return HTTP 500, no automatic retry, manual investigation for failures

**Rationale:**
- **Constitutional: "Trust the LLM, Handle Errors When They Happen"** - Don't over-engineer error recovery
- **Constitutional: "Test Critical Paths Only"** - Simple error handling reduces test surface
- **Operational:** Manual intervention acceptable for MVP scale (< 10 doctors)

**Failure Scenarios:**
- Database connection lost: Return 500, rely on Heroku health checks to restart
- LLM API unreachable: Mark consultation as "failed", doctor can retry manually (future feature)
- Audio upload too large: Return 400, frontend displays error

## Testing Strategy

### What to Test (Critical Paths Only)

**Constitutional Guidance:** "Test transcription accuracy, data conversion, and patient data handling. Everything else gets manual verification."

**Critical Paths for This Feature:**
1. **Upload Flow**: POST audio + live transcription → DB record created → job enqueued
2. **Processing Flow**: Worker dequeues → calls LLM API → updates DB with optimized transcription
3. **Retrieval Flow**: GET consultations list → returns correct data → GET single consultation → returns full transcription
4. **Status Transitions**: Consultation moves from "processing" to "completed" correctly

**Integration Tests:**
- End-to-end: Upload → process → retrieve workflow
- LLM integration: Mock LLM API, verify audio upload and response parsing
- Database operations: Create consultation, update status, query by date

**Unit Tests:**
- LLM client service: Request formatting, response parsing, error handling
- Repository layer: SQL queries, transaction handling

**Not Tested (Manual QA):**
- Frontend UI rendering (constitutional: manual verification)
- Web Speech API wrapper (constitutional: trust browser)
- MediaRecorder wrapper (constitutional: trust browser)
- Vue component interactions (manual smoke testing)

### Testing Approach

**Backend:**
- Table-driven tests for repository layer
- Integration tests with test database (ephemeral Postgres container)
- Mock LLM API using httptest package

**Frontend:**
- Manual testing only for MVP (constitutional: test critical paths, UI is not critical path)
- Verify in Chrome, Edge, Safari (browser compatibility)

### Test Coverage Philosophy

**Constitutional Alignment:** "Test Critical Paths Only"

**Coverage Goals:**
- Backend critical paths: 80%+ coverage
- Frontend: 0% automated coverage (manual QA only)
- Database operations: 100% coverage (data integrity is critical)

**Not a Goal:**
- Comprehensive unit tests for every function
- UI snapshot testing
- Edge case coverage for non-critical paths

## Deployment and Operations

### Deployment Strategy

**Choice:** GitHub Actions CI/CD pipeline, automatic deployment to Heroku on merge to main

**Rationale:**
- **Constitutional: "Ship Through Automation"** - Automated deployment removes bottlenecks
- **Constitutional:** "GitHub Actions runs tests on every PR, merge to main triggers automatic Heroku deployment"

**Pipeline Stages:**
1. PR opened: Run tests, lint
2. Merge to main: Run tests, deploy to Heroku staging
3. Staging smoke tests pass: Promote to production (manual approval for MVP)

### Environment Configuration

**Required Variables:**
- `LLM_API_KEY`: External LLM service API key
- `LLM_BASE_URL`: LLM API endpoint
- `DATABASE_URL`: Heroku Postgres connection string (auto-provisioned)
- `PORT`: Application port (Heroku auto-sets)

**Heroku Add-ons:**
- Heroku Postgres (Hobby tier for MVP, ~$9/month)
- Heroku SSL (automatic HTTPS)

### Monitoring

**Choice:** Basic logging + Heroku metrics for MVP, no APM or advanced monitoring

**Rationale:**
- **Constitutional: "Speed of Delivery"** - Ship with minimal monitoring, add based on real needs
- **Operational:** MVP scale doesn't justify APM cost/complexity

**What to Monitor:**
- Application logs: Consultation creation, LLM API calls, processing completion, errors
- Heroku metrics: Response times, error rates, dyno health
- Database metrics: Connection pool, query performance (Heroku Postgres dashboard)

**What to Log:**
- Consultation ID for all operations (enables debugging without PII)
- LLM API call duration and status
- Job queue depth (future: add Prometheus metrics if queue becomes bottleneck)

**What NOT to Log (Constitutional: Privacy):**
- Transcription text content
- Audio data or metadata
- Patient identifiable information

### Scaling Considerations

**MVP Scale (Accepted Constraints):**
- < 10 doctors
- < 100 consultations/day
- Single Heroku dyno sufficient

**Future Scaling Triggers:**
- Queue depth > 50: Add more worker goroutines or separate worker dynos
- Response time > 500ms: Add database connection pooling
- Job loss becomes problem: Replace in-memory queue with Redis

**Constitutional Approach:** Ship simple, monitor, scale when needed (not prematurely)

## Open Questions and Future Decisions

### Remaining Uncertainties (Need Resolution Before Implementation)

1. **LLM Provider Selection**
   - Options: OpenAI Whisper, AssemblyAI, Deepgram
   - Criteria: Cost per minute, WebM format support, accuracy, HIPAA compliance
   - Decision needed: Before backend implementation starts
   - Recommendation: Trial all three with sample medical audio, compare cost/accuracy

2. **Audio Format Verification**
   - Question: Does chosen LLM provider accept WebM format natively?
   - Decision: If not, add lightweight format conversion (ffmpeg) to backend
   - Timing: Verify during LLM provider selection phase

3. **Database Schema Details**
   - Question: What indexes are needed for performant queries?
   - Initial: Index on doctor_id (future), created_at (for date filtering), status (for polling)
   - Timing: Define during implementation, iterate based on query patterns

4. **Optimization Time Expectations**
   - Question: What's acceptable time-to-completion for optimization? (Use case asks: < 5 min? < 30 min?)
   - Decision: Defer to user testing; monitor actual LLM API latency in production
   - Implication: May need to add progress indicators if optimization takes > 2 minutes

### Decisions Deferred to Implementation Phase

1. **Error Message Specificity**: Exact wording for error messages (iterate based on doctor feedback)
2. **Polling Interval Tuning**: Start with 5 seconds, adjust based on actual optimization times
3. **Worker Pool Size**: Start with 5 workers, monitor queue depth, adjust as needed
4. **Database Connection Pool**: Start with defaults, tune if connection errors appear
5. **Retry Logic Details**: For MVP, no automatic retries; add based on real error patterns

### Future Architectural Considerations (Post-MVP)

1. **Authentication/Authorization**
   - When: Multi-doctor usage emerges
   - Approach: Token-based auth (JWT), doctor accounts with consultation ownership

2. **Audio Playback Support**
   - When: Use case "Alternative Path B" becomes requested feature
   - Approach: Store audio in blob storage (S3), serve via signed URLs, update privacy policy

3. **Real-Time Status Updates**
   - When: Polling becomes UX problem (doctors refreshing frequently)
   - Approach: Replace polling with WebSocket or Server-Sent Events

4. **Job Queue Persistence**
   - When: Job loss on restart becomes actual problem (monitor error reports)
   - Approach: Add Redis-backed queue, preserve jobs across restarts

5. **Advanced Optimization**
   - When: Doctors request medical-specific formatting (SOAP notes, ICD codes)
   - Approach: Add LLM prompt customization, structured output parsing

6. **Multi-Device Sync**
   - When: Doctors want to record on phone, review on desktop
   - Approach: Database already supports this; add web frontend (responsive design)

7. **Offline Mode**
   - When: Doctors report connectivity issues during recording
   - Approach: Service worker for offline recording, background sync for upload

---

## Rationale Summary

This architecture balances constitutional principles with use case requirements:

- **Speed of Delivery**: Client-side live transcription (zero backend setup), in-memory queue (no message broker), REST API (familiar pattern)
- **Test Critical Paths Only**: Focus tests on upload → LLM → retrieval workflow, skip UI testing
- **Trust the LLM**: Use browser APIs and external LLM service, simple error handling
- **Ship Through Automation**: GitHub Actions → Heroku pipeline
- **Privacy by Default**: Ephemeral audio, no PII logging, encryption in transit and at rest

**Key Trade-offs Accepted:**
- In-memory queue risks job loss (speed > robustness for MVP)
- No audio storage limits playback feature (privacy > feature completeness)
- Polling creates API overhead (simplicity > efficiency for MVP)
- No automatic retry logic (simplicity > resilience for MVP)

**Constitutional Tension Resolved:**
- Added database despite "no database yet" because use case explicitly requires accessing transcriptions hours later. This is minimal viable persistence, not over-engineering.
