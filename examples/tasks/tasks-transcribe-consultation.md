# Task List: Medical Consultation Transcription Feature

## Relevant Files

### Frontend (Vue3)
- `src/components/RecorderComponent.vue` - Main recording interface with Web Speech API and MediaRecorder integration
- `src/components/ConsultationsListComponent.vue` - List view of consultations with status indicators
- `src/components/ConsultationDetailComponent.vue` - Detail view showing live and optimized transcriptions
- `src/composables/useSpeechRecognition.js` - Web Speech API wrapper for live transcription
- `src/composables/useAudioRecorder.js` - MediaRecorder API wrapper for audio capture
- `src/composables/useConsultations.js` - API client for backend REST calls
- `src/router/index.js` - Vue Router configuration for navigation
- `src/views/RecorderView.vue` - Route wrapper for recorder component
- `src/views/ConsultationsView.vue` - Route wrapper for consultations list
- `src/views/ConsultationDetailView.vue` - Route wrapper for consultation detail

### Backend (Golang)
- `handlers/consultations.go` - HTTP handlers for consultation endpoints
- `services/queue.go` - In-memory job queue implementation
- `services/llm.go` - LLM API client service
- `repository/consultations.go` - Database operations layer
- `models/consultation.go` - Data model definitions
- `main.go` - Application entry point and HTTP server setup
- `migrations/001_create_consultations.sql` - Database schema migration

### Configuration
- `.github/workflows/deploy.yml` - GitHub Actions CI/CD pipeline
- `.env.example` - Environment variable template
- `README.md` - Project documentation with setup instructions

### Notes

