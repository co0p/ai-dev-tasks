## Goal

The goal of this prompt is to generate or update a **Project Constitution** for the subject project that:

1. **Accurately Describes the Scoped Project**

   - Is grounded in:
     - The files and structure under the given directory path.
     - Existing documentation found there (e.g. `README.md`, ADRs, design notes).
     - Current CI/CD and operational practices visible there.
   - Clearly explains:
     - What the system or component is and who it serves.
     - High-level constraints (technical, regulatory, operational) relevant to this scope.

2. **Defines Values, Principles, and Guardrails**

   - Expresses a clear set of **values and principles** that guide:
     - How changes are sized and delivered.
     - How quality is maintained (testing and CI).
     - How reliability and operability are treated.
     - How architectural decisions are made and captured.
   - Provides **guardrails**, not micromanagement:
     - Boundaries for architecture and dependencies.
     - Expectations for introducing new technologies or patterns.
     - Guidelines for handling technical debt and refactoring.

3. **Supports Modern Software Engineering and DORA Outcomes**

   - Encourages practices that lead to:
     - **High deployment frequency**.
     - **Short lead time for changes**.
     - **Low change failure rate**.
     - **Fast mean time to restore (MTTR)**.
   - Does this in a way that is realistic for the scoped project’s current context and constraints.

4. **Guides All Subsequent 4DC Phases**

   - Serves as the **“WHY” and system of values** that:
     - Increments (`increment.md`) must align with (WHAT to do next).
     - Designs (`design.md`) must respect (HOW to change the system).
     - Implementations (`implement.md`) must uphold (DO phase).
     - Improvements (`improve.md`, ADRs) refer back to when adjusting practices.
   - Is stable enough to be a reference, but can be revised deliberately when needed.

5. **Is Concise, Readable, and Actionable**

   - Can be read end‑to‑end in a few minutes.
   - Uses concrete, evaluable statements (e.g. “we run tests before merging”).
   - Avoids vague platitudes; teams should be able to say “yes” or “no” to whether they follow it.

The **goal** is the existence of such a `CONSTITUTION.md` for the scoped project—accurate, DORA‑aligned, and practically useful in guiding daily decisions.