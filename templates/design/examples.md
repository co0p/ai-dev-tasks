# Examples (Design)

Example outline for a tray menu increment:

- Modules:
  - `core/timer`: start/pause/resume; no OS calls
  - `adapters/tray`: tray icon + menu; invokes core actions
  - `app/main`: wiring + lifecycle
- Interfaces:
  - `Timer.start()`, `Timer.pause()`
  - `Tray.show()`, `Tray.onClick(menuItem)`
- Data flow:
  - User clicks tray → adapter calls core → core updates state → adapter reflects UI
- Tests:
  - Unit tests for core state transitions
  - Integration test: tray click triggers core methods
- Risks:
  - OS tray API differences → adapter layer contains variability
