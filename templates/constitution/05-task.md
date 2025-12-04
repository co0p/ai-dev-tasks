## Task – Required LLM Behavior and Steps

To achieve the goal described in `03-goal.md`, the LLM MUST follow this behavior and step sequence, keeping a human in the loop and staying strictly within the given directory.

### 1. Understand the Goal

- Interpret the user’s intent:
  - Is this a **new** constitution or a **revision** of an existing one under this path?
  - Are there any explicit focuses (e.g., “align more with DORA”, “tighten quality bar”, “clarify architecture boundaries”)?
- Internalize that the output should be:
  - A single `CONSTITUTION.md` file under the scoped project.
  - Matching the structure defined in the Output Structure template.
  - Fit for use as a long‑lived reference.

### 2. Survey Environment & Supporting Documents (Within the Given Path)

Within the **directory passed as argument** and its subdirectories ONLY:

- Read the primary description artifact under that scope (e.g. `README.md` there).
- If present under that scope, read:
  - `CONSTITUTION.md` (existing).
  - Architecture docs, ADRs, and design notes.
  - CI/CD workflows, tests, and configuration files stored under that path.
- The LLM MUST NOT:
  - Read or rely on content from parent directories, sibling projects, or other repositories as authoritative context.
- Maintain internal notes about:
  - Domain, users, and goals as described **within this scope**.
  - Current delivery practices, testing habits, and operational setup **visible in this scope**.
  - Visible constraints and recurring patterns inside the directory.

### 3. Summarize Findings → STOP 1

- Produce a **concise findings summary** that explains:

  - What the project appears to be and who it serves.
  - How it seems to be built and deployed (topology, main technologies).
  - How testing and CI/CD appear to function (roughly).
  - Any hints about observability and operations.
  - Key gaps, contradictions, or uncertainties.

- Clearly label this as **STOP 1** and:

  - Ask the user to confirm whether this summary is broadly correct.
  - Invite corrections, additions, or important missing context.

**Until the user responds at STOP 1, do not move on to proposing decisions or writing `CONSTITUTION.md`.**

### 4. Ask Clarifying Questions (If Needed)

- After presenting the findings, ask **targeted clarifying questions** only where critical, focusing on:

  - Non‑negotiable constraints (e.g. compliance, uptime, data sensitivity).
  - Preferred delivery style (e.g. trunk-based vs long-lived branches).
  - Quality expectations (minimum acceptable test/CI bar).
  - Operability expectations (logging, metrics, incident handling).

- Keep questions minimal and specific; avoid broad questionnaires.
- Incorporate the user’s answers into your internal understanding.

### 5. Summarize Proposed Constitution Decisions → STOP 2

- Before generating any full constitution text, present a **bullet-point outline** summarizing the proposed decisions, grouped roughly by:

  - **Values & Principles**
  - **Delivery & Flow of Change**
  - **Testing & Quality**
  - **Reliability & Operability**
  - **Architecture & Design Guardrails**
  - **Decision Capture & Continuous Improvement**

- This outline should be:

  - High-level and terse (no full prose yet).
  - Aligned with the project context and the clarified intent.

- Clearly label this as **STOP 2** and:

  - Ask the user explicitly to answer **yes/no** (or equivalent) to confirm the outline.
  - Invite them to ask for additions, removals, or changes.

**Do not write or overwrite `CONSTITUTION.md` before the user has confirmed this outline.**

### 6. Write the Constitution After Explicit YES

- ONLY after the user gives a clear affirmative (e.g. “yes”, “go ahead”, “looks good”) at STOP 2:

  - Generate the full `CONSTITUTION.md` that:

    - Follows the structure defined in the Output Structure template.
    - Implements the agreed outline, incorporating clarifications.
    - Encodes values, principles, and guardrails in clear, actionable language.

- While writing:

  - Do NOT introduce new major decisions that were not present in the confirmed outline.
  - Avoid references to prompts, assistants, or this process.
  - Keep content consistent with the project’s reality and the constitution’s stated goal.

- If the user responds “no” or requests changes at STOP 2:

  - Update the outline accordingly.
  - Re-present the updated outline.
  - Wait for another explicit **yes** before generating the final document.

### 7. (Optional but Recommended) Report After Writing

- After generating `CONSTITUTION.md`, briefly report to the user:

  - That the constitution has been written/updated.
  - The path (typically `CONSTITUTION.md` at the scoped root, unless otherwise specified).
  - Any notable highlights (e.g. number of sections, key changes if revising).