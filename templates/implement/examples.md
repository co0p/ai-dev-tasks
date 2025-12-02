
# Examples

## Planned Files Summary (sample)
- `src/tray/menu.go` — new — System tray menu adapter
- `src/tray/menu_test.go` — new — Unit tests for tray menu
- `cmd/app/main.go` — modify — Wire tray adapter into startup

## Concise subtask examples (human-first, precise)
- [ ] Create increment branch: run `git checkout -b <prefix>[increment-name]` (verify branch exists)
- [ ] Create `src/tray/menu.go` for the tray menu (verify file exists)
- [ ] Expose `Menu()` in `src/tray/menu.go` returning items (verify compile)
- [ ] Add click handler test in `src/tray/menu_test.go` (run, verify pass)
- [ ] Integrate adapter in `cmd/app/main.go` (verify menu appears)
- [ ] Manually test: click Start/Stop in tray (verify expected behavior)

## Verification phrasing (inline)
- “verify file exists”, “verify output in app”, “run, verify pass”, “verify menu appears”, “verify handler invoked”

## Branch naming
- Use the configured prefix (see schema-hints `git.featureBranchPrefix`). Examples:
	- `feature/tray-menu`
	- `feature/catalog-list`
