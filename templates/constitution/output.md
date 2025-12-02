# Constitution Output Format

The generated constitution should include the following sections:

## 1. Vision
Brief statement of the project's long-term purpose and aspirations.

## 2. Mission
Clear articulation of what the project aims to achieve and how.

## 3. Core Values
Fundamental beliefs and guiding principles for the team and project.

## 4. Architectural Principles
Explicit, testable, and specific rules that govern technical decisions. Each principle should be mapped to a pillar.

## 5. Update Process
A documented process for proposing, reviewing, and approving changes to the constitution as the codebase evolves.

## 6. Pillar Coverage
Checklist showing which pillars are addressed by the principles.

## 7. Technical Decisions
Declarative statements about tech stack choices and rationale.

## 8. Last Updated
Current date in YYYY-MM-DD format.

## 9. Increments Location
Explicit path policy for where increments live, using per-increment folders under the chosen base directory (e.g., `docs/increments/<increment-folder>/increment.md`).

## 10. LLM Collaboration & Increment Workflow
Policies for human–LLM collaboration, STOP gates, and branch-first execution:
- Human-first STOP gates: Clarification → Planned Files Summary confirmation → Drift Alert approval.
- JSON internal-only: Structured outputs are for tooling/CI and not user-facing.
- Non-interactive phase: After file plan confirmation, the implementer (LLM/human) may proceed autonomously until the next STOP gate or drift alert.
- Feature branch policy: All increment work occurs on `feature/<increment-slug>`; no direct commits to the default branch.
- Commit cadence: One commit per high-level task; granular and revertible.

## 11. Scope Drift Management
Rules to contain scope and surface risk early:
- Drift Alert: If work requires files/modules beyond the confirmed Planned Files Summary or increment scope, the implementer MUST STOP and announce a DRIFT ALERT.
- Scope update path: Propose a minimal scope change with explicit file list and rationale, or split into a follow-up increment.
- Design alignment: If acceptance criteria can’t be met as designed, request a design update before continuing.

## 12. Testing & Verification Policy
Test-first loop and verification expectations:
- Cycle: Write Test → Implement → Validate → Commit. Allow explicit manual checks when automated tests aren’t feasible.
- Critical-path testing: Prefer unit tests for core logic; accept manual checks for integration/UX.
- Verification mapping: Every task/subtask states how it will be verified against acceptance criteria.

## 13. Post-Implementation Stabilization
Required hygiene before merge:
- Documentation: Update README/usage and increment docs (design/implement notes, checkboxes).
- Hygiene: Add `.gitignore` entries for build outputs; untrack previously committed artifacts.
- Reproducibility: Ensure `Makefile`/scripts build cleanly from a fresh checkout; document prerequisites.
- Packaging: Verify bundling/distribution if within acceptance criteria.
- Formatting/Linting: Run minimally on touched files to avoid churn.

## 14. Merge & Release
Branch integration and release guidance:
- Merge strategy: Rebase/merge on the feature branch; then merge to default branch and push.
- Tagging: If release-worthy, create an annotated tag (`vX.Y.Z`) with brief notes.
- Cleanup: Delete local and remote feature branch after merge.

## 15. Documentation & Traceability
Artifacts and decision logging:
- Required per-increment docs: `increment.md`, `design.md`, `implement.md` with verification notes.
- Decision log: Record key choices, trade-offs, and drift alerts in `implement.md`.
- Traceability: Link tasks and verification to acceptance criteria.

## 16. Roles & Decision Gates
Responsibilities and approvals:
- Sponsor: Confirms scope and Planned Files Summary; approves drift changes.
- Implementer (LLM/human): Executes plan, raises drift alerts, proposes scope adjustments.
- Reviewer (optional): Sanity-checks stabilization steps and merge.

---

**Example Structure:**

```markdown
# Project Constitution

## Vision
[Project vision statement]

## Mission
[Project mission statement]

## Core Values
- [Value 1]
- [Value 2]
- [Value 3]

## Architectural Principles
### 1. [Principle Name] _(Pillar: [Pillar Name])_
**Statement:** [Declarative statement]
**Rationale:** [Why this exists]
**In Practice:**
- [Implication 1]
- [Implication 2]

[Repeat for each principle]

## Update Process
[How the constitution is updated]

## Pillar Coverage
- ✓ [Pillar Name] (Principle #)
- ✓ [Pillar Name] (Principle #)
- ✓ [Pillar Name] (Principle #)

## Technical Decisions
### Languages
- [Statement]: [Rationale]
### Frameworks
- [Statement]: [Rationale]
### Deployment
- [Statement]: [Rationale]
---
**Last Updated:** [Current Date]

## Increments Location
- Base directory: `docs/increments/`
- Per-increment folder structure: `docs/increments/<increment-folder>/increment.md`

## LLM Collaboration & Increment Workflow
- STOP gates: Clarification → Planned Files Summary → Drift Alert
- JSON internal-only; non-interactive after file plan confirmation
- Feature branch: `feature/<increment-slug>`; one commit per high-level task

## Scope Drift Management
- DRIFT ALERT on out-of-scope changes; propose minimal update or split increment
- Request design update if criteria require architectural change

## Testing & Verification Policy
- Test-first loop; manual checks allowed where tests aren’t feasible
- Critical-path unit tests; explicit verification mapping to criteria

## Post-Implementation Stabilization
- Docs updated; `.gitignore` hygiene; reproducible builds; packaging verified; minimal formatting

## Merge & Release
- Merge feature → default; push; optional tag; delete branch

## Documentation & Traceability
- Keep `increment.md`, `design.md`, `implement.md` updated; log drift decisions

## Roles & Decision Gates
- Sponsor approves scope and drift; implementer executes and reports; reviewer optional
```
