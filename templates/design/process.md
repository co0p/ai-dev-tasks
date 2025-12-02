

# Prompt Process for Design Generation

## 1. Receive Initial Prompt
Inform the user: "You have requested a technical design for a feature increment."

## 2. Verify Inputs
Confirm `CONSTITUTION.md` and the increment’s `increment.md` are present.

## 3. Analyze Project Context
Review the constitution, increment, and any ADRs. Summarize: purpose, tech stack, patterns, constraints, relevant prior decisions.

## 4. Clarify (STOP)
Ask 2–3 essentials:

STOP: Do not proceed until answered or explicitly waived.
Note: Derive module names and boundaries from these answers during the design proposal. Do not expect the user to provide internal naming; infer and propose pragmatic structure.

## 5. Generate Technical Design
Based on the answers and context, propose a lightweight, focused technical design for the increment. Document key technical decisions, trade-offs, and alternatives. Use terms like "initial technical design", "design outline", "design draft", or "design proposal" for clarity and robustness.

## 6. Save Design
Save under the increment’s folder, e.g., `docs/increments/<increment-folder>/design.md`.

## 7. Final Validation
Validate:
- Addresses increment acceptance criteria
- Respects constitutional principles and constraints
- Documents 2–5 key technical considerations
- States trade-offs and alternatives
- Concise and focused (one screen max)

## Operating Rules and Guardrails
- Human-first interaction. JSON is internal-only (tooling/CI).
- Align with `CONSTITUTION.md`; flag conflicts.
- Design for small, testable steps; avoid over-engineering.
- STOP gate at Clarification until answered or waived.
- Date format: YYYY-MM-DD.
- JSON follows schemas exactly; no prose inside JSON.

