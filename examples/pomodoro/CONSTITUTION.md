# Project Constitution

## Context

- Short description: A small, lightweight Pomodoro timer that lives in the macOS menu bar and ships as a single Go binary. The app prioritizes minimalism: a focused, local productivity tool with no external services by default.
- Who it serves: macOS end users who want a simple tray-based Pomodoro experience and the maintainers who keep the project small and maintainable.
- High-level constraints:
  - Must remain a single distributable binary by default (standalone executable, no required background services).
  - Targets macOS desktop environments (tray/menu bar integration and macOS packaging considerations).
  - Privacy-first: no telemetry or cloud syncing enabled by default; any opt-in telemetry or crash reporting requires explicit justification and an ADR.

## Values & Principles

- **Small, Safe Changes:** Prefer tiny, focused commits and releases. Changes should be reversible within one deployment (keep release artifacts and tags so rollbacks are possible).
  - Rationale: small changes reduce cognitive load, speed reviews, and make regressions easier to isolate and revert.

- **Fast, Automated Feedback:** Every push must produce fast, machine-checkable feedback (build + lint at a minimum). CI should build the same single binary artifacts that releases use.
  - Rationale: quick feedback shortens lead time and prevents obvious regressions from reaching users.

- **Useful Tests, Not End-to-End Overhead:** Tests should guard core behavior (timer logic, persistence). Prefer fast unit and small integration tests; require a configurable minimum coverage for core packages (default: 60%).
  - Rationale: a small test surface that runs quickly preserves the project's simplicity while preventing regressions.

- **Simplicity Over Cleverness:** Avoid heavy frameworks or large dependencies that bloat binary size or increase maintenance. New dependencies require explicit justification and an ADR when they materially increase scope.
  - Rationale: small binary, simple build, and low maintenance burden.

- **Human-Centered Logs & Diagnostics:** Logs must be human-friendly, include timestamps and severity, and be easy for maintainers and users to collect when troubleshooting.
  - Rationale: as a local app, diagnosability relies on readable logs and clear reproduction steps from users.

- **Operational Minimalism:** The app favors local-first operability (logs, local persistence, user-facing error messages). Any move to external services (analytics, crash-reporting, cloud sync) requires a formal ADR and an explicit opt-in model.
  - Rationale: keep user trust and reduce operational complexity.

## Delivery & Flow of Change

- Trunk-based flow with small branches or direct commits to trunk for trivial fixes. Prefer frequent, incremental releases (semantic patch and minor releases) over large batches.
- Every PR must be small, focused, and include a clear, testable description of the change. Long-lived feature branches are discouraged.
- CI must produce reproducible single-binary artifacts for every tagged release and for main branch builds. Keep past artifacts and tags to enable rollbacks.
- Releases should include a short changelog and upgrade/rollback guidance when applicable.

## Testing & Quality

- Build + Lint: All pushes must run a build and linters. PRs cannot be merged unless these checks pass.
- Minimum Coverage: Core packages (timer, persistence, and public-facing logic) must meet a configurable minimum coverage (default: 60%). Coverage expectations for peripheral UI code are lower—prioritize behavior-tested logic.
- Fast Test Suite: Tests should run quickly (< 60s in CI on a modest runner) to keep feedback fast. Prefer unit tests and small integrations; avoid long, flaky end-to-end tests.
- Smoke Check: CI should run a smoke verification that the produced binary executes and returns a `--version` or `--help` output to confirm it was built correctly.
- PR Quality: Each PR should include acceptance criteria and, where appropriate, a short test plan or a screenshot/gif for UI changes.

## Reliability & Operability

- Logging: Write human-readable logs to stdout/stderr with timestamp and severity. Keep log volume low and focused (info, warn, error).
- Local Diagnostics: Document where local state and logs are stored (e.g., `~/Library/Application Support/<app>/` or a clear location). Include steps to collect logs for user reports.
- Crash Handling: By default, no external crash reporters are included. If a crash-reporting service is added, it must be opt-in and justified in an ADR.
- Release Support: Each release must have a short support note describing breaking changes, known issues, and rollback steps.
- Incident Triage: Minimal playbook—reproduce locally, gather logs, capture OS and binary version, and open an issue with reproducer steps. Document post‑mortem or improvement actions in `improve.md` or an ADR when relevant.

## Architecture & Design Guardrails

- Single-Binary Constraint: The application must remain buildable as a single executable. Avoid introducing background microservices or external runtime dependencies unless explicitly approved.
- Minimal Dependencies: Prefer the Go standard library and small, well-maintained packages. Any dependency that increases maintenance cost, binary size, or introduces native bindings requires an ADR and approval.
- UI Simplicity: Keep the tray/menu UI lightweight and responsive. Avoid heavy GUI frameworks that substantially increase binary size.
- Data & Config: Persist minimal state locally in a documented location using a simple, inspectable format (JSON, TOML, or similar). Configuration should be human-editable and documented.

## Decision Capture (ADRs & Docs)

- ADRs: Significant changes (introducing analytics, cloud sync, changing packaging model, adding native bindings, or changing the single-binary constraint) require an ADR. ADRs should explain trade-offs, alternatives, and a migration path.
- Docs with Releases: Maintain a `CHANGELOG.md` or release notes alongside releases. Update `README.md` and `CONSTITUTION.md` for long-lived changes.
- Living Constitution: Update `CONSTITUTION.md` via PRs and keep a short rationale for changes in an ADR when changes are material.

## Continuous Improvement

- Revisit Key Minimums: Review default test coverage, CI checks, and packaging cadence every few releases and adjust where the team has evidence it will improve outcomes.
- Learn from Incidents: Capture learnings in `improve.md` or an ADR. Prioritize small, reversible improvements to the build/test/release process.
- Safe Experiments: Experiments must be timeboxed, reversible, and have clear success criteria. Record experiments and outcomes so the team can learn quickly.

## Scope & Exceptions

- Scope: This document applies only to the `examples/pomodoro` project and its contents.
- Exceptions: Emergency fixes may temporarily bypass some rules (for example, skipping coverage checks for a critical security/compatibility patch). Any exception must be documented in the PR and reviewed in the subsequent retrospective.
