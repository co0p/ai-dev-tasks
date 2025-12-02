# Design: Tray Menu & Systray Icon

**Date:** 2025-12-02  
**Status:** Initial Technical Design

## Design Summary
Add a system tray icon with a minimal menu (Start Sample, Pause Sample, Quit). Use an adapter around the OS tray library to keep core logic independent. Align with constitution principles: Small, Safe Iterations; Protect the Timer’s Core; Pragmatic Boundaries; Wrap External Integrations. ADRs: none yet; design remains compatible with future ADRs.

## Technical Decisions
- **Language/Runtime:** Go desktop app  
  - **Rationale:** Matches constitution; simple distribution.  
  - **Trade-offs:** Limited native UI; rely on tray libs.  
  - **Alternatives Considered:** Cross-platform GUI frameworks; deferred.
- **Tray Integration:** Adapter `adapters/tray` wrapping chosen tray lib  
  - **Rationale:** Replaceability; isolates OS specifics.  
  - **Trade-offs:** Additional layer; minor complexity.  
  - **Alternatives Considered:** Direct lib calls; rejected (leaks OS specifics).

## Initial Approach
### Adapter Boundary
**Approach:** Implement `Tray` interface with `Show()` and handlers; wire menu items to callbacks.  
**Rationale:** Keeps OS/UI out of core; aligns with Wrap External Integrations.  
**Trade-offs:** Slight indirection; easier testing.  
**Alternatives to Consider:** Direct calls; generate thin facade.

### Core Hooks
**Approach:** Provide `core/sampleActions` functions (`StartSample()`, `PauseSample()`) that currently log/notify to validate flow.  
**Rationale:** Small, safe step; observable behavior without full timer.  
**Trade-offs:** Temporary actions; will evolve to timer calls.  
**Alternatives to Consider:** Immediate timer integration; larger scope.

### App Wiring
**Approach:** `app/main` initializes `TrayAdapter`, registers menu items, handles quit via clean shutdown.  
**Rationale:** Clear lifecycle; single entrypoint.  
**Trade-offs:** Minimal structure; grows with features.  
**Alternatives to Consider:** DI container; premature here.

## Architecture Overview
**Components:**
- `core/sampleActions`: temporary functions for Start/Pause sample actions (later map to timer).
- `adapters/tray`: tray icon + menu; invokes core actions and quit.
- `app/main`: wiring + lifecycle; initializes tray, registers menu.

**Data Flow:**
User clicks tray → `adapters/tray` → call `core/sampleActions` → log/notify outcome; `Quit` → `app/main` shutdown.

**Integration Points:**
- OS tray library via `adapters/tray` (choose specific lib and wrap).

**State Management:**
No persistent state; ephemeral actions only. Later, core timer state will be in `core/timer`.

## Implementation Constraints
- Keep menu minimal and discoverable.  
- No direct OS calls from core; use adapter.  
- Clean shutdown on Quit.  
- Traceability to constitution pillars/principles.

## Open Questions
- Which tray library to adopt (cross-platform support)?  
- Notification mechanism (native vs. logging) for sample actions.  
- Exact structure of `core/timer` when integrated.

## Save Location
`docs/increments/tray-menu/design.md`
