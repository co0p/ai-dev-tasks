## Task

Generate a **Project Constitution** for the subject project at the given path, aligned with the **Goal** described above.

The constitution MUST:

1. **Express Core Values & Principles**

   Define a concise set of **values and principles** that will guide all future increments, designs, implementations, and improvements.

   At minimum, include the following themes:

   - **Flow of Small, Safe Changes**
     - Prefer small, incremental changes over large, risky ones.
     - Encourage short-lived branches and frequent merges to the mainline.
     - Avoid big-bang releases and long-running feature branches.

   - **Fast, Automated Feedback**
     - Treat **automated tests and CI** as non-negotiable for any change.
     - Define a minimal set of checks that MUST pass before merge:
       - Linting / formatting.
       - Unit tests and key integration tests.
       - Type checks / static analysis (where applicable).
     - Value **fast feedback**: slow or flaky pipelines are problems to fix, not to tolerate.

   - **Reliability and Operability**
     - Recognize that operating the system in production is part of engineering, not an afterthought.
     - Encourage:
       - Clear error handling and failure modes.
       - Structured logging with enough context for debugging.
       - Metrics that reflect both user-facing and system health.
     - Define expectations around:
       - Incident response.
       - Post-incident learning.
       - Reasonable on-call / support practices (if applicable).

   - **Test-first / Test-alongside Mindset**
     - Every meaningful change SHOULD be accompanied by tests:
       - Unit tests for new or changed logic.
       - Integration tests for critical flows.
       - Regression tests for fixed bugs.
     - Treat missing tests or failing tests as blockers.

   - **Simplicity & Changeability**
     - Favor simple, explicit designs over clever abstractions.
     - Prefer “boring” technology that is well-understood by the team.
     - Design modules and services so they can be **changed safely**:
       - Clear boundaries.
       - Limited implicit coupling.
       - Well-defined interfaces.

   - **Continuous Learning & Improvement**
     - Encourage regular use of:
       - `improve.md` documents.
       - ADRs for important decisions.
       - Retrospectives or improvement loops.
     - Normalize changing course when evidence shows a better path.
     - Treat refactoring and tech debt reduction as part of the work, not optional extras.

2. **Define Delivery & Operations Expectations**

   Include a section that describes **how the team prefers to deliver and operate** the system:

   - **Branching and Release Strategy**
     - E.g.:
       - Trunk-based development with small feature branches.
       - How often the team intends to release.
       - How releases are tagged and traced back to changes.

   - **CI/CD Requirements**
     - Which checks are mandatory for merge.
     - How the team treats failing or flaky builds.
     - When it is acceptable to bypass or manually intervene (ideally: almost never).

   - **Deployment & Rollback**
     - Expected deployment mechanisms (pipelines, scripts, tools).
     - Safe rollback strategies:
       - Revert commits.
       - Configuration switches.
       - Feature flags (where appropriate).

   - **Observability Basics**
     - Minimal expectations for:
       - Logging (structured, severity levels, correlation IDs).
       - Metrics (key indicators, aggregation).
       - Tracing (if applicable).
     - High-level approach to:
       - Incident management.
       - Post-incident reviews and learning.

3. **Clarify Architectural Guardrails**

   Include a section that sets **architecture guardrails**, for example:

   - Layering or modularity rules:
     - Domain/core code MUST NOT depend on UI or framework details.
     - Infrastructure concerns (DB, message brokers, APIs) are behind interfaces or adapters.
   - Data ownership and boundaries:
     - What belongs to which module/service.
     - Patterns for changes across boundaries (APIs, events, contracts).

   Guardrails should be **strong enough to avoid chaos**, but not so rigid that they block reasonable evolution.

4. **Describe How Decisions Are Captured**

   The constitution MUST describe how the team captures and maintains decisions, including:

   - When to create or update an **ADR**.
   - Where ADRs live (e.g. `docs/adr/`).
   - How ADRs are referenced from other artifacts (design docs, code comments, increment docs).
   - How old ADRs may be superseded or revised.

5. **Remain Concise and Actionable**

   - The constitution SHOULD be:
     - Short enough to be read end-to-end in a few minutes.
     - Specific enough to drive concrete behavior (e.g. “we run tests before merging” vs. “we care about quality”).
   - Avoid generic platitudes; prefer statements that a team could plausibly say “yes” or “no” to when evaluating their behavior.

The final document MUST:

- Read as a coherent, standalone `CONSTITUTION.md` for this project.
- Not mention prompts, assistants, or 4DC explicitly.
- Be written in a tone appropriate for a real project’s engineering team.