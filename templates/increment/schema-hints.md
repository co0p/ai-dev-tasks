# JSON Schema Hints (Increment)

Internal-only JSON structures for tooling/CI.

- ClarificationRequest (Step 4)
  - `step`: "questions"
  - `questions[]`: id (int), label (string), question (string), options[] with key in [A..Z, "X", "_"] and label.

- Proposal (Step 5)
  - `step`: "proposal"
  - `title`: string
  - `job_story`: {when, action, outcome}
  - `assumption`: string
  - `acceptance_criteria[]`: {given, when, then}
  - `success_signal`: string
  - `out_of_scope[]`: strings

- Summary (Step 7)
  - `step`: "summary"
  - `sections_included[]`: [Title, Job Story, Assumption, Acceptance Criteria, Success Signal, Out of Scope]
  - `paths.increment`: string path (e.g., docs/increments/increment.md)
  - `last_updated`: YYYY-MM-DD
