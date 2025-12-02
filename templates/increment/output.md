# Increment Output Format

The generated increment should include the following sections:

## 1. Title
Short, descriptive title for the increment.

## 2. Job Story
**When** [situation]  
**I want to** [action]  
**So I can** [outcome]

## 3. Assumption Being Tested
Specific hypothesis for this increment.

## 4. Acceptance Criteria
Gherkin-style (Given/When/Then) acceptance criteria for observable outcomes.

## 5. Success Signal
How we know this increment works—metric or observation.

## 6. Out of Scope
What this increment does NOT include.

## 7. Implementation Guardrails & Branching
Operational guidance for the implement phase:
- Feature branch: All work occurs on `feature/<increment-slug>`; no direct commits to default branch.
- Planned Files Summary: Implementation must present and confirm a file plan before coding (STOP gate).
- Drift Alert: If implementation requires files/modules outside scope or the confirmed plan, STOP and propose a minimal scope update or a follow-up increment.
- Verification: Each task/subtask must state how it will be verified (tests or explicit manual checks).
- Stabilization: Complete post-implementation hygiene (docs, `.gitignore`, reproducible builds) on the same branch before merge.

---
**Example Structure:**
```markdown
# [Increment Title]

## Job Story
**When** [situation]  
**I want to** [action]  
**So I can** [outcome]

**Assumption Being Tested:** [Specific hypothesis for this increment]

## Acceptance Criteria
- **Given** [precondition]  
  **When** [action]  
  **Then** [observable outcome]
- **Given** [precondition]  
  **When** [action]  
  **Then** [observable outcome]
- **Given** [error condition]  
  **When** [action]  
  **Then** [error handling outcome]

## Success Signal
[How we know this increment works - metric or observation]

## Out of Scope
- [What this increment does NOT include]

## Implementation Guardrails & Branching
- Feature branch: `feature/<increment-slug>`; granular commits per high-level task
- Planned Files Summary: confirm before code changes (STOP gate)
- DRIFT ALERT: STOP on out-of-scope changes; propose minimal update or split increment
- Verification: map tasks to acceptance criteria with tests/manual checks
- Stabilization: docs + hygiene done on feature branch before merge
```
