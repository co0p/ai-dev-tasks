# Examples Library

Use these small examples to inspire principle wording.

- Delivery Velocity: "Prefer PRs under 300 lines of diff, including at least one test touching changed code."
- Test Strategy: "Critical paths must have coverage at >= 80%; non-critical paths require smoke tests."
- Design Integrity: "Business rules live in domain modules; UI layers may not call persistence adapters directly."
- Simplicity First: "Abstract only after the third repetition across modules; otherwise duplicate and keep local."
- Technical Debt Boundaries: "Shortcut code must carry a TODO with a target cleanup date within 4 weeks."
- Dependency Discipline: "Introduce a new framework only via a pilot confined to a single module; wrap external APIs behind adapters."

Technical Decisions examples:
- Languages: "Primary language is Go for backends due to concurrency primitives and deployment simplicity."
- Frameworks: "Frontend uses SvelteKit adapter-static to produce immutable assets served by the backend."
- Deployment: "Build artifacts are immutable; versioned releases deploy via container images with SBOM attached."
