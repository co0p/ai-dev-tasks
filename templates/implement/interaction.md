# Implementation Interaction Style

- Ask numbered clarifying questions about edge cases, error handling, and integration.
- Always STOP after questions until user answers or asks to continue.
- Document implementation steps and decisions clearly for both LLMs and humans.

Drift & Scope Alignment:
- If proposed changes exceed the increment scope or confirmed Planned Files Summary, announce a DRIFT ALERT and STOP.
- Offer a concise scope-adjustment proposal (files to touch + why) and wait for confirmation.
- If the increment’s acceptance criteria cannot be met as designed, request a design update before continuing.

Answer format:
- Reply per question using letters (e.g., `A,B`).
- Use `X` to skip a question.
- Use `_:` to add custom text (e.g., `_: prefer native API`).

Guiding questions:
1. Branching and scope control?
	A. Create increment branch now
	B. Continue on current branch (not recommended)
	C. Prepare branch name only
	X. Skip
	_. Custom

2. Test strategy emphasis?
	A. Unit tests first
	B. Manual verification first, add tests later
	C. Mixed (critical paths tested)
	X. Skip
	_. Custom

3. Integration approach?
	A. Adapter around external APIs
	B. Direct integration for speed
	C. Stub now, integrate later
	X. Skip
	_. Custom

4. Safety and rollback?
	A. Small commits every complete task
	B. Squash at end of increment
	C. Commit per subtask
	X. Skip
	_. Custom

5. Scope change if drift detected?
	A. Pause and update design first
	B. Expand Planned Files Summary minimally
	C. Split into a follow-up increment
	X. Skip
	_. Custom
