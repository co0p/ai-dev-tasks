# Implementation: Separate Frontend, Backend, and Docs Folders

## Relevant Files
- `/backend/` — Backend code
- `/frontend/` — Frontend code
- `/docs/` — Documentation

## Progress Tracking
- [ ] **Setup**
    - [ ] Create new folders: `/backend`, `/frontend`, `/docs`
    - [ ] Move existing backend code to `/backend`
    - [ ] Move existing frontend code to `/frontend`
    - [ ] Move documentation to `/docs`
- [ ] **Update Build/Deploy Scripts**
    - [ ] Update build scripts to use new folder structure
    - [ ] Update deploy scripts to use new folder structure
    - [ ] Verify build and deploy work without errors
- [ ] **Validation**
    - [ ] Confirm all code and docs are in correct folders
    - [ ] Confirm contributors can find code easily
    - [ ] Confirm build/deploy works

## Implementation Tasks & Subtasks
- [ ] Create `/backend`, `/frontend`, `/docs` folders
- [ ] Move backend code to `/backend`
- [ ] Move frontend code to `/frontend`
- [ ] Move docs to `/docs`
- [ ] Update build/deploy scripts
- [ ] Validate new structure

## Code Implementation
_N/A (structure change only)_

## Validation
- All code and docs are in correct folders
- Build and deploy scripts work
- Contributors report easier onboarding

## Key Decisions & Trade-offs
- Clear separation for maintainability and onboarding
- No code logic changes

## Open Questions
- Should any files remain in the root?
- Are there legacy scripts that need updating?
