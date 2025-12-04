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

- Branching and integration strategy (e.g. trunk-based, feature branches).
- Expectations for:
  - How often changes should merge to the mainline.
  - How often releases should happen.
- Non-negotiable rules for:
  - What has to be true before a change can be merged.
  - Acceptable and unacceptable deployment practices.

## Testing & Quality

- Types of tests expected (unit, integration, end-to-end, property-based, etc. as relevant).
- What “good enough” testing means for this project.
- Policies, such as:
  - No merging with failing tests.
  - How to handle flaky tests.
- Expectations for:
  - Test ownership.
  - Adding regression tests for bugs.

## Reliability & Operability

- Baseline reliability expectations (e.g. “no data loss”, “fast recovery over perfect uptime”).
- Observability expectations:
  - Logging (what, how structured, minimum context).
  - Metrics (key indicators, aggregation).
  - Tracing (if applicable).
- High-level approach to:
  - Incident management.
  - Post-incident reviews and learning.

## Architecture & Design Guardrails

- Preferred architectural style / modular structure (layers, hexagonal, microservices vs monolith, etc.).
- Boundaries that should not be crossed (e.g. who can depend on whom).
- Guidelines for:
  - Introducing new technologies.
  - Managing technical debt.
  - Refactoring and simplification.

## Decision Capture (ADRs & Docs)

- When to create or update ADRs.
- Where ADRs live and how they are named.
- How design docs, ADRs, and code reference each other.
- How to revise or supersede decisions in a controlled way.

## Continuous Improvement

- How the team expects to:
  - Use `improve.md` documents.
  - Run retrospectives or improvement reviews.
  - Turn incidents, surprises, and friction into better design, tests, and processes.
- Expectations for:
  - Regularly revisiting this constitution.
  - Adjusting practices as the system and team evolve.

## Scope & Exceptions

- Clarification of where these principles apply:
  - Entire repo vs specific services / modules.
- Acknowledgment of:
  - Known exceptions or constraints.
  - How new exceptions are documented and justified.

 ## The final output MUST:

Use the headings above in this order.
Fill each section with project-specific content based on the discovered context.
Avoid references to prompts, LLMs, or assistants.
Be written in clear, human-friendly language.