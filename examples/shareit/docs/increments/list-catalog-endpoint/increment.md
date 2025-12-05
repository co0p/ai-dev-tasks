Increment: List Catalog API

## Context

Shareit is a small, mobile-first demo webapp where users can add, borrow, return and view items. Clients (mobile web) need a reliable backend API to retrieve the current catalog of items so the UI can show what is available.

Currently the project describes catalog behaviors at a high level but does not include a focused, documented backend increment that guarantees a stable API for listing items. The project's constitution requires increment artifacts under `docs/increments/` and prefers small, testable changes with basic observability.

This increment focuses on delivering a single, small backend API that returns the item catalog so clients can depend on a canonical source of truth for available items.

## Goal

Outcome / Hypothesis
- Users (mobile/web clients) can fetch the canonical item catalog from the backend via a simple API endpoint so the client can reliably display available items.

Scope
- Add a single backend API that returns the catalog as a JSON array of item records (each record includes at least a human-readable title/name and an availability indicator). Provide basic request and error logging and automated tests that cover the endpoint surface.

Non-goals
- We will not implement authentication/authorization for the endpoint in this increment.  
- We will not add pagination, filtering, search, caching, or client-side UI changes in this increment.  
- We will not change other endpoints or perform broad refactors outside of small, necessary cleanup related to adding the API and tests.

Why this is a good increment
- It is small, self-contained, and testable.  
- It reduces client-side workarounds by providing a canonical server response.  
- It can be delivered through the project's normal CI and rollout process without special coordination.

## Tasks

- `Task:` Provide a backend API that returns the item catalog as an array of item records.  
  - `User/Stakeholder Impact:` Mobile/web clients can request and display the canonical list of items and their availability.  
  - `Acceptance Clues:` An HTTP request to the catalog API returns a 200 response with a JSON array; each item includes a name/title and availability; when items exist in the database the array is non-empty.

- `Task:` Ensure the API surface is covered by automated tests (unit tests and a small integration test).  
  - `User/Stakeholder Impact:` Engineers and QA are protected from regressions and can validate behavior quickly.  
  - `Acceptance Clues:` Test suite includes tests asserting the API returns the expected structure and status; tests run in CI and pass.

- `Task:` Add basic observability for catalog requests and errors (structured request and error logs).  
  - `User/Stakeholder Impact:` Developers and operators can inspect logs to confirm requests and diagnose failures.  
  - `Acceptance Clues:` Logs show entries for catalog requests and surface errors with contextual fields after exercising the endpoint.

- `Task:` Document the API behavior in the increment notes (short description and acceptance clues).  
  - `User/Stakeholder Impact:` Future implementers and integrators understand what the API returns and how to validate it.  
  - `Acceptance Clues:` This increment document describes the API behavior and contains the acceptance clues and a short QA checklist.

- `Task:` Provide a short QA checklist for validating the endpoint in staging.  
  - `User/Stakeholder Impact:` QA can manually verify the endpoint without special tooling.  
  - `Acceptance Clues:` A short, executable QA checklist is present in the increment and can be followed by a tester.

## Risks and Assumptions

- Risks:
  - If environments differ in data shape, clients may observe inconsistent fields. (Mitigation: acceptance clues specify a minimal required field set.)
  - Exposing item lists without authentication may expose data not intended for production use. (Mitigation: this is a demo app; auth can be added in a follow-up increment if needed.)

- Assumptions:
  - The project accepts a small API change with standard tests and logging.  
  - No infra or cross-team coordination is required to add a simple endpoint and tests.

## Success Criteria and Observability

- How we'll know this increment worked:
  - The catalog API responds with HTTP 200 and a JSON array of items when called from staging/production.  
  - CI includes and passes the new tests covering the API.  
  - Logs show catalog request entries and surface errors with adequate context.

- What to check after release:
  - Execute the QA checklist in staging: request the catalog endpoint and confirm response status and minimal fields.  
  - Verify CI test pass for the endpoint.  
  - Inspect logs for catalog requests and any error traces during the initial rollout period.

## Process Notes

- Implement as a single, small increment that goes through the normal CI pipeline (lint, tests, build).  
- Keep changes minimal and reversible; split any client or larger data-model work into separate follow-up increments.  
- Include a short QA checklist and note rollback considerations in the increment doc.

## Follow-up Increments (optional)

- Add pagination, sorting, and filtering to the catalog API.  
- Add authentication and per-user visibility rules for items.  
- Enhance client-side UI to consume the API reliably with caching and retry behavior.
