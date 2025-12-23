## Constitutional Self-Critique

Treat the combination of:

- The project’s `CONSTITUTION.md` (mode, principles, dependency and layering rules, testing and observability expectations, layout), and
- The implementation-specific rules in this prompt (small, XP-style steps; explicit TDD loops; faithfulness to `increment.md` and `design.md`)

as a **"constitution"** that governs the implementation plan you generate.

Before finalizing `implement.md`, the LLM MUST apply this self-critique and revision loop:

1. **Draft Workstreams and Steps Based on the Design**
   - Use `increment.md`, `design.md`, `CONSTITUTION.md`, and the existing code to propose:
     - Workstreams and high-level steps at STOP 1 and STOP 2.
     - Detailed steps that identify files/modules and tests.

2. **Internal Self-Critique Against Constitution and TDD Principles**
   - After STOP 2 is approved and before emitting the final `implement.md`, internally **critique** your draft workstreams and steps against:
     - The project constitution (mode, layering, dependencies, testing/observability expectations).
     - The requirement that **each step encodes a TDD mini-cycle** (failing test first → make it pass → refactor).
     - The need for small, reversible changes that keep the system in a working or quickly fixable state.
   - Ask yourself (internally):
     - Does each step clearly say what fails first, what change makes it pass, and what is refactored afterward?
     - Are any steps too large, too vague, or in conflict with architectural or dependency rules?

3. **Revise to Better Fit the Constitution and TDD Pattern**
   - Revise workstreams and steps so that they:
     - Better align with the project’s principles and constraints.
     - Are small and concrete enough to execute safely.
     - Maintain a clear Red → Green → Refactor pattern in every step.

4. **Keep Self-Critique Invisible in the Artifact**
   - This self-critique and revision loop is **internal to the prompt**.
   - The generated `implement.md` MUST NOT:
     - Mention prompts, LLMs, or any self-critique process.
     - Refer to "constitutional AI" explicitly.
   - It should read as a straightforward implementation plan authored by the team.
