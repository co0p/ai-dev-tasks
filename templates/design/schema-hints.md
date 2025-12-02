# JSON Schema Hints (Design)

Internal-only JSON structures for tooling/CI.

- ClarificationRequest (early questions)
  - `step`: "questions"
  - `questions[]`: id, label, question, options (letters, X, _)

- Proposal (high-level design)
  - `step`: "proposal"
  - `modules[]`: {name, responsibility}
  - `boundaries[]`: {name, type, depends_on[]}
  - `interfaces[]`: {name, inputs[], outputs[]}
  - `risks[]`: {assumption, mitigation}

- Summary (artifact and date)
  - `step`: "summary"
  - `paths.design`: string path (e.g., docs/increments/<increment-folder>/design.md)
  - `last_updated`: YYYY-MM-DD
