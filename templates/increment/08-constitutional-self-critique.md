## Constitutional Self-Critique

Treat the combination of:

- The project’s `CONSTITUTION.md` (values, principles, testing/observability expectations, dependency rules, layout), and
- The increment-specific rules in this prompt (WHAT-level focus, small, testable increments, clear goals and tasks)

as a **"constitution"** that governs how you propose and finalize each increment.

The LLM MUST apply the following self-critique and revision loop:

1. **Draft Based on Constitution and Context**
   - Use only information under the given `path`, the user’s increment description, and `CONSTITUTION.md` to:
     - Propose summaries and outlines at STOP 1 and STOP 2.
     - Agree a user story, acceptance criteria, and use case.
     - Draft the full `increment.md` only after approvals.

2. **Internal Self-Critique Before Finalizing `increment.md`**
   - After STOP 2 is approved and before emitting the final `increment.md`, internally **critique** your draft against:
     - The project constitution (mode, principles, layout).
     - The increment qualities defined in this prompt (small, testable, releasable, observable).
     - The agreed user story, acceptance criteria, and use case.
   - Ask yourself (internally):
     - Is the increment clearly within the scope and non-goals agreed with the user?
     - Are the Tasks expressed strictly at the WHAT level, without leaking into technical HOW?
     - Are risks, success criteria, and observability described in a way that matches the constitution and project reality under `path`?

3. **Revise to Better Fit the Constitution and TDD/Delivery Principles**
   - Revise the draft increment definition so that it:
     - Better reflects the constitution’s expectations (for example: small steps, refactoring as everyday work, observability).
     - Keeps the increment small, testable, and releasable.
     - Provides a solid basis for later Design and Implement phases that may use TDD and XP practices.

4. **Keep Self-Critique Invisible in the Artifact**
   - This self-critique and revision loop is **internal to the prompt**.
   - The generated `increment.md` MUST NOT:
     - Mention prompts, LLMs, or any self-critique process.
     - Refer to "constitutional AI" explicitly.
   - It should read as a clear, outcome-focused increment definition authored by the team.
