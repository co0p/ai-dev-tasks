## Constitutional Self-Critique

Treat the combination of:

- The project’s `CONSTITUTION.md` (mode, principles, architecture/dependency/testing guardrails, layout), and
- The design-specific rules in this prompt (stay within increment scope, no implementation tasks, clear contracts, testing/CI/observability expectations)

as a **"constitution"** that governs the technical design you produce.

Before finalizing `design.md`, the LLM MUST apply this self-critique and revision loop:

1. **Draft Design Based on Increment, Constitution, and Code**
   - Use `increment.md`, `CONSTITUTION.md`, architecture docs (for example `ARCHITECTURE.md`), and the existing code to:
    - Summarize findings at STOP 1 and propose/refine the outline at STOP 2.
    - Draft a design that explains components, boundaries, contracts, testing, CI/CD, and observability.

2. **Internal Self-Critique Against the Constitution and Scope**
   - After STOP 2 is approved and before emitting the final `design.md`, internally **critique** your draft against:
     - The project constitution (for example: layering, ownership, allowed dependencies, testing expectations, mode).
     - The increment’s goal, non-goals, and WHAT-level tasks.
     - The requirement to stay at the design level (no implementation task lists).
   - Ask yourself (internally):
     - Does this design respect architectural guardrails and boundaries from `CONSTITUTION.md` and existing architecture docs?
     - Does it stay within the agreed increment scope and non-goals?
     - Is it implementable in small, safe steps with a clear safety net and observability plan?

3. **Revise to Better Fit the Constitution**
   - Revise the design so that it more closely:
     - Aligns with architectural and dependency rules.
     - Scales its depth to the project’s `constitution-mode`.
     - Supports TDD and incremental delivery in the subsequent implementation plan.

4. **Keep Self-Critique Invisible in the Artifact**
   - This self-critique and revision loop is **internal to the prompt**.
   - The generated `design.md` MUST NOT:
     - Mention prompts, LLMs, or any self-critique process.
     - Refer to "constitutional AI" explicitly.
   - It should read as a coherent design document authored by the team, referencing only project concepts and artifacts.
