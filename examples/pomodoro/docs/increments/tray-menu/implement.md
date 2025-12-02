# Implementation: Tray Menu & Systray Icon

## Planned Files Summary (Confirm Before Coding)
- `examples/pomodoro/go.mod` — new — Initialize standalone Go module for the Pomodoro demo
- `examples/pomodoro/app/main.go` — new — Entry point; initialize tray adapter, register menu, handle Quit
- `examples/pomodoro/core/sampleactions/sampleactions.go` — new — `StartSample()` and `PauseSample()` with observable logging
- `examples/pomodoro/adapters/tray/tray.go` — new — Tray interface and helper types (menu items, callbacks)
- `examples/pomodoro/adapters/tray/tray_systray.go` — new — Concrete adapter using `github.com/getlantern/systray` to show icon/menu
- `examples/pomodoro/assets/icon.png` — new — Placeholder icon for the tray (template-friendly)
- `examples/pomodoro/README.md` — modify — Add run instructions and manual test steps for the tray menu


## Implementation Tasks & Subtasks
- [ ] **Setup**
  - [ ] Create increment branch: run `git checkout -b feature/tray-menu` (verify branch exists)
  - [ ] Initialize Go module: run `cd examples/pomodoro && go mod init pomodoro` (verify `go.mod` created)
  - [ ] Add systray dependency: run `go get github.com/getlantern/systray@latest` (verify added to `go.mod`)
  - [ ] Add icon placeholder: add `examples/pomodoro/assets/icon.png` (verify file exists)

- [ ] **Core sample actions**
  - [ ] Create `examples/pomodoro/core/sampleactions/sampleactions.go` with `StartSample()` and `PauseSample()` (verify functions compile)

- [ ] **Tray adapter (interface)**
  - [ ] Create `examples/pomodoro/adapters/tray/tray.go` with `Tray` interface and menu item types (verify compile)

- [ ] **Tray adapter (systray impl)**
  - [ ] Create `examples/pomodoro/adapters/tray/tray_systray.go` using `systray` to display icon and menu (verify compile)

- [ ] **App wiring**
  - [ ] Create `examples/pomodoro/app/main.go` to wire adapter and actions; handle Quit (verify compile)

- [ ] **Integration & Manual Validation**
  - [ ] Run: `cd examples/pomodoro && go run ./app` (verify tray icon appears)
  - [ ] Manually test: click Start Sample (verify log/notification)
  - [ ] Manually test: click Pause Sample (verify log/notification)
  - [ ] Manually test: click Quit (verify app exits cleanly)

- [ ] **Quick Review & Commit**
  - [ ] Review code for style/standards (verify guidelines met)
  - [ ] Remove dead code and debug artifacts (verify cleanup)
  - [ ] Commit changes to the increment branch (verify commit)


## Code Implementation

> Provide only the essential code needed for completed subtasks. Prefer minimal diffs or final file snippets; keep commentary brief and human-oriented.

### examples/pomodoro/core/sampleactions/sampleactions.go
```go
package sampleactions

import "fmt"

func StartSample() {
	fmt.Println("[tray] start sample action")
}

func PauseSample() {
	fmt.Println("[tray] pause sample action")
}
```

### examples/pomodoro/adapters/tray/tray.go
```go
package tray

type Item struct {
	Title   string
	OnClick func()
}

type Tray interface {
	Show(title string, items []Item)
}
```

### examples/pomodoro/adapters/tray/tray_systray.go
```go
package tray

import (
	"github.com/getlantern/systray"
)

//go:build !js

// SystrayAdapter shows a tray icon and menu using getlantern/systray.
type SystrayAdapter struct{}

func (a SystrayAdapter) Show(title string, items []Item) {
	systray.Run(func() {
		if title != "" {
			systray.SetTitle(title)
		}
		for _, it := range items {
			m := systray.AddMenuItem(it.Title, "")
			go func(h func()) {
				for range m.ClickedCh {
					if h != nil {
						h()
					}
				}
			}(it.OnClick)
		}
		quit := systray.AddMenuItem("Quit", "exit app")
		go func() {
			for range quit.ClickedCh {
				systray.Quit()
			}
		}()
	}, func() {})
}
```

### examples/pomodoro/app/main.go
```go
package main

import (
	"examples/pomodoro/adapters/tray"
	"examples/pomodoro/core/sampleactions"
)

func main() {
	adapter := tray.SystrayAdapter{}
	items := []tray.Item{
		{Title: "Start Sample", OnClick: sampleactions.StartSample},
		{Title: "Pause Sample", OnClick: sampleactions.PauseSample},
	}
	adapter.Show("Pomodoro", items)
}
```

> Note: If module path differs, adjust imports accordingly (e.g., use your actual module name instead of `examples/pomodoro/...`).


## Validation
- Tray icon appears when running `go run ./app`.
- Menu contains `Start Sample`, `Pause Sample`, `Quit`.
- Clicking Start/Pause logs observable messages.
- Clicking Quit exits the app cleanly.


## Key Decisions & Trade-offs
- Chose `getlantern/systray` for portability and simplicity; adapter boundary preserves replaceability.
- Kept core actions minimal and observable (logs) to validate flow before integrating timer logic.


## Open Questions
- Icon packaging: embed with `//go:embed` or load from file? (current plan: simple placeholder file)
- macOS menu title/icon nuances: confirm appearance with template icons.
- Future: notification mechanism (native vs. logs) for sample actions.
