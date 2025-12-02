package tray

import (
	"github.com/getlantern/systray"
)

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
