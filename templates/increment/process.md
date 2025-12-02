# Prompt Process for Increment Generation

## Operating Rules and Guardrails
- Human-first interaction. JSON is internal-only (tooling/CI).
- Align with `CONSTITUTION.md`; flag conflicts.
- Keep increments small, testable, observable.
- STOP gate at Step 4 until answered or waived.
- Date format: YYYY-MM-DD.
- JSON follows schemas exactly; no prose inside JSON.

## 1. Verify Prerequisites
Check for `CONSTITUTION.md` and read principles/constraints.

## 2. Receive Initial Prompt
Ask for a brief description of the desired capability.

## 3. Analyze Constitution
Summarize relevant principles, tech stack, and constraints.

## 4. Ask Clarifying Questions (STOP)
Ask 2–3 essentials:
- Capability/action?
- Assumption under test?
- Success definition?

STOP: Do not proceed until answered or explicitly waived.

Internally emit ClarificationRequest JSON.

## 5. Suggest Increment Structure
Propose a small, testable increment with Gherkin acceptance criteria.

Provide a concise summary: title, job story, assumption, criteria.

Internally emit Proposal JSON.

## 6. Generate Increment
On confirmation, generate `increment.md` per output format.

## 7. Save Increment
Save `increment.md` and confirm included sections.

Internally emit Summary JSON with sections, path, date.

## 8. Final Validation
Validate: job story, testable assumption, Gherkin criteria, success signal, out-of-scope. If missing, STOP and ask for fixes.

## Structured JSON Outputs

Visibility: Internal-only for tooling/CI. Do not surface JSON unless explicitly requested.

### ClarificationRequest (Step 4)
```json
{
	"step": "questions",
	"questions": [
		{ "id": 1, "label": "Capability", "question": "What specific capability are we building?", "options": [
			{"key": "A", "label": "Upload/select something"}, {"key": "B", "label": "Display/show something"}, {"key": "C", "label": "Process/transform something"}, {"key": "D", "label": "Save/persist something"}, {"key": "X", "label": "Skip"}, {"key": "_", "label": "Custom"}
		]},
		{ "id": 2, "label": "Assumption", "question": "What assumption are we testing?", "options": [
			{"key": "A", "label": "Users want this capability"}, {"key": "B", "label": "This approach is technically feasible"}, {"key": "C", "label": "This will improve a specific metric"}, {"key": "X", "label": "Skip"}, {"key": "_", "label": "Custom"}
		]},
		{ "id": 3, "label": "Success", "question": "What does success look like?", "options": [
			{"key": "A", "label": "User completes the action successfully"}, {"key": "B", "label": "Specific metric improves"}, {"key": "C", "label": "Feature works within time/size constraints"}, {"key": "X", "label": "Skip"}, {"key": "_", "label": "Custom"}
		]}
	]
}
```

### Proposal (Step 5)
```json
{
	"step": "proposal",
	"title": "...",
	"job_story": {"when": "...", "action": "...", "outcome": "..."},
	"assumption": "...",
	"acceptance_criteria": [
		{"given": "...", "when": "...", "then": "..."}
	],
	"success_signal": "...",
	"out_of_scope": ["..."]
}
```

### Summary (Step 7)
```json
{
	"step": "summary",
	"sections_included": ["Title", "Job Story", "Assumption", "Acceptance Criteria", "Success Signal", "Out of Scope"],
	"paths": {"increment": "docs/increments/increment.md"},
	"last_updated": "YYYY-MM-DD"
}
```
