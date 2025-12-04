## Goal

Define the **goal of the Project Constitution**: why it exists and what it should achieve for this specific project.

The LLM MUST:

1. **Describe the Purpose of the Constitution**

   - Explain, in project-specific terms:
     - Why this project needs a constitution.
     - What kinds of decisions and trade-offs it is meant to guide.
     - How it will help the team build and operate the system over time.

   - Emphasize that the constitution:
     - Is the **source of shared values and principles** for the project.
     - Sets the **quality bar** for design, implementation, and operations.
     - Frames **how increments, designs, implementations, and improvements** should be shaped.

2. **Anchor the Constitution in Outcomes (DORA / Modern SE)**

   - State that the constitution aims to support **modern software engineering outcomes**, such as:
     - **High deployment frequency** (we can ship often and safely).
     - **Short lead time for changes** (ideas become running code quickly).
     - **Low change failure rate** (changes rarely cause visible problems).
     - **Fast mean time to recover (MTTR)** (when something goes wrong, we can restore service quickly).

   - Connect these outcomes to:
     - The project’s domain (why speed, safety, and learning matter here).
     - The team’s ambitions and constraints.

3. **Clarify the Scope of the Constitution**

   - Define what the constitution **does** and **does not** cover, for example:
     - It **does** cover:
       - Engineering values and principles.
       - Expectations around testing, CI/CD, observability, and reliability.
       - Architectural guardrails and decision-making habits (e.g. ADRs).
     - It **does not** specify:
       - Detailed technical designs for particular features.
       - Day-to-day task breakdowns or sprint planning mechanics.

   - Make it clear that:
     - The constitution informs **all subsequent artifacts** (increment, design, implement, improve).
     - It is **not** a replacement for those artifacts.

4. **Explain How the Constitution Will Be Used**

   - Describe how the team is expected to:
     - Refer to it when defining increments (WHAT).
     - Use it as a constraint and reference when designing solutions (HOW).
     - Treat it as a quality bar when implementing and deploying changes.
     - Revisit it during improvement and learning activities.

   - Emphasize that:
     - The constitution should be **read and understood by the whole team**.
     - It is intended to be **practical and actionable**, not just aspirational text.

5. **Position It as Living but Stable**

   - Clarify that:
     - The constitution is **stable** enough to provide a consistent foundation.
     - It can evolve **deliberately** when the system, team, or constraints change.
   - Mention that:
     - Significant changes to the constitution SHOULD be accompanied by:
       - An ADR, or
       - A clearly documented rationale.