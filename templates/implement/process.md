
# Implementation Process


1. Receive implementation request for a specific increment.
2. MANDATORY: Create and switch to a new feature branch before making any implementation changes. Example:
	"Run: git checkout -b feature/<increment-name>"
	- All implementation work and commits must happen on this feature branch.
	- Do not proceed with any code changes until you are on the feature branch.
3. Verify prerequisites: CONSTITUTION.md, increment.md, and design.md exist.
4. Analyze context:
	- Read CONSTITUTION.md for principles, testing philosophy, and constraints
	- Read increment.md for acceptance criteria
	- Read design.md for initial approach, component boundaries, and data flow
5. Ask clarifying questions about edge cases, error handling, and integration points (STOP until answered).
6. Generate a minimal, incremental implementation plan: actionable steps, modules, and interfaces, each completable in 15-30 minutes and delivering testable progress.

7. Implement code in small, testable increments, mapping tasks to acceptance criteria and design approach.
8. After each task or subtask is completed, immediately check off the corresponding checkbox in the implementation plan to ensure accurate progress tracking.
9. After each high-level task is completed (and before switching to the next), make an incremental commit to the feature branch. This must be done explicitly to ensure progress is tracked and changes can be reverted easily.
10. Validate implementation against acceptance criteria, design, and constitution.
11. If the user chose to continue or switch branch, add a final step to commit all changes to the branch for easy reversion.
12. Document key decisions, trade-offs, and open questions.
