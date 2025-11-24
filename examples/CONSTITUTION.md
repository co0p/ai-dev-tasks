# Project Constitution

## About This Project

mediaid is a medical transcription system that helps doctors transcribe consultations using their phones as recording devices. The system converts audio to structured medical documents and facilitates data entry into patient management software, serving healthcare professionals who need fast, reliable documentation.

---

## Core Principles

### 1. Speed of Delivery

**Statement:** We move fast and iterate. Get working features to doctors quickly, gather feedback, and improve. Perfect is the enemy of good enough.

**Rationale:** Doctors need solutions now, not next quarter. A working 80% solution today is more valuable than a perfect solution in three months. Real-world usage reveals problems faster than planning sessions.

**In Practice:**
- Ship minimal viable features and iterate based on doctor feedback
- Feature flags let us deploy incomplete work safely
- Weekly releases are the norm, not the exception
- "Good enough for v1" is a valid decision criteria
- We track time-to-first-user-feedback as a key metric

### 2. Test Critical Paths Only

**Statement:** We focus testing effort on transcription accuracy, data conversion, and patient data handling. Everything else gets manual verification.

**Rationale:** Comprehensive testing slows us down. We test what matters: can doctors record, transcribe, and use the output? Testing UI animations or edge case validations isn't worth the maintenance burden.

**In Practice:**
- Integration tests for: record → transcribe → structure → copy workflow
- Unit tests for template conversion logic and data transformations
- Manual testing for UI changes and non-critical features
- All changes must work locally before merging (developer verification)
- No tests for trivial getters/setters or framework boilerplate

### 3. Trust the LLM, Handle Errors When They Happen

**Statement:** We build assuming the LLM works reliably. When it fails, we show clear error messages and let users retry.

**Rationale:** Over-engineering error handling adds complexity we don't need yet. Modern LLM APIs are reliable enough to trust. We'll add defensive programming when real-world usage shows we need it.

**In Practice:**
- LLM API calls have basic timeout handling (60 seconds)
- Failed transcriptions show: "Something went wrong. Please try again."
- Audio recordings are saved before sending to LLM (data never lost)
- We monitor error rates but don't preemptively add retry logic
- Retry buttons give users control instead of automatic retries

### 4. Ship Through Automation

**Statement:** Merging to main automatically deploys to production via CI/CD. Tests run on every PR. Main branch is always deployable.

**Rationale:** Manual deployments are slow and error-prone. Automation removes human bottlenecks and lets us ship fixes in minutes, not days. Fast feedback loops keep momentum high.

**In Practice:**
- GitHub Actions runs tests on every PR
- Successful merge to main triggers automatic Heroku deployment
- Deployment includes basic smoke tests (health check endpoint)
- Feature flags let us ship incomplete work safely
- Rollback is manual but simple (revert commit and push)

### 5. Privacy and Security by Default

**Statement:** Patient data is encrypted in transit and at rest. We log no personally identifiable information. Audio recordings are automatically deleted after processing unless doctors explicitly save them.

**Rationale:** Medical data is sensitive and regulated. Doctors trust us with their patients' information. Privacy isn't negotiable—it's table stakes for healthcare software.

**In Practice:**
- All API connections use HTTPS/TLS
- Audio files encrypted at rest on Heroku
- No PII in application logs (use anonymized session IDs)
- Automatic deletion: recordings purged after 48 hours if not saved
- Access logs track which doctor accessed which session (audit trail)
- Regular dependency security updates via Dependabot

---

## Technical Decisions

### Languages

- **Golang for backend**: Strong typing and reliability ensure data handling correctness. Go's simplicity means less cognitive overhead and faster onboarding for new developers.

- **Vue3 for frontend**: Lightweight and fast, perfect for the simple UI we need (record button, transcription display, copy actions). Less framework overhead means faster load times on mobile.

### Frameworks

- **Standard library + Gorilla/Mux for Go**: Minimal dependencies reduce maintenance burden. Standard library is stable and well-documented.

- **Vue3 Composition API**: Modern reactive patterns without the complexity of large state management libraries. Our app is simple enough to use component-level state.

### Database

- **PostgreSQL (Heroku Postgres)**: Added for transcription persistence to enable core use case (doctors accessing consultations hours after recording). Heroku Postgres add-on deploys in minutes with minimal setup overhead. Stores consultation metadata, live transcriptions, and optimized transcriptions. Audio is never stored (ephemeral only) to minimize HIPAA surface area and align with Privacy by Default principle.

### Deployment

- **Heroku**: Simple deployment process (git push), cost-effective for MVP scale, and good enough for current user base. Automatic HTTPS, logging, and scaling when needed without DevOps overhead.

- **CI/CD via GitHub Actions**: Integrated with our repo, free for public repos, simple YAML configuration. Runs tests and deploys on merge to main.

---

**Last Updated:** 2025-11-23
