# Rule: Generating an Architecture Decision Record (ADR)

## Goal

To guide an AI assistant in creating an Architecture Decision Record that documents the key technical decisions for implementing a specific use case. The ADR explains WHICH technical approaches were chosen and WHY, without prescribing exact implementation code. This serves as a decision log that guides future development while allowing flexibility in implementation details.

## Prerequisites

Before generating an ADR, verify that both prerequisite files exist:

**Required:**
1. **`CONSTITUTION.md`** - Defines technical decisions, frameworks, and development principles
2. **`usecase-[feature-name].md`** - Defines WHAT the user wants to accomplish

**If either file does not exist:**
- Inform the user which prerequisite is missing
- Suggest creating the constitution first (using `create-constitution.md`)
- Then creating the use case (using `create-usecase.md`)
- Do not proceed until both files exist

**If both files exist:**
- Read and understand the constitution's technical decisions and principles
- Read the use case to understand user goals and acceptance criteria
- Document decisions that fulfill the use case while respecting the constitution

## Process

1.  **Verify Prerequisites:** Check for `CONSTITUTION.md` and the relevant use case file.
2.  **Receive Initial Prompt:** The user requests an ADR for a specific use case.
3.  **Analyze Context:** Review both the constitution and use case to understand constraints and requirements.
4.  **Ask Clarifying Questions:** Before writing the ADR, ask only essential technical questions that aren't answered by the constitution or use case. Limit to 3-5 critical architectural decisions.
5.  **Generate ADR:** Create a focused decision record using the structure outlined below.
6.  **Save ADR:** Save the document as `adr-[feature-name].md` inside the `/tasks` directory.

## Clarifying Questions (Guidelines)

Ask only architectural questions not already answered by the constitution or use case:

*   **Architecture Approach:** If multiple valid approaches exist within constitutional constraints
*   **Component Boundaries:** If unclear how to split responsibilities
*   **Data Flow:** If unclear how data moves through the system
*   **Integration Points:** If external systems or services aren't specified
*   **State Management:** Where and how application state should be managed
*   **Performance Trade-offs:** If specific latency/throughput decisions need to be made

**Important:** Don't ask about tech stack, frameworks, or patterns already defined in the constitution. Focus on questions specific to this feature's architecture.

### Formatting Requirements

- **Number all questions** (1, 2, 3, etc.)
- **List options for each question as A, B, C, D, etc.** for easy reference
- Make it simple for the user to respond with selections like "1A, 2C, 3B"

### Example Format

```
1. How should audio data flow through the system?
   A. Client → Backend → LLM → Backend → Client
   B. Client → LLM directly → Client
   C. Client → Backend (async processing) → Client polls
   D. Client → Backend → WebSocket stream → Client

2. Where should transcription state be managed?
   A. Client-side only (component state)
   B. Backend session storage
   C. Database (persistent)
   D. Hybrid (client for UI, backend for persistence)

3. What's the error recovery strategy?
   A. Manual retry with user action
   B. Automatic retry with exponential backoff
   C. Queue-based with background processing
   D. Save-and-resume pattern
```

## ADR Structure

The generated ADR should include the following sections:

### 1. Title and Metadata
- **Title:** Clear name referencing the use case (e.g., "ADR: Medical Consultation Transcription Architecture")
- **Status:** Draft, Proposed, Accepted, Superseded
- **Date:** When the decision was made
- **Context:** References to use case and constitution

### 2. Decision Summary
Brief 2-3 sentence overview of the architectural approach chosen.

### 3. Context and Problem Statement
- What use case is being addressed
- What constitutional constraints apply
- What problem needs solving
- What alternatives were considered

### 4. Key Architectural Decisions

For each major decision, document:

#### Decision [Number]: [Decision Name]

**Choice:** What was decided

**Rationale:** Why this choice was made
- Constitutional alignment (which principles influenced this)
- Technical reasoning (performance, maintainability, simplicity)
- Trade-offs accepted (what was sacrificed and why)
- Alternatives considered (what was rejected and why)

**Consequences:**
- Positive: Benefits of this decision
- Negative: Costs or limitations accepted
- Risks: What could go wrong

### 5. System Architecture Overview

High-level description of:
- **Component Responsibilities:** What each major component does (not how)
- **Data Flow:** How information moves through the system
- **Integration Points:** Where external systems connect
- **State Management:** Where state lives and why

**Note:** Describe the *what* and *why*, not implementation details. Use diagrams if helpful (ASCII or Mermaid).

