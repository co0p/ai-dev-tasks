# Design: Catalog List API

## Context and Problem

This increment delivers a small backend API that returns the canonical item catalog as JSON so mobile/web clients can reliably display available items. The increment goal and acceptance criteria are defined in `increment.md` in this folder.

- Project constitution: `examples/shareit/CONSTITUTION.md` (mode: `lite`). Keep the design pragmatic: unit tests + one small integration test, and basic structured logging.
- Current repo: the example describes an Express backend but does not yet contain a server implementation. This design assumes a new minimal Express service will live under `examples/shareit/backend`.

## Proposed Solution (Technical Overview)

Add a small Express-based backend at `examples/shareit/backend` exposing a single HTTP endpoint:

- `GET /api/catalog` — returns an array of item records. Each record includes at minimum: `id`, `name`, and `available` (boolean).

Responsibilities:
- Express app: route registration, request/response plumbing, error handling, and structured request logging.
- Catalog route handler: call the data layer, map DB rows to the API shape, return JSON or a 500 on error.
- Data layer (SQLite): provide a small, file-based SQLite DB and a thin module (e.g. `db/findAllItems()`) that returns items as plain JS objects.
- Tests: unit tests for the DB wrapper and route handler; a single integration test that boots the app against a seeded test DB and asserts the HTTP response.

Short request flow:
1. HTTP `GET /api/catalog` arrives at Express.
2. Logger records incoming request with a `request_id` and timestamp.
3. Route handler calls the DB wrapper to fetch rows.
4. Handler maps rows to the API shape and responds with 200 + JSON array.
5. On error, handler logs the error with context and responds with 500 + JSON error body.

## Scope and Non-Scope (Technical)

In-scope:
- `examples/shareit/backend` Express app and route `GET /api/catalog`.
- File-based SQLite DB (repo-seeded) and a thin DB wrapper module.
- Unit tests and one integration test using an ephemeral test DB file.
- Structured request and error logging (stdout JSON lines is acceptable for `lite` mode).
- Documentation in this increment folder (`design.md` and a QA checklist in `increment.md` or `implement.md`).

Out-of-scope:
- Authentication/authorization.
- Pagination, filtering, search, or caching.
- Client-side UI changes.
- Large refactors of unrelated code or cross-example CI changes.

## Architecture and Boundaries

Components:
- `examples/shareit/backend/server.js` — Express app bootstrap and middleware (logger, JSON body parser, error handler).
- `examples/shareit/backend/routes/catalog.js` — registers `GET /api/catalog` and references the data layer.
- `examples/shareit/backend/db.js` — thin wrapper around SQLite that exposes `findAllItems()`.
- `examples/shareit/backend/data/shareit.db` — seeded SQLite file for demo (or a migration/seed script that creates it on demand).
- `examples/shareit/backend/tests/*` — unit and integration tests.

Boundaries and guardrails:
- Keep domain logic minimal in route handlers; translation/mapping happens in the DB wrapper or a small serializer module.
- Respect the `lite` constitution: prefer simple, explicit code over speculative abstractions.
- Avoid introducing external infra; SQLite keeps local dev and CI fast and friction-free.

## Contracts and Data

HTTP contract — `GET /api/catalog`
- Success (200): JSON array of items. Example item:

```json
{
  "id": "1",
  "name": "Electric Drill",
  "available": true
}
```

- Error (500): JSON object, e.g. `{ "error": "internal error" }`. Errors are logged with context.

DB schema (recommended minimal `items` table):
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `name` TEXT NOT NULL
- `available` INTEGER NOT NULL -- 0 or 1

Mapping rules:
- `available` should be translated to a boolean in the API (`0` -> `false`, `1` -> `true`).
- Field names in the API must match the contract above; keep additional DB columns internal unless explicitly exposed later.

Compatibility and migration:
- This is a new endpoint — no existing client compatibility requirements. Document the contract in `increment.md` and `design.md`.
- If later changes are required, add explicit versioning (for example `v1` in path) in a follow-up increment.

## Testing and Safety Net

Test strategy (align with `lite` mode):

- Unit tests:
  - `db.findAllItems()` returns the correct JS objects for seeded DB rows and correctly maps `available`.
  - Route handler returns 200 and correct JSON when DB returns rows; when DB throws, handler returns 500 and logs.

- Integration test (single):
  - Use `supertest` to start the Express app in test mode with a test SQLite file seeded from SQL. Assert `GET /api/catalog` returns 200 and an array (non-empty with seed data).

- Fixtures and test data:
  - Provide a SQL seed script (`scripts/seed.sql`) or a tiny JS helper that creates a test DB file for CI.
  - Tests should create and tear down their test DB files to avoid state leaks.

Flakiness mitigation:
- Avoid network calls, time-based assertions, or external services in tests.
- Seed DB deterministically in test setup.

Regression coverage:
- Add a test ensuring the endpoint includes the required fields (`id`, `name`, `available`) to prevent accidental schema regressions.

## CI/CD and Rollout

CI implications:
- Add a `package.json` in `examples/shareit/backend` with scripts: `test` (runs unit & integration tests) and `start`.
- Ensure project-level CI invokes `npm ci && npm test` for the backend folder (if CI currently runs all example tests, no change needed). Keep pipeline steps fast.

Rollout:
- This is a small, self-contained change; normal pipeline (build + tests) is sufficient.
- For production-like deployments later, consider a feature flag if the endpoint needs to be toggled, but for this demo a code revert is an acceptable rollback path.

Rollback:
- Revert the PR or disable route registration behind a configuration flag. Because the change is additive, rollback risk is low.

## Observability and Operations

Logging (minimum for `lite` mode):
- Structured request log line on request completion with fields: `timestamp`, `request_id`, `method`, `path`, `status`, `duration_ms`, `result_count`.
- Error logs with: `timestamp`, `request_id`, `path`, `error.message`, `error.stack`.

Metrics (optional):
- `catalog_requests_total` counter and `catalog_errors_total` counter. These are optional for `lite` but useful for follow-ups.

Monitoring / alerts:
- For demo `lite` mode, rely on CI test results and log inspection. No formal SLOs/alerts required.

Operational notes:
- SQLite file is fine for a demo, but is not intended for high-concurrency production. Document this in `docs/ops/` if the example is used beyond local testing.

## Risks, Trade-offs, and Alternatives

Risk: Adding SQLite brings a native dependency which can complicate CI on some platforms.
- Mitigation: Use a well-supported sqlite package (for example `better-sqlite3`) and pin versions; include installation notes in `README.md`. If CI native build issues arise, fallback to a JSON-file-backed DAO in a follow-up.

Trade-off: SQLite vs. in-memory fixture
- Chosen: SQLite (file-based) for a more realistic data layer while keeping zero infra. Alternative (simpler): an in-memory seeded array in the DB wrapper — lower friction but less realistic persistence. If simplicity is preferred, use the in-memory option and document the trade-off.

## Follow-up Work

- Add authentication & per-user visibility rules.
- Add pagination, filtering, and search parameters.
- Replace SQLite with a production datastore if the example needs persistence beyond demo scope.
- Add lightweight metrics instrumentation and dashboard tiles if example is promoted to production-grade.

## References

- Increment: `increment.md` (this folder)
- Constitution: `../../CONSTITUTION.md` (project constitution for this example)
- Implementation suggestions: backend layout under `examples/shareit/backend/` (not yet present)
