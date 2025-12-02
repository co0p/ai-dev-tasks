# Pomodoro Project Constitution

## Vision
Provide a lightweight, unobtrusive Pomodoro timer that helps people focus through simple cycles of work and break, living quietly in the system tray.

## Mission
Deliver a reliable desktop timer with accurate intervals, minimal UI, and smooth tray interactions, favoring simplicity and small, safe iterations.

## Core Values
- Focus: Prioritize core timing accuracy over feature breadth.
- Simplicity: Keep interactions minimal and predictable.
- Reliability: Favor stability and low resource usage.
- Adaptability: Wrap platform specifics to remain replaceable.

## Architectural Principles

### 1. Small, Safe Iterations _(Pillar: Delivery Velocity)_
**Statement:** Prefer small, incremental changes that keep the app usable and enable fast feedback.
**Rationale:** Balanced speed with stability suits a timer app; quick feedback reduces risk.
**In Practice:**
- Aim for PRs < 300 LOC diff with at least one test touching changed code.
- Use conservative defaults and feature flags for risky behavior.

### 2. Protect the Timer’s Core _(Pillar: Test Strategy)_
**Statement:** Ensure critical timing, state transitions (work/break), and tray actions have tests; non-critical UI paths get smoke tests.
**Rationale:** Timer accuracy and state logic are the product’s core value.
**In Practice:**
- Unit tests around duration tracking, pause/resume, and completion events.
- Integration test for tray menu actions where feasible.

### 3. Pragmatic Boundaries _(Pillar: Design Integrity)_
**Statement:** Keep timer logic in a core module; isolate OS/tray integrations behind adapters; allow pragmatic coupling where added layering would increase complexity.
**Rationale:** Tray/OS specifics shouldn’t leak into core timing logic; avoid premature architecture.
**In Practice:**
- No direct OS calls from core; use adapter interfaces.
- Accept light coupling in small apps; review boundaries during refactors.

### 4. Refactor When It Hurts _(Pillar: Simplicity First)_
**Statement:** Start simple; refactor reactively when duplication or friction affects development speed or correctness.
**Rationale:** A small utility benefits from low ceremony and targeted refactors.
**In Practice:**
- Duplicate once; abstract after patterns stabilize or the third repetition.
- Trigger refactor when changes touch 3+ places or cause frequent mistakes.

### 5. Time‑boxed Shortcuts _(Pillar: Technical Debt Boundaries)_
**Statement:** Allow tactical shortcuts with a visible TODO and a scheduled cleanup within 4 weeks.
**Rationale:** Maintain momentum while preventing lingering debt.
**In Practice:**
- Tag TODOs with owner + due date.
- Include cleanup tasks in weekly triage.

### 6. Wrap External Integrations _(Pillar: Dependency Discipline)_
**Statement:** Wrap third‑party/tray libraries behind adapters; confine experiments to a pilot module before broader adoption.
**Rationale:** Maintains replaceability and controls vendor coupling.
**In Practice:**
- One adapter per external lib; no scattered direct calls.
- Evaluate updates/library swaps behind the adapter boundary.

## Update Process
1. Propose changes via a PR updating this constitution and referencing impacted modules.
2. Link rationale to Core Values and mapped Pillars; include examples or benchmarks if relevant.
3. Review by maintainers; ensure acceptance checklist passes.
4. Merge and tag a release note entry; schedule any resulting refactors or cleanups.

## Pillar Coverage
- ✓ Delivery Velocity (Principle 1)
- ✓ Test Strategy (Principle 2)
- ✓ Design Integrity (Principle 3)
- ✓ Simplicity First (Principle 4)
- ✓ Technical Debt Boundaries (Principle 5)
- ✓ Dependency Discipline (Principle 6)

## Technical Decisions
### Languages
- Go for the backend/desktop logic due to concurrency primitives and deployment simplicity.
### Frameworks / Libraries
- System tray integration via a dedicated adapter around the chosen library.
### Deployment
- Single binary distribution; minimal dependencies; versioned releases.

## Increments Location
- Base directory: `docs/increments/`
- Per-increment folders: `docs/increments/<increment-folder>/increment.md`

---
**Last Updated:** 2025-12-01