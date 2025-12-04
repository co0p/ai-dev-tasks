## Acceptance Criteria for the Design

A generated `design.md` is considered **acceptable** when:

1. **Alignment with Constitution and Increment**

   - It clearly references and respects:
     - `CONSTITUTION.md` (values, principles, guardrails).
     - The current `increment.md` (goal, scope, non-goals).
   - It does not introduce scope that contradicts the increment or constitution.

2. **Clarity and Implementability**

   - Engineers can read the design and understand:
     - Which components must change.
     - Which contracts or data structures are affected.
     - What tests need to be added or updated.
   - It avoids ambiguous phrases like “just update it” without explanation.

3. **DORA / Modern SE Readiness**

   - The design supports making changes:
     - In **small, incremental steps**.
     - With a clear **test strategy** and **CI integration**.
   - It explicitly covers:
     - How the change will be safely deployed.
     - How it can be rolled back or mitigated.
     - How it will be observed and monitored.

4. **Risk and Trade-offs Visible**

   - Major risks and trade-offs are:
     - Named and briefly justified.
     - Not hidden or implied.
   - Potential follow-up work is suggested where appropriate.

5. **Structure and Style**

   - The document follows the structure defined in `05-output-and-examples.md`.
   - It is:
     - Concise but complete.
     - Written in straightforward, technical language.
     - Free of meta-comments about prompts or assistants.