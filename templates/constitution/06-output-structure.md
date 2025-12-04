## Output Structure

The generated constitution MUST follow this structure:

```markdown
# Project Constitution

## Context

- Short description of the system and its purpose.
- Who it serves (primary users or stakeholders).
- High-level constraints (technology, regulatory, operational, etc.).

## Values & Principles

- A concise list (5–10 items) of the core engineering values and principles.
- Each item:
  - Has a short title (e.g. “Small, Safe Changes”).
  - Has a 2–5 sentence explanation.
- The list MUST cover:
  - Small, frequent, and reversible changes.
  - Fast, automated feedback (tests, CI).
  - Reliability and operability (including observability).
  - Simplicity and changeability.
  - Continuous learning and improvement.

## Delivery & Flow of Change

## Testing & Quality

## Reliability & Operability

## Architecture & Design Guardrails

## Decision Capture (ADRs & Docs)

## Continuous Improvement

## Scope & Exceptions
```

The final output MUST:

- Use the headings above in this order.
- Fill each section with project-specific content based on the discovered context and approved outline.
- Avoid references to prompts, LLMs, or assistants.
- Be written in clear, human-friendly language.