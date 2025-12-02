package main

import (
	"pomodoro/adapters/tray"
	"pomodoro/core/sampleactions"
)

func main() {
	adapter := tray.SystrayAdapter{}
	items := []tray.Item{
		{Title: "Start Sample", OnClick: sampleactions.StartSample},
		{Title: "Pause Sample", OnClick: sampleactions.PauseSample},
	}
	adapter.Show("Pomodoro", items)
}
