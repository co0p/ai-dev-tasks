
# ShareIt Project Structure & Getting Started

## New Folder Structure

- `/backend/` — Go backend code and API
- `/frontend/` — Svelte frontend code
- `/docs/` — Project documentation

## Development Workflow (Hot-Reload)

1. **Install dependencies:**
	```sh
	cd frontend
	npm install
	```

2. **Start the Go backend (API only):**
	```sh
	cd backend
	go run ./cmd/shareit/main.go
	```

3. **Start the Svelte frontend (hot-reload):**
	```sh
	cd frontend
	npm run dev
	```

4. **Access the app:**
	Open [http://localhost:5173](http://localhost:5173) in your browser.

The frontend will fetch catalog data from the backend via `/api/catalog` (proxy is configured in Vite for development).

## Production Workflow (Single Deployable)

1. **Build the Svelte frontend:**
	```sh
	cd frontend
	npm run build
	```

2. **Start the Go backend (serves API and static frontend):**
	```sh
	cd backend
	go run ./cmd/shareit/main.go
	```

3. **Access the app:**
	Open [http://localhost:8080](http://localhost:8080) in your browser.

The backend serves both API endpoints and the static frontend assets from the production build in `/frontend/build` (set via `@sveltejs/adapter-static`).

## Project Documentation & Workflow Clarification

All documentation is in the `/docs` folder:

- Increment plans: `increment.md` files per change initiative
- Implementation details: `implement.md` where relevant
- Design sketches (when needed): `design.md`
- Improvements & analysis: `improve.md`
- Architectural Decision Records (ADRs): `adr-*.md`

### ADR Creation Source
ADRs are produced during the **Improve** phase (via the Improve prompt) after implementation, not during the Design phase. The Improve prompt captures lessons learned, refactors, and promotes durable architectural decisions into ADRs.

### Phase Summary (ShareIt)
| Phase | Purpose | Primary Artifacts |
|-------|---------|-------------------|
| Constitution | Project principles & guardrails | `CONSTITUTION.md` |
| Increment | Goal / scope for a change | `increment.md` |
| Design (optional) | Rough approach if complexity warrants | `design.md` |
| Implement | Execute tasks & code | Code, tests, updated files |
| Improve | Reflect, refactor, record decisions | `improve.md`, `adr-*.md` |

Front/back separation, static serving, and testing strategies are now governed by ADRs under `/docs`.

## Svelte Project Quick Reference

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
cd frontend
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```sh
cd frontend
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
