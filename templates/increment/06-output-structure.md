## Output Structure

The generated increment definition MUST follow this structure:

```markdown
# Increment: <Short, Product-Friendly Title>

## Context

- Brief description of the current situation or problem from a user/business perspective.
- Any important background:
  - Existing behavior or limitation.
  - Links to relevant design docs, ADRs, or previous increments.
- Key constraints or assumptions (time, scope, risk tolerance, etc.).

## Goal

- Outcome / hypothesis:
  - What will be different for users, customers, or the business after this increment?
- Scope:
  - What this increment will do.
- Non-goals:
  - What this increment explicitly will *not* address.
- Why this is a good, small increment:
  - Small, coherent, and evaluable.

## Tasks

- A product-level checklist of tasks, each including:
  - Task: outcome-level description (WHAT should be true).
  - User/Stakeholder Impact: who is affected and how.
  - Acceptance Clues: observable signs that this task is complete.
- Tasks MUST describe **WHAT**, not technical HOW.

## Risks & Assumptions

- Known risks (user impact, product fit, rollout concerns).
- Key assumptions that, if wrong, could change the plan.
- High-level mitigations where appropriate (still in outcome language).

## Success Criteria & Observability

- How we will know this increment is successful:
  - Changes in metrics, events, or user behavior.
  - Evidence we plan to look at after release.
- What we will observe after release:
  - Which dashboards, logs, or reports we’ll look at.
  - Any simple checks in staging/production to confirm behavior.

## Process Notes

- High-level notes about **how this increment will move through the workflow**, without prescribing technical steps:
  - It should be implemented via small, safe changes.
  - It should go through the normal CI/CD pipeline.
  - It should be rolled out in a way that allows quick recovery if needed.
- Detailed technical planning and implementation belong in:
  - `design.md` (technical approach).
  - `implement.md` (execution plan).

## Follow-up Increments (Optional)

- Brief descriptions of potential future increments that:
  - Extend this outcome.
  - Address related but out-of-scope work.
  - Further improve performance, reliability, or user experience.
```

The final output MUST:

- Use the headings above in this order.
- Fill each section with project-specific content based on the provided context and increment description.
- Avoid references to prompts, LLMs, or assistants.
- Keep “Tasks” focused on WHAT, leaving the HOW to later phases.