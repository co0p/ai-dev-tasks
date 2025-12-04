## Output Structure and Examples

The generated design MUST follow this structure:

```markdown
# Design: <Short, Descriptive Title>

## 1. Context & Problem

- Short restatement of:
  - The increment’s goal (WHAT).
  - Why this change is being made now.
- Links to:
  - `increment.md`
  - `CONSTITUTION.md`
  - Relevant ADRs or prior designs.

## 2. Proposed Solution (Technical Overview)

- High-level description of the design.
- Which components/modules/services are involved.
- How responsibilities are split or changed.
- Any new interfaces, contracts, or data flows introduced.

## 3. Scope & Non-Scope

- In-scope technical changes for this increment.
- Explicitly out-of-scope items, even if related.
- How this fits into any broader roadmap or architecture, if relevant.

## 4. Architecture & Boundaries

- Description (and optionally diagrams) of:
  - Components and their interactions.
  - Key data flows and lifecycles.
- Reference to guardrails from `CONSTITUTION.md`:
  - Layering rules.
  - Ownership boundaries.
  - Allowed dependencies.
- How the design respects or, with justification, adapts those guardrails.

## 5. Contracts & Data

- New or changed:
  - APIs (request/response shapes, error handling).
  - Events or messages (schemas, topics/queues).
  - Data models or storage schemas.
- Compatibility considerations:
  - How existing consumers are affected.
  - Migration / versioning strategy if needed.

## 6. Testing & Safety Net

- Test strategy for this design:
  - Unit tests:
    - Which modules/functions/classes should be covered.
  - Integration / end-to-end tests:
    - Which flows or contracts must be exercised.
  - Regression tests:
    - Known bugs that should be prevented from reoccurring.
- Notes on:
  - Test data / fixtures.
  - Potential flakiness risks and mitigations.

## 7. CI/CD & Rollout

- CI implications:
  - Any new jobs or pipeline steps.
  - Changes to commands (build, lint, test) if any.
- Rollout plan:
  - How changes are expected to be deployed through existing pipelines.
  - Whether feature flags or staged rollout are recommended.
- Rollback plan:
  - How to revert or mitigate this change if it misbehaves.

## 8. Observability & Operations

- Logging:
  - What should be logged.
  - Important context fields (IDs, correlation tokens, user IDs, etc.).
- Metrics:
  - New or updated metrics (counters, histograms, gauges).
  - How they relate to user/business outcomes (e.g. success/failure rates, latencies).
- Alerts & Dashboards:
  - Any SLOs or alerts affected or introduced.
  - Dashboards that should be created or updated.

## 9. Risks, Trade-offs, and Alternatives

- Known risks:
  - Technical, operational, or organizational.
- Trade-offs:
  - Why this approach was chosen over obvious alternatives.
- Alternatives:
  - Brief description of alternatives considered.
  - When they might be revisited.

## 10. Follow-up Work

- Potential future increments:
  - Deeper refactors, optimizations, or feature expansions suggested by this design.
- Tech debt or clean-up:
  - Work that should be done later, but not in this increment.

## 11. References

- Links to:
  - `CONSTITUTION.md`
  - `increment.md`
  - ADRs
  - Relevant tickets/issues
```

### Examples (Conceptual)

Good designs using this structure typically:

- Address a **single increment**:
  - For example, “Add password reset endpoint” or “Instrument key usage metrics”.
- Touch a limited set of components:
  - E.g. one service and its API, or one front-end route and its backing calls.
- Include:
  - A clear testing strategy (unit + at least one integration/flow test).
  - A straightforward rollout and rollback approach.
  - Specific observability updates (logs/metrics) tied to the increment’s success criteria.

They are **short enough to read in minutes**, but detailed enough that an engineer can:

- Plan small, safe implementation steps.
- Write appropriate tests.
- Understand risks, trade-offs, and follow-up options.