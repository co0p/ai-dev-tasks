# ADR: Separate Frontend, Backend, and Docs Folder Structure

## Context
Currently, the ShareIt project has frontend code, backend code, and documentation files intermixed in the same directory tree. This makes onboarding, navigation, and maintenance harder, and increases the risk of accidental changes across boundaries. Industry best practices recommend clear separation of concerns in project structure.

## Decision
Restructure the project so that:
- All frontend code and assets are located in a dedicated `frontend/` directory
- All backend code and assets are located in a dedicated `backend/` directory
- All documentation and architectural artifacts are located in a dedicated `docs/` directory
- Shared assets or configuration (if any) are placed in a top-level `shared/` or `config/` directory

## Consequences
- Improved clarity and maintainability
- Easier onboarding for new contributors
- Reduced risk of accidental cross-boundary changes
- Simpler CI/CD and deployment pipelines
- Minor refactoring required to move files and update references

## Alternatives Considered
- Keep current mixed structure: Simpler now, but harder to maintain and scale
- Use monorepo tools (e.g., Nx, Turborepo): Adds complexity, not needed for current scale
