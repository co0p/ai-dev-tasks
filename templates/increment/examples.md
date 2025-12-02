# Examples (Increment)

- Title: "Add tray menu option: Start Pomodoro"
- Job Story: When I open the tray, I want to start a Pomodoro so I can begin focused work.
- Assumption: A single-click tray action improves adoption.
- Acceptance Criteria:
  - Given the app is running, When I click "Start Pomodoro", Then a 25-minute timer starts and the tray shows remaining time.
  - Given a running timer, When I click "Pause", Then the timer pauses and the tray indicates paused state.
  - Given a completed Pomodoro, When the timer ends, Then I receive a desktop notification for a 5-minute break.
- Success Signal: Users complete a full Pomodoro cycle without confusion.
- Out of Scope: Preferences UI; multi-language support.
