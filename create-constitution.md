# Rule: Generating a Project Constitution

## Goal

To guide an AI assistant in creating a lightweight project constitution that defines the core development principles and non-negotiable standards for the project. The constitution serves as the foundational reference for how the team builds software and makes technical decisions.

## Process

1.  **Receive Initial Prompt:** The user requests to create or update the project constitution.
2.  **Analyze Project Context:** Review existing project files (especially `README.md` and existing `CONSTITUTION.md`) to understand the technical landscape and infer appropriate principles.
3.  **Suggest Principles:** Based on the project context, propose 3-5 core principles with rationale.
4.  **Gather User Input:** Ask clarifying questions only if critical information is missing or if the suggested principles need refinement.
5.  **Generate Constitution:** Create the constitution document using the structure outlined below.
6.  **Save Constitution:** Save the document as `CONSTITUTION.md` in the project root.

## Context Analysis

Before generating the constitution, the AI should analyze:

*   **Technical Foundation:** If `README.md` exists, extract key values and standards if mentioned
*   **Project Type:** Web app, library, CLI tool, etc. (inferred from package.json, README, or file structure)
*   **Tech Stack:** Identify specific technologies in use:
    *   **Languages:** JavaScript, TypeScript, Python, Java, Go, Rust, etc.
    *   **Frontend Framework:** React, Vue, Angular, Svelte, Next.js, etc.
    *   **Backend Framework:** Express, NestJS, FastAPI, Django, Spring Boot, etc.
    *   **Database:** PostgreSQL, MySQL, MongoDB, Redis, SQLite, etc.
    *   **Build Tools:** Vite, webpack, esbuild, Turbopack, etc.
    *   **Testing Framework:** Jest, Vitest, Pytest, JUnit, Playwright, Cypress, etc.
    *   **Infrastructure:** Docker, Kubernetes, AWS, Vercel, Railway, etc.
*   **Existing Patterns:** Coding conventions, testing approaches, documentation practices
*   **Team Size/Maturity:** Solo project vs. team project (inferred from contributors, docs complexity)

## Suggesting Principles

Based on the analysis, suggest 3-5 principles that address:

1.  **Code Quality Standard** - What level of quality is non-negotiable?
2.  **Testing Philosophy** - When and how we test
3.  **Development Speed vs. Quality** - Where we strike the balance
4.  **Simplicity vs. Flexibility** - Our architectural bias
5.  **Documentation Expectations** - What must be documented

### Principle Selection Guidelines

**Good principles are:**
*   **Declarative:** State what IS, not what we hope to be
*   **Testable:** Can verify if we're following it
*   **Specific:** Concrete enough to guide decisions
*   **Limiting:** Rules out certain approaches or patterns
*   **Justifiable:** Has a clear "why"

**Examples of strong principles:**
*   ✅ "We write tests before fixing bugs" (specific, testable)
*   ✅ "We choose boring technology over cutting-edge" (guides decisions)
*   ✅ "All features must work without JavaScript" (limiting, testable)

**Examples of weak principles:**
*   ❌ "We value quality" (too vague)
*   ❌ "We try to write good code" (not limiting)
*   ❌ "We might add tests later" (not declarative)


### Technology Questions

When asking about technology, be specific about the stack:

```
1. What is your primary programming language?
   A. TypeScript/JavaScript
   B. Python
   C. Java/Kotlin
   D. Go
   E. Rust
   F. Other: ___________

2. What frontend framework are you using?
   A. React
   B. Vue
   C. Angular
   D. Svelte
   E. Next.js
   F. None (vanilla JS/HTML)
   G. Other: ___________

3. What backend framework are you using?
   A. Express
   B. NestJS
   C. FastAPI
   D. Django
   E. Spring Boot
   F. None (serverless/static)
   G. Other: ___________

4. What database(s) are you using?
   A. PostgreSQL
   B. MySQL
   C. MongoDB
   D. SQLite
   E. Redis
   F. None yet
   G. Other: ___________

5. What testing framework are you using?
   A. Jest
   B. Vitest
   C. Pytest
   D. JUnit
   E. Playwright/Cypress
   F. None yet
   G. Other: ___________
```

### Principle & Philosophy Questions

### Formatting Requirements

- **Number all questions** (1, 2, 3, etc.)
- **List options for each question as A, B, C, D, etc.** for easy reference
- Keep questions focused on missing critical context only
- allow the user to select multiple answers, AB for A and B for example.

### Example Questions

```
1. What is your primary quality constraint?
   A. Speed of delivery (move fast, fix later)
   B. Reliability (no broken features in production)
   C. Performance (must be fast and efficient)
   D. Maintainability (easy to understand and change)

2. What's your testing philosophy?
   A. Test everything (TDD, high coverage)
   B. Test critical paths only
   C. Test when it makes sense
   D. Minimal testing (move fast)

3. What's your approach to new technology?
   A. Conservative (proven tech only)
   B. Balanced (new tech for clear benefits)
   C. Progressive (early adopter)
   D. Experimental (try everything)
```

## Constitution Structure

The generated constitution should include the following sections:

### 1. Project Name & Purpose
Brief statement of what the project is and who it serves.

### 2. Core Principles (3-5 principles)

Each principle should include:
*   **Principle Name:** Short, memorable title
*   **Statement:** Clear declaration of the rule/standard
*   **Rationale:** Why this principle exists (1-2 sentences)
*   **In Practice:** Concrete example or implication

**Template for each principle:**
```markdown
#### [Principle Number]. [Principle Name]

**Statement:** [Clear, declarative statement of the principle]

**Rationale:** [Why this matters - the business/technical reason]

**In Practice:**
- [Concrete example or implication 1]
- [Concrete example or implication 2]
```


## Output Format

```markdown
# Project Constitution

## About This Project

[1-2 sentences: what the project does and who it serves]

---

## Core Principles

### 1. [Principle Name]

**Statement:** [Declarative statement]

**Rationale:** [Why this exists]

**In Practice:**
- [Implication 1]
- [Implication 2]

### 2. [Principle Name]

[Same structure...]

### 3. [Principle Name]

[Same structure...]

[4-5 if needed...]

## Technical Decicions

### Languages
- [Declarative statement]: [Why we chose this]
- [Declarative statement]: [Why we chose this]


### Frameworks
- [Declarative statement]: [Why we chose this]
- [Declarative statement]: [Why we chose this]

### Deployment
- [Declarative statement]: [Why we chose this]
- [Declarative statement]: [Why we chose this]


---


**Last Updated:** [Current Date in YYYY-MM-DD format]
```

## Example Output

See `/examples/constitution-example.md` for a complete sample constitution.

## Target Audience

The constitution is read by:
*   **Developers** making daily coding decisions
*   **Code reviewers** evaluating if PRs align with project values
*   **New contributors** understanding project philosophy
*   **Project leads** making architectural decisions

Keep language clear and avoid jargon. Principles should be memorable and easy to reference.

## Final Instructions

1. **Analyze first, ask second:** Review project context before asking questions
2. **Suggest, don't assume:** Propose principles based on analysis, but allow user to refine
3. **Keep it lightweight:** 3-5 principles maximum, each principle fits on screen
4. **Make it actionable:** Every principle should guide real decisions
5. **Save as `CONSTITUTION.md`** in project root
6. **Do NOT implement changes** based on the constitution - only create the document
