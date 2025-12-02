# Increment: Show a systray icon with a sample menu and Quit

## Job Story
**When** I start the desktop app and look at the system tray  
**I want to** see an app icon with a simple menu (e.g., Start, Pause, Quit)  
**So I can** quickly access core actions without opening a window

**Assumption Being Tested:** A visible tray icon with a minimal, discoverable menu improves usability and adoption for quick interactions.

## Acceptance Criteria
- **Given** the app is running  
  **When** the app initializes  
  **Then** a tray icon appears in the system tray

- **Given** the tray icon is visible  
  **When** I open the tray menu  
  **Then** I see menu items: `Start Sample`, `Pause Sample`, `Quit`

- **Given** the tray menu is open  
  **When** I click `Quit`  
  **Then** the app exits cleanly

- **Given** the tray icon is visible  
  **When** I click `Start Sample`  
  **Then** the app shows a temporary notification or console log indicating the sample action started

- **Given** the tray icon is visible  
  **When** I click `Pause Sample`  
  **Then** the app shows a temporary notification or console log indicating the sample action paused

## Success Signal
Users (or testers) can start the app, see the tray icon, open the menu, and successfully use the `Quit` action without confusion or errors. Optional: capture a simple metric (e.g., time-to-first-tray-action) during manual testing.

## Out of Scope
- Full Pomodoro logic/timers  
- Preferences UI and multi-language support  
- Persisted settings or analytics collection

---
Last updated: 2025-12-01