- Follow constitutional principles: Speed of Delivery, Test Critical Paths Only, Trust the LLM
- No code examples in ADR - refer to it for architectural decisions and rationale only
- Test only critical paths: upload → LLM → retrieval workflow
- Audio is ephemeral (never stored), only text transcriptions persist
- Use Vue3 Composition API without state management libraries
- Use Golang standard library + Gorilla/Mux for routing

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/transcribe-consultation`)

- [ ] 1.0 Project Setup and Dependencies
  - [ ] 1.1 Initialize Go module with `go mod init mediaid`
  - [ ] 1.2 Install Gorilla/Mux: `go get github.com/gorilla/mux`
  - [ ] 1.3 Install PostgreSQL driver: `go get github.com/lib/pq`
  - [ ] 1.4 Create Vue3 project with Vite: `npm create vite@latest mediaid-frontend -- --template vue`
  - [ ] 1.5 Install Vue Router: `cd mediaid-frontend && npm install vue-router`
  - [ ] 1.6 Create `.env.example` file with required environment variables (LLM_API_KEY, LLM_BASE_URL, DATABASE_URL, PORT)
  - [ ] 1.7 Add `.env` to `.gitignore`
  - [ ] 1.8 Create basic project directory structure (handlers/, services/, repository/, models/, migrations/)

- [ ] 2.0 Database Setup
  - [ ] 2.1 Create migration file `migrations/001_create_consultations.sql`
  - [ ] 2.2 Define `consultations` table schema with columns: id (UUID), doctor_id (UUID, nullable for MVP), live_transcription (TEXT), optimized_transcription (TEXT, nullable), status (VARCHAR), created_at (TIMESTAMP), completed_at (TIMESTAMP, nullable)
  - [ ] 2.3 Add indexes on doctor_id, created_at, and status columns
  - [ ] 2.4 Create database connection utility in `repository/db.go`
  - [ ] 2.5 Implement migration runner in `migrations/migrate.go`
  - [ ] 2.6 Test database connection and migration locally with PostgreSQL

- [ ] 3.0 Backend Core Implementation
  - [ ] 3.1 Create `models/consultation.go` with Consultation struct matching database schema
  - [ ] 3.2 Implement `repository/consultations.go` with Create, GetByID, List, UpdateStatus, and UpdateOptimized methods
  - [ ] 3.3 Create `handlers/consultations.go` with handler struct and constructor
  - [ ] 3.4 Implement POST /api/consultations handler (multipart form parsing, audio file extraction, DB record creation)
  - [ ] 3.5 Implement GET /api/consultations handler (list consultations, support date filtering via query params)
  - [ ] 3.6 Implement GET /api/consultations/:id handler (single consultation retrieval)
  - [ ] 3.7 Set up Gorilla/Mux router in `main.go` with CORS middleware
  - [ ] 3.8 Add health check endpoint GET /health for deployment verification
  - [ ] 3.9 Test endpoints manually with curl or Postman

- [ ] 4.0 LLM Integration
  - [ ] 4.1 Create `services/llm.go` with LLMClient struct and constructor
  - [ ] 4.2 Implement Transcribe method that uploads audio to external LLM API and returns optimized transcription
  - [ ] 4.3 Add timeout handling (60 seconds per constitutional decision)
  - [ ] 4.4 Add error handling and logging with consultation ID (no PII)
  - [ ] 4.5 Create `services/queue.go` with TranscriptionQueue struct
  - [ ] 4.6 Implement in-memory channel-based job queue (buffered channel capacity 100)
  - [ ] 4.7 Implement worker pool pattern with 5 goroutines
  - [ ] 4.8 Add Enqueue method to queue jobs
  - [ ] 4.9 Implement worker logic: dequeue → call LLM → update DB (status and optimized transcription)
  - [ ] 4.10 Wire up queue in POST /api/consultations handler to enqueue jobs after DB creation
  - [ ] 4.11 Test with mock LLM API or test endpoint

- [ ] 5.0 Frontend Core Components
  - [ ] 5.1 Create `src/router/index.js` with routes: / (consultations list), /record (recorder), /consultations/:id (detail)
  - [ ] 5.2 Create `src/views/RecorderView.vue` as route wrapper
  - [ ] 5.3 Create `src/views/ConsultationsView.vue` as route wrapper
  - [ ] 5.4 Create `src/views/ConsultationDetailView.vue` as route wrapper
  - [ ] 5.5 Create `src/components/RecorderComponent.vue` with template structure (start/stop button, live transcription display)
  - [ ] 5.6 Create `src/components/ConsultationsListComponent.vue` with template structure (list items, status badges)
  - [ ] 5.7 Create `src/components/ConsultationDetailComponent.vue` with template structure (live and optimized transcription sections)
  - [ ] 5.8 Add basic styling for mobile-first design (constitutional: simple UI)
  - [ ] 5.9 Test navigation between views

- [ ] 6.0 API Integration and State Management
  - [ ] 6.1 Create `src/composables/useSpeechRecognition.js` wrapping Web Speech API
  - [ ] 6.2 Implement start, stop, and transcript reactive state in useSpeechRecognition
  - [ ] 6.3 Add browser compatibility check (Chrome/Edge/Safari) with error message for unsupported browsers
  - [ ] 6.4 Create `src/composables/useAudioRecorder.js` wrapping MediaRecorder API
  - [ ] 6.5 Implement start method returning Promise, stop method returning audio Blob
  - [ ] 6.6 Set MediaRecorder to WebM format (browser default)
  - [ ] 6.7 Create `src/composables/useConsultations.js` for backend API calls
  - [ ] 6.8 Implement createConsultation method (multipart form upload with liveTranscription and audioFile)
  - [ ] 6.9 Implement fetchConsultations method (GET list with optional date filter)
  - [ ] 6.10 Implement fetchConsultation method (GET single by ID)
  - [ ] 6.11 Implement pollConsultation method (5-second interval, stop when status = "completed")
  - [ ] 6.12 Wire up RecorderComponent: use both composables, handle start/stop, upload on stop, navigate to list
  - [ ] 6.13 Wire up ConsultationsListComponent: fetch on mount, display list with status
  - [ ] 6.14 Wire up ConsultationDetailComponent: fetch on mount, start polling if status = "processing", display both transcriptions
  - [ ] 6.15 Add error handling UI (display "Something went wrong" messages, retry buttons)
  - [ ] 6.16 Test complete flow: record → upload → list → poll → view optimized

- [ ] 7.0 Testing Critical Paths
  - [ ] 7.1 Create `repository/consultations_test.go` for repository layer tests
  - [ ] 7.2 Write table-driven tests for Create, GetByID, List, UpdateStatus, UpdateOptimized methods
  - [ ] 7.3 Use test database or in-memory SQLite for repository tests
  - [ ] 7.4 Create `services/llm_test.go` for LLM client tests
  - [ ] 7.5 Mock external LLM API using httptest package
  - [ ] 7.6 Test successful transcription, timeout handling, error responses
  - [ ] 7.7 Create `handlers/consultations_test.go` for integration tests
  - [ ] 7.8 Test POST /api/consultations: multipart parsing, DB creation, job enqueuing
  - [ ] 7.9 Test GET /api/consultations: list retrieval, date filtering
  - [ ] 7.10 Test GET /api/consultations/:id: single consultation retrieval, status field
  - [ ] 7.11 Run all backend tests with `go test ./...`
  - [ ] 7.12 Verify critical path coverage: upload → process → retrieve workflow
  - [ ] 7.13 Manual frontend testing in Chrome, Edge, and Safari for browser compatibility

- [ ] 8.0 Deployment Configuration
  - [ ] 8.1 Create `Procfile` for Heroku: `web: ./mediaid`
  - [ ] 8.2 Create `.github/workflows/deploy.yml` for GitHub Actions
  - [ ] 8.3 Add workflow steps: checkout, setup Go, run tests, build binary
  - [ ] 8.4 Add Heroku deployment step using akhileshns/heroku-deploy action
  - [ ] 8.5 Configure GitHub secrets: HEROKU_API_KEY, HEROKU_EMAIL
  - [ ] 8.6 Create Heroku app: `heroku create mediaid-prod`
  - [ ] 8.7 Provision Heroku Postgres add-on: `heroku addons:create heroku-postgresql:mini`
  - [ ] 8.8 Set Heroku environment variables: LLM_API_KEY, LLM_BASE_URL
  - [ ] 8.9 Run database migration on Heroku: `heroku run ./mediaid migrate`
  - [ ] 8.10 Build frontend for production: `npm run build`
  - [ ] 8.11 Configure backend to serve frontend static files from dist/ directory
  - [ ] 8.12 Test deployment: push to main branch, verify GitHub Actions runs, check Heroku app
  - [ ] 8.13 Verify health check endpoint returns 200 OK
  - [ ] 8.14 Test complete workflow on deployed app with real LLM API

- [ ] 9.0 Documentation and Cleanup
  - [ ] 9.1 Update README.md with project overview and constitutional principles
  - [ ] 9.2 Add setup instructions: prerequisites, local development, environment variables
  - [ ] 9.3 Document API endpoints with request/response examples
  - [ ] 9.4 Add architecture diagram (ASCII or link to ADR)
  - [ ] 9.5 Document LLM provider selection decision (OpenAI/AssemblyAI/Deepgram)
  - [ ] 9.6 Add troubleshooting section for common issues (browser compatibility, LLM API errors)
  - [ ] 9.7 Review and remove debug logging or console.log statements
  - [ ] 9.8 Verify no PII in logs (use consultation IDs only)
  - [ ] 9.9 Run final test pass: manual smoke test of all acceptance criteria from use case
  - [ ] 9.10 Update CONSTITUTION.md "Last Updated" date
  - [ ] 9.11 Merge feature branch to main via pull request
  - [ ] 9.12 Verify automatic deployment to production completes successfully
