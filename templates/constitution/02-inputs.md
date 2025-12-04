## Inputs

The constitution MUST be grounded in **the actual project or component** at the given path.

The executing LLM MUST:

1. **Treat the given path as the only subject**

   - Use the provided path argument as the **root of the subject** (for example: `.` or `services/auth`).
   - Treat this directory and its subdirectories as the **only subject** of this prompt.
   - The LLM MUST NOT:
     - Read or rely on content **outside** this directory as authoritative context.
     - Pull in READMEs, ADRs, or docs from parent directories, sibling projects, or other repositories as if they were part of this project.

2. **Identify key artifacts within this path**

   Within the given directory and its subdirectories, the LLM MUST look for:

   - A primary description artifact (e.g. `README.md` under that path).
   - Any existing `CONSTITUTION.md` under that path (for revisions).
   - Architecture docs, ADRs, contributing guidelines, or design notes under that path.
   - CI/CD workflows, tests, and configuration that live under that path.

   These are the **authoritative context** for:

   - What the system/component is.
   - Who it serves.
   - Current goals, constraints, and non‑negotiables.

3. **Infer current practices (only from inside the path)**

   - Inspect, inside the given path:
     - Code structure (modules, folders, services).
     - Existing tests.
     - CI/CD and automation (e.g. workflows, scripts).
     - Configuration and deployment artifacts.
   - Infer:
     - Implicit architectural style.
     - Current approaches to testing and quality.
     - Any hints about observability (logging, metrics, tracing).

4. **Respect what already works (within this path)**

   - If the scoped project/component already follows good practices:
     - Capture and **reinforce** those practices in the constitution.
   - If it shows gaps or inconsistencies:
     - Gently **nudge** the constitution toward better practices (DORA-aligned, modern SE),
       without pretending the project is something it is not.

5. **Ignore host/framework details as subject**

   - If this project lives inside a larger mono-repo or framework:
     - Treat the surrounding repo and other services as **background**, not as the subject.
     - Only reference them if:
       - They are clearly referenced from within the scoped directory, and
       - Their role is relevant to describing dependencies or constraints.