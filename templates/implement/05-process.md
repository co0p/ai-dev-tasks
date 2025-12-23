## Process

Follow this process to produce an `implement.md` that is:

- Strictly grounded in `increment.md` and `design.md`.
- Organized as small, testable work items.
- Usable as a backlog for the increment.
- Respectful of `CONSTITUTION.md` (values, mode, and layout).

The `path` argument for this prompt points at an **increment folder** (for example: `.../increments/<slug>` or `.../docs/increments/<slug>`), containing `increment.md` and `design.md`. The **project codebase** and other documents live under the project root (the parent of this folder).

### Phase 1 – Gather and Summarize (STOP 1)

1. Gather Context

   - Read:
     - `CONSTITUTION.md` — values, principles, guardrails, delivery expectations, any `constitution-mode`, and any “Implementation & Doc Layout”.
     - `increment.md` — context, goal, non-goals, tasks (WHAT), risks, success criteria, observability.
     - `design.md` — technical approach, components, contracts, test/CI/observability plans, risks, follow-ups.
   - Optionally review:
     - Relevant ADRs.
     - Recent `improve.md` documents affecting this area.
   - Inspect existing **code and tests** that `design.md` references, under the project root.

2. Restate Increment and Design (Briefly)

   - In a few sentences, restate:
     - The increment’s main goal and non-goals.
     - The high-level design approach (components, flows, key contracts).
     - Any notable constraints or principles from the constitution (for example: `lite` mode, thin routes, test expectations).

3. Summarize Implementation Perspective → STOP 1

   - Present a concise summary that covers:
     - What must be true for implementation to be considered done (mapped to increment/design).
     - The main parts of the system that will see code changes.
     - The relevant constitution context (`constitution-mode`, layout hints) that affects how detailed the plan should be.
     - Any obvious implementation risks or tricky areas.
   - Clearly label this as **STOP 1**.
   - Ask the user to:
     - Confirm whether this understanding is correct.
     - Add any constraints or preferences that affect how work should be split (for example: “prefer backend-first”, “front-end work after API”).

   **Do not** start listing detailed work items until the user has responded to STOP 1.

### Phase 2 – Identify Workstreams and Steps (STOP 2)

4. Identify Workstreams

   - Group the work logically into 2–5 **workstreams**, for example:
     - “Domain/Backend changes”
     - “UI/Tray updates”
     - “Tests & fixtures”
     - “Observability/metrics”
   - For each workstream:
     - Name the relevant components and files (based on `design.md` and the code).
     - Note which sections or decisions in `design.md` they relate to.
   - When `constitution-mode` is `lite`:
     - Consider keeping the number of workstreams small and focused.

5. Propose Work Items (High-Level, TDD-Friendly)

   - For each workstream, propose a list of **small, testable work items** that naturally follow a TDD loop (**failing test first → make it pass → refactor**):
     - Each item should have:
       - A short, actionable title.
       - A reference to the relevant `design.md` section/decision.
       - Target files/modules under the project root.
       - A brief description of the intended change.
       - An explicit **TDD angle**, including:
         - Which tests to add or modify so they **fail first** for the new or changed behavior.
         - The minimal implementation needed to make those tests **pass**.
         - Any follow-up **refactorings** to clean up code while keeping tests green.
   - Ensure each work item is:
     - Scoped to be done in a focused session where practical.
     - Independently valuable or at least leaves the system in a coherent state.
     - Clearly executable as a small TDD cycle rather than a large, multi-step rewrite.

6. Order the Work Items

   - Propose an **execution order** across workstreams, considering:
     - Risk reduction (tests and safe abstractions early).
     - Dependencies (infrastructure before UI, etc.).
     - Opportunities for partial value (early visible wins).
   - This ordering will become the backbone of the final `implement.md`.

7. Present Workstreams and Draft Steps → STOP 2

   - Present:
     - The list of workstreams.
     - The proposed work items within each workstream.
     - The suggested overall order (a simple numbered list or phased grouping).
   - Clearly label this as **STOP 2**.
   - Ask the user explicitly:
     - Whether the grouping and order match their expectations.
     - Whether any workstreams or items should be added, removed, merged, or re-prioritized.
     - Whether the level of detail is appropriate for the project and `constitution-mode`.

   **Do not** generate the final `implement.md` until the user has approved this outline.

### Phase 3 – Constitutional Self-Critique of the Outline

8. Critique Draft Workstreams and Steps Against the Constitution and TDD Principles

   Before generating the final `implement.md`, the LLM MUST internally perform a **constitutional self-critique** of the proposed workstreams and steps:

   - Use as the evaluation basis:
     - `CONSTITUTION.md` (values, testing/observability expectations, dependency and layering rules, doc layout, `constitution-mode`).
     - The increment and design (`increment.md`, `design.md`) as scope and technical guardrails.
     - Implementation-specific principles for this prompt:
       - Each step follows a clear TDD loop (**failing test first → make it pass → refactor**).
       - Steps are small, reversible, and keep the system in a working or quickly fixable state.
   - For each workstream and step, ask internally:
     - Does this step respect the project’s constitutional principles (for example, layering, dependencies, testing, observability)?
     - Is the TDD pattern explicit enough (what fails first, what change makes it pass, what is refactored)?
     - Is the step small and concrete enough to be executed safely?
   - Revise the outline and steps **before** writing `implement.md` so they better satisfy these principles.
   - This critique and revision process is internal to the prompt and MUST NOT appear as a separate section or narrative in `implement.md`.

### Phase 4 – Write the Implementation Plan After YES and Self-Critique

9. Produce the Final `implement.md` (After STOP 2 Approval and Self-Critique)

  - Only after the user gives a clear affirmative response at STOP 2, and after performing the constitutional self-critique in Step 8, generate `implement.md` that follows the output structure (see output template) and implements the agreed outline, with any adjustments from user feedback and the internal self-critique.

   - While writing:
     - Do **not** introduce new architectural concepts or redesign decisions.
     - Do **not** restate the full design; refer to it in a focused way (per-step references).
     - Do **not** mention prompts, LLMs, self-critiques, or this process.
     - Keep steps **small, testable, and traceable** to `design.md`.
     - Ensure each step clearly encodes a TDD mini-cycle (fail test → make it pass → refactor).
     - Do **not** invent or extend contracts, interfaces, or data flows beyond what is in `design.md`.
     - If you find gaps or mismatches between the design and code:
       - Note them as risks or clarifications needed.
       - Do not silently create new contracts to work around them.

### Phase 5 – Final Check

10. Validate the Plan

   - Ensure:
     - Each step references:
       - A design decision/section.
       - Target files/modules.
       - Tests to add/update/run, organized as a TDD loop (fail → pass → refactor).
     - The steps are small, concrete, and can be executed independently.
     - The plan can be reasonably executed with XP practices (TDD, pairing, CI).
     - The plan respects any constraints from `CONSTITUTION.md` (mode, layout, testing expectations).

   - If anything is missing or unclear:
     - Add or adjust steps.
     - Optionally ask the user focused clarifying questions.

Once validated, present the final `implement.md` content. The host environment or user will save it in the same increment folder.