### 6. API Contract Decisions

Document decisions about:
- **Endpoint Design:** REST vs GraphQL vs WebSocket (and why)
- **Request/Response Patterns:** Sync vs async, polling vs push
- **Error Handling Approach:** Status codes, error formats, retry strategies
- **Authentication/Authorization:** How security is handled

**Note:** Specify patterns and formats, not exact code. Examples:
- "Use REST with JSON for simplicity (constitutional: speed over flexibility)"
- "Async processing with polling (rationale: simpler than WebSocket for MVP)"

### 7. Data Architecture Decisions

Document decisions about:
- **Storage Strategy:** What gets stored where and why
- **Data Models:** Key entities and relationships (conceptual, not schema)
- **Data Lifecycle:** How data is created, updated, deleted, archived
- **Privacy Considerations:** How sensitive data is handled

### 8. Frontend Architecture Decisions

Document decisions about:
- **Component Structure:** How UI is organized and why
- **State Management:** Where UI state lives (component, global, backend)
- **Browser APIs:** Which native APIs are used and why
- **Error Handling:** How frontend handles failures

### 9. Backend Architecture Decisions

Document decisions about:
- **Service Organization:** How backend logic is structured
- **Concurrency Model:** Sync, async, worker pools (and why)
- **External Integrations:** How third-party services are used
- **Error Handling:** How backend handles failures

### 10. Testing Strategy

Document decisions about:
- **What to Test:** Which paths are critical (per constitution)
- **Testing Approach:** Unit, integration, E2E priorities
- **Test Coverage Philosophy:** Comprehensive vs selective (and why)
- **Testing Tools:** What fits the constitutional approach

### 11. Deployment and Operations

Document decisions about:
- **Deployment Strategy:** CI/CD, manual, hybrid (per constitution)
- **Environment Variables:** What configuration is needed
- **Monitoring:** What needs to be observed
- **Scaling Considerations:** How system handles growth

### 12. Open Questions and Future Decisions

Document:
- Remaining uncertainties that need resolution
- Decisions deferred to implementation phase
- Future architectural considerations (post-MVP)

## Important: Constitution Alignment

**Every decision MUST reference the constitution:**
- Use the exact technologies specified (languages, frameworks, tools)
- Follow the testing philosophy (comprehensive vs. critical paths only)
- Respect architectural principles (speed vs. quality, simplicity vs. flexibility)
- Adhere to deployment approach (CI/CD, manual, etc.)

**For each decision, explicitly state which constitutional principle influenced it.**

**Example:**
"Decision: Use in-memory job queue for MVP
Rationale: Constitutional principle 'Speed of Delivery' prioritizes shipping fast over perfect architecture. An in-memory queue is simpler than Redis/RabbitMQ and sufficient for initial scale. We accept the risk of lost jobs on restart because the constitution values iteration over robustness."

## Target Audience

Assume the primary readers are:
- **Developers implementing the feature** - need to understand architectural constraints
- **Future maintainers** - need to understand why decisions were made
- **Technical reviewers** - need to validate alignment with constitution

**Keep ADRs decision-focused:**
- Explain WHICH approach was chosen and WHY
- Document alternatives considered and rejected
- Make trade-offs explicit
- Reference constitutional principles
- Avoid implementation code (that belongs in the actual codebase)

## Output

*   **Format:** Markdown (`.md`)
*   **Location:** `/tasks/`
*   **Filename:** `adr-[feature-name].md`

## Final Instructions

1. **Verify both `CONSTITUTION.md` and use case exist** before proceeding
2. **Read both documents carefully** to understand constraints and requirements
3. **Use exact technologies from constitution** - don't suggest alternatives without strong justification
4. **Document decisions, not implementations** - explain the *what* and *why*, not the *how*
5. **Make constitutional alignment explicit** - reference principles in every major decision
6. **Keep it focused** - this is one feature's architecture, not the entire system
7. **Make trade-offs visible** - be honest about costs and limitations
8. **Ask clarifying questions** only about architectural gaps not covered by constitution or use case
9. **Do NOT include code examples** - only architectural descriptions and decision rationale
10. **Do NOT start implementing** - only create the decision record

## Example Structure

