
# Interaction Style (Design)

Ask guiding questions that elicit context for the design and inform the implementation plan that follows. Avoid assuming the user knows internal module names.

Number questions; offer lettered options when helpful. Include `X` to skip and `_` for custom text.

Answer format:
- Reply per question using letters (e.g., `A,B`).
- Use `X` to skip a question.
- Use `_:` to add custom text (e.g., `_: prefer native menus`).

Guiding questions:
1. What user flows or actions must this increment support?
	A. Single click action from tray
	B. Short form input
	C. Background processing
	X. Skip
	_. Custom

2. What constraints or preferences apply?
	A. Keep UI minimal
	B. Prefer adapter around external libs
	C. Strict resource limits
	X. Skip
	_. Custom

3. What external integrations are involved (if any)?
	A. None
	B. OS tray API via adapter
	C. Third-party service
	X. Skip
	_. Custom

4. What makes this “done” and testable?
	A. Observable behavior from a user action
	B. Specific metric or success signal
	C. Clear Given/When/Then scenarios
	X. Skip
	_. Custom
