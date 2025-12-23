## Constitutional Self-Critique

Treat the combination of:

- The project’s `CONSTITUTION.md` (principles, architecture and dependency rules, testing and observability expectations, mode), and
- The lenses and output rules in this prompt (Assessment, Lessons, Improvements, ADRs)

as a **"constitution"** that governs how you analyze the codebase and propose improvements.

Before finalizing each dated improve document, the LLM MUST apply this self-critique and revision loop:

1. **Draft Assessment, Lessons, and Improvements Based on Evidence**
   - Use only information under the given `path` (code, tests, docs, architecture, prior increments/designs/implements/improves) to draft:
     - Assessment (including per-principle star ratings).
     - Lessons (Worked Well, To Improve, Emerging Patterns).
     - Improvements (lens, priority, effort, files, change, optional increment hints).

2. **Internal Self-Critique Against the Constitution and Lenses**
   - Before emitting the final `docs/improve/YYYY-MM-DD-improve.md`, internally **critique** your draft against:
     - The project constitution’s principles and mode (for example, how ambitious the changes should be).
     - The lenses (Naming, Modularity, Architecture, Testing, Duplication, Documentation, Delivery, Dependencies & Operability).
     - Architecture documentation expectations (for example, `ARCHITECTURE.md` and its Mermaid C4 diagrams) where relevant.
   - Ask yourself (internally):
     - Are Assessments and Lessons clearly anchored in observable evidence under `path`?
     - Are the proposed Improvements small, safe refactorings that respect layering, dependencies, and mode?
     - For architecture-related improvements, are the proposed changes and diagram updates consistent with the actual code and deployment topology?

3. **Revise to Better Fit the Constitution**
   - Revise Assessment, Lessons, and Improvements so that they:
     - Better reflect the project’s principles and mode (for example, avoid over-ambitious rewrites in `lite` mode).
     - Are concrete enough to be turned into future increments and designs.
     - Keep architecture docs (including `ARCHITECTURE.md` and C4 diagrams) in sync with the system where applicable.

4. **Keep Self-Critique Invisible in the Artifact**
   - This self-critique and revision loop is **internal to the prompt**.
   - The generated improve document MUST NOT:
     - Mention prompts, LLMs, or any self-critique process.
     - Refer to "constitutional AI" explicitly.
   - It should read as a dated improvement document authored by the team, grounded in the project’s own constitution and evidence.
