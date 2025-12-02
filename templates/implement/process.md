
# Implementation Process


1. Receive implementation request for a specific increment.
2. MANDATORY: Create and switch to a new increment branch before making any implementation changes. Example:
	"Run: git checkout -b <prefix><increment-name>" (use configured branch prefix; see schema-hints `git.featureBranchPrefix`)
	- All implementation work and commits must happen on this increment branch.
	- Do not proceed with any code changes until you are on the increment branch.
3. Verify prerequisites: CONSTITUTION.md, increment.md, and design.md exist.
4. Analyze context:
	- Read CONSTITUTION.md for principles, testing philosophy, and constraints
	- Read increment.md for acceptance criteria
	- Read design.md for initial approach, component boundaries, and data flow
5. Ask clarifying questions about edge cases, error handling, and integration points (STOP until answered).
6. Generate a minimal, incremental implementation plan: actionable steps, modules, and interfaces, each completable in 15–30 minutes and delivering testable progress.

7. Before coding, propose a Planned Files Summary (paths + new/modify/delete + 1‑line purpose) and STOP for confirmation or edits.
	- Only proceed once the Planned Files Summary is confirmed.

8. For each high-level task, follow a test-first implementation cycle (Write Test → Implement → Validate → Commit):
	- Write Test: Write a small, failing test (or explicit manual verification step) that expresses the next behavior.
	- Implement: Add the minimum code to satisfy the behavior.
	- Validate: Run tests (or perform the manual steps) and ensure the behavior is verified. If not, iterate until it is.
	- Commit: Make a small, incremental commit capturing the completed task.
	- Note: If an automated test is not feasible for a specific task, define and execute a concise manual test the user can perform (steps + expected observation) and treat that as the Write Test step.
	- Reference: XP-inspired test-first cycle.

9. Implement code in small, testable increments, mapping tasks to acceptance criteria and the design approach.
10. After each task or subtask is completed, immediately check off the corresponding checkbox in the implementation plan to ensure accurate progress tracking.
11. After each high-level task is completed (and before switching to the next), make an incremental commit to the increment branch. This must be done explicitly to ensure progress is tracked and changes can be reverted easily.
12. Validate implementation against acceptance criteria, design, and constitution.
13. If the user chose to continue or switch branch, add a final step to commit all changes to the branch for easy reversion.
14. Document key decisions, trade-offs, and open questions.