```markdown
# ADR: Medical Consultation Transcription Architecture

**Status:** Accepted  
**Date:** 2025-11-23  
**Context:** Use case `usecase-transcribe-consultation.md`, Constitution `CONSTITUTION.md`

## Decision Summary

Two-phase transcription system: live transcription during consultation using browser Web Speech API, followed by async optimized transcription via external LLM API. Prioritizes immediate doctor feedback over transcription quality, with quality improvement happening asynchronously.

## Context and Problem Statement

Doctors need real-time transcription during consultations for immediate reference, plus a high-quality version for medical records. Must align with constitutional principles: Speed of Delivery, Privacy by Default, Trust LLM.

## Key Architectural Decisions

### Decision 1: Dual Transcription Sources

**Choice:** Use browser Web Speech API for live transcription + external LLM API for optimization

**Rationale:**
- **Constitutional: "Trust LLM"** - Leverage external service expertise rather than building transcription
- **Constitutional: "Speed of Delivery"** - Web Speech API requires no backend setup
- **Technical:** Live feedback requires low latency; browser APIs provide this natively
- **Trade-off:** Live transcription quality is lower, but use case acceptance criteria accepts this for immediacy

**Alternatives Considered:**
- Single LLM source: Rejected due to latency (5-10s) incompatible with "live" requirement
- Build custom transcription: Rejected per constitutional "Trust LLM" principle

**Consequences:**
- Positive: Immediate feedback, no complex streaming infrastructure
- Negative: Two transcription sources to maintain, browser compatibility concerns
- Risks: Web Speech API accuracy may frustrate users (mitigated by async optimization)

### Decision 2: Async Processing with Polling

**Choice:** Backend async job queue with frontend polling for status

**Rationale:**
- **Constitutional: "Speed of Delivery"** - In-memory queue simpler than message broker
- **Technical:** Audio processing is slow (30s - 2min), can't block HTTP request
- **Simplicity:** Polling is simpler than WebSocket for MVP

**Alternatives Considered:**
- WebSocket streaming: Rejected as over-engineering for MVP (constitutional: speed over flexibility)
- Synchronous processing: Rejected due to HTTP timeout risks

**Consequences:**
- Positive: Simple to implement and debug
- Negative: Polling creates unnecessary API calls, scales poorly
- Risks: Job loss on server restart (accepted for MVP, improve post-launch)

### Decision 3: Ephemeral Audio Storage

**Choice:** Audio uploaded to LLM API directly, never stored in database or cloud storage

**Rationale:**
- **Constitutional: "Privacy by Default"** - Minimizes medical data exposure
- **Compliance:** Reduces HIPAA surface area (less data = less risk)
- **Simplicity:** No storage infrastructure needed

**Alternatives Considered:**
- Store audio in blob storage: Rejected due to privacy concerns and constitutional principle
- Store audio in database: Rejected for same reasons plus performance concerns

**Consequences:**
- Positive: Strong privacy posture, simpler architecture
- Negative: Cannot reprocess audio if LLM call fails
- Risks: Failed LLM calls require re-recording (accepted trade-off)

[... additional decisions ...]

## System Architecture Overview

**Components:**
- Frontend Recorder: Manages Web Speech API + MediaRecorder
- Frontend List: Displays consultations, polls for status
- Backend API: HTTP endpoints for CRUD operations
- Job Queue: In-memory async processor
- LLM Client: External API integration

**Data Flow:**
Recording → Browser APIs → Frontend → Backend API → Job Queue → LLM API → Database → Frontend (polling)

## API Contract Decisions

**Pattern:** REST with JSON (constitutional: simplicity, speed)
**Async Strategy:** Polling with 5s intervals (sufficient for MVP)
**Error Handling:** HTTP status codes + retry logic in frontend

## Data Architecture Decisions

**Storage:** PostgreSQL (Heroku default)
**Lifecycle:** Consultations persisted indefinitely, audio ephemeral
**Privacy:** No audio storage, transcriptions encrypted at rest (future)

## Testing Strategy

**Critical Paths Only** (constitutional):
- Audio upload → LLM → DB update flow
- Polling → completion detection flow
- Error retry logic

**Not Tested** (per constitution):
- Web Speech API wrapper (trust browser)
- UI rendering (manual QA)

## Deployment and Operations

**Strategy:** GitHub Actions → Heroku on merge to main (constitutional: automation)
**Config:** Environment variables for LLM API key
**Monitoring:** Server logs only (MVP)

## Open Questions

1. Which LLM provider? (OpenAI, AssemblyAI, Deepgram) - needs cost/accuracy analysis
2. Audio format compatibility with chosen LLM - verify during implementation
3. Notification mechanism for completion - defer to post-MVP
```
