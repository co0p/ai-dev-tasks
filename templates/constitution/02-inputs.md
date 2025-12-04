## Inputs

The constitution MUST be grounded in **the actual project** at the given path.

The executing LLM MUST:

1. **Identify the subject project**

   - Use the provided project root path as the **target scope**.
   - Within that scope, locate:
     - A primary description artifact (e.g. `README.md`, a main doc, or similar).
     - Any architecture docs, ADRs, contributing guidelines, or design notes.
   - Treat these as the **authoritative context** for:
     - What the system is.
     - Who it serves.
     - Current goals, constraints, and non-negotiables.

2. **Understand current practices**

   - Inspect:
     - Code structure (modules, folders, services).
     - Existing tests.
     - CI/CD workflows (e.g. `.github/workflows/`).
     - Configuration and deployment artifacts (Dockerfiles, Helm charts, scripts).
   - Infer:
     - Implicit architectural style (layers, bounded contexts, etc.).
     - Current approaches to testing and quality.
     - Existing deployment model and environments.
     - Any hints about observability (logging, metrics, tracing).

3. **Respect what already works**

   - If the project already follows good practices:
     - Capture and **reinforce** those practices in the constitution.
   - If it shows gaps or inconsistencies:
     - Gently **nudge** the constitution toward better practices (DORA-aligned, modern SE),
       without pretending the project is something it is not.
   - Avoid:
     - Erasing or contradicting important domain realities.
     - Proposing values totally incompatible with clear, explicit constraints
       (e.g., if the project is offline-only, don’t define real-time observability as mandatory).

4. **Align with DORA & Modern Software Engineering**

   The constitution MUST explicitly address:

   - **Change Flow & Delivery**
     - Preference for **small, frequent, and reversible** changes.
     - Expectations around **branching, pull requests, and merging** (e.g. trunk-based, short-lived branches).
     - How the team wants to balance speed vs. risk.

   - **Feedback Loops (Tests & CI/CD)**
     - Expectations for **automated testing** (unit, integration, end-to-end).
     - What must pass before code can be merged (CI checks, required reviews).
     - Attitude toward **build / test flakiness** (e.g. zero tolerance).

   - **Reliability & Operability**
     - Baseline expectations for **availability, performance, and resilience**.
     - Importance of **observability**:
       - Logging (structured, contextual).
       - Metrics (key business and technical indicators).
       - Tracing (if applicable).
     - Expectations for **incident handling** and **post-incident review**.

   - **Architecture & Design**
     - Preference for **simple, modular designs** that are easy to change.
     - Encouragement of **clear boundaries** (e.g. domain vs. infrastructure).
     - Guidance on **technical debt**:
       - How it is tracked.
       - When it is acceptable.
       - When it must be addressed.

   - **Continuous Improvement**
     - How the team wants to use learning loops:
       - `improve.md` documents.
       - ADRs.
       - Retrospectives.
     - How to ensure that learning **changes behavior** (design, tests, code, process).

5. **Accommodate different project types**

   - Whether the project is a:
     - Library.
     - Service / backend.
     - CLI tool.
     - Frontend / UI.
     - Multi-component system.
   - The constitution SHOULD tailor expectations accordingly (e.g. canary releases may not make sense for a simple CLI, but tests and release discipline still do).