# Project Constitution

constitution-mode: lite

## 1. Purpose and Scope

This project is a small, mobile-first demo webapp (Tailwind frontend, Express backend) packaged for simple deployment. This constitution gives short, pragmatic rules for how contributors evolve the app with minimal ceremony.

## 2. Implementation & Doc Layout

- **Increment artifacts**
  - Location: `docs/increments/<slug>/`
  - Files:
    - `increment.md` — goal, acceptance criteria (Given/When/Then), small tasks
    - `design.md` — optional short proposal for non-trivial changes
    - `implement.md` — implementation checklist, notes, and migration steps

- **Improve artifacts**
  - Location: `docs/improve/`
  - Filename pattern: `YYYY-MM-DD-improve-<short-slug>.md`

- **ADR artifacts**
  - Location: `docs/adr/`
  - Filename pattern: `ADR-YYYY-MM-DD-<slug>.md`

- **Other docs**
  - Architecture notes: `docs/architecture/`
  - Ops / run notes: `docs/ops/`

All human-facing documentation lives under `docs/`. Keep increments lightweight and link relevant increments from `README.md` or `docs/index.md`.

## 3. Design & Delivery Principles

- **Small, safe steps** (Kent Beck)
  - Prefer frequent, small, reversible changes over large risky ones.
  - Example: Split UI and backend changes into separate increments; each increment includes clear acceptance criteria and a rollback path.

- **Refactoring as everyday work** (Fowler, Feathers)
  - Treat refactoring as part of normal changes; clean up code you touch and add small tests to lock in behavior.
  - Example: Rename a confusing function and add a focused unit test in the same PR that uses it.

- **Pragmatic DRY & simplicity** (Thomas & Hunt)
  - Eliminate clear duplication but avoid speculative abstractions; prefer readable code and explicitness.
  - Example: Duplicate a tiny helper until two or three call sites justify extraction into a shared module.

## 4. Testing, CI/CD, and Observability

- **Testing**
  - New increments should include unit tests and, when helpful, a small integration test for any new API endpoints.

- **CI/CD**
  - CI should run linting, tests, and build (Docker image) before merging. Keep pipelines short and fast.

- **Observability**
  - For a demo app, basic structured request and error logging is sufficient. Keep logs clear and searchable.

## 5. ADR and Improve Usage

- **ADRs**
  - Use ADRs for decisions that will affect future contributors (framework choices, major API contracts, deployment patterns). Keep them short and dated.

- **Improve**
  - Use `docs/improve/` to record technical debt, intermittent issues, and proposals for refactors. Reference relevant increments when scheduling work.

---

This constitution is intentionally short and pragmatic. When the project grows or gains production users, revisit the constitution and consider moving to `medium` mode with stronger CI/observability expectations.
