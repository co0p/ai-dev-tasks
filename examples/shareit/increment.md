# Separate Frontend, Backend, and Docs Folders

## Job Story
**When** onboarding a new contributor  
**I want to** find code and documentation in clearly separated folders  
**So I can** get started quickly and work efficiently

**Assumption Being Tested:** Clear folder separation will help developers onboard faster

## Acceptance Criteria
- **Given** the project root  
  **When** I look for backend code  
  **Then** I find it in `/backend`
- **Given** the project root  
  **When** I look for frontend code  
  **Then** I find it in `/frontend`
- **Given** the project root  
  **When** I look for documentation  
  **Then** I find it in `/docs`
- **Given** the new structure  
  **When** I run build and deploy scripts  
  **Then** they work without errors

## Success Signal
Build and deploy scripts work with the new structure; contributors report easier onboarding

## Out of Scope
- Refactoring code logic or adding new features
- Changing deployment targets or environments
