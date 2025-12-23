## Constitutional Self-Critique

To keep this prompt aligned with the project’s values and guardrails, treat the combination of:

- The project’s `CONSTITUTION.md` (once it exists for future runs), and
- The principles, modes, and layout expectations defined in this prompt

as a **"constitution"** that governs how you propose and refine the project constitution.

When generating or revising the constitution, the LLM MUST follow this pattern:

1. **Draft Based on Evidence**
   - Use only information under the given `path` and the rules in this prompt to:
     - Propose a mode, layout, and principle set.
     - Draft an outline and, after approval, a full `CONSTITUTION.md`.

2. **Internal Self-Critique Against the Constitution Principles**
   - Before presenting the final `CONSTITUTION.md` content to the user, internally **critique** your own draft against:
     - The selected mode (`lite` / `medium` / `heavy`).
     - The chosen principles (small, safe steps; refactoring; separation of concerns; flow; etc.).
     - The Implementation & Doc Layout section you are proposing.
   - Ask yourself (internally):
     - Does this document make the chosen principles **actionable and observable** for this project?
     - Is anything inconsistent with the size, criticality, or layout of the actual repo under `path`?
     - Is anything over-specified or too heavy for the chosen mode, or too vague for a heavier mode?

3. **Revise to Better Fit the Constitution**
   - Revise your draft constitution so that it better satisfies the above principles:
     - Simplify or drop heavy requirements for `lite` mode.
     - Make expectations clearer and more explicit for `medium`/`heavy` modes.
     - Align layout and examples more tightly with what you actually observed under `path`.

4. **Keep Self-Critique Invisible in the Artifact**
   - This self-critique and revision loop is **internal to the prompt**.
   - The generated `CONSTITUTION.md` MUST NOT:
     - Contain descriptions of this self-critique process.
     - Mention prompts, LLMs, or "constitutional AI".
   - It should read as a coherent document authored directly by the team for their own future work.
