## Goal

Turn the approved **design** for this increment into an **ordered implementation plan** that:

- Respects the **Project Constitution** and the agreed `design.md`.
- Breaks work into **small, XP-style tasks** that can be executed via TDD and pairing.
- Identifies **files/modules** to touch for each task.
- Specifies **tests** and checks for each task.
- Can be executed incrementally and safely, while keeping the system in a working state.

The implementation plan MUST:

1. Stay Within Design and Increment Scope

   - Treat `design.md` as the **authoritative technical plan** for this increment.
   - Treat `increment.md` as the **scope guardrail** for product outcomes.
   - Do **not** redesign components, contracts, or data flows here.
   - If the design appears problematic, call it out as a **risk** or **follow-up increment**, not as a change to make in this plan.
   - Do **not** invent new contracts, interfaces, or data flows not described in `design.md`.
   - If you discover gaps or mismatches in the design:
     - Call them out as **risks** or **follow-up work**.
     - Do not silently redesign or extend the contracts in the implementation plan.

2. Produce Small, Testable Work Items

   - Each step should:
     - Be small enough to execute in a single focused session.
     - Identify clear **code locations** (files/modules).
     - Include a **testing/verification** angle (tests to add/update/run).
   - Steps should be written so that:
     - A developer can pick one step and complete it independently.
     - The system stays in a releasable or quickly-fixable state after each step where practical.

3. Preserve Traceability to the Design

   - Each work item should clearly reference:
     - The relevant section(s) or decision(s) in `design.md` that it implements.
   - The plan should make it obvious:
     - How the design will be realized incrementally.
     - Which parts of the design are covered by which tasks.

4. Support CI/CD and Review

   - Steps should naturally map to:
     - Small PRs or commits.
     - Clear CI expectations (which checks should pass).
   - Where helpful, note:
     - Groupings of tasks that can form a single PR.
     - Suggested points for partial rollouts or feature-flag flips.

5. Adapt to Constitution Mode

   - If `CONSTITUTION.md` defines a `constitution-mode`:
     - `lite`: Keep the plan as minimal as possible while still making steps clear and testable.
     - `medium`/`heavy`: Provide more explicit steps around validation, CI, and rollout where appropriate.

6. Apply a Constitutional AI Style of Self-Critique

   - Treat the combination of:
     - `CONSTITUTION.md` (values, principles, testing/observability expectations, dependency rules, doc layout), and
     - Implementation-specific principles (for this prompt), such as:
       - **Small, reversible steps** that keep the system in a working or quickly fixable state.
       - **Explicit TDD loops** for each task (failing test first, then make it pass, then refactor).
       - **Faithfulness to `design.md` and `increment.md`** (no silent redesigns),
   - as a **“constitution”** that governs the implementation plan.
   - When drafting the outline and the final list of steps, the LLM MUST:
     - Generate an initial version of workstreams and steps.
     - Internally **critique** these steps against the constitution and the TDD principles:
       - Are steps small and reversible enough?
       - Does each step clearly support a TDD loop (red → green → refactor)?
       - Do any steps conflict with constitutional guardrails (for example, dependency or layering rules)?
     - **Revise** the steps to better satisfy these principles before presenting `implement.md` to the user.
   - This self-critique and revision process MUST NOT appear inside `implement.md` itself; the artifact should read as a direct, well-considered plan from the team.