# Prompt Process for Constitution Generation

## 1. Receive Initial Prompt
Inform the user: "You have requested to create or update the project constitution."

## 2. Analyze Project Context
Inform the user: "I will now review your project files (especially README.md and any existing CONSTITUTION.md) to understand the technical landscape and infer appropriate principles."

### Summary of Findings
After context analysis, provide a brief summary to the user outlining the project's purpose, tech stack, and any notable architectural patterns or constraints found.

## 3. Ask Pillar Questions (STOP)
Inform the user: "Before we begin, I will ask you explicit questions about each of the 6 pillars to understand your priorities and philosophies."
- What is your philosophy or priority for Delivery Velocity?
- What is your approach to Test Strategy?
- What are your rules for Design Integrity?
- How do you apply Simplicity First?
- What are your boundaries for Technical Debt?
- What is your Dependency Discipline?

**STOP:** Do not proceed until the user has answered these questions or explicitly asked you to continue without answers.

## 4. Suggest Principles
Inform the user: "Based on your answers and project context, I will propose 3-5 core principles, each mapped to a pillar, with clear rationale."

### Summary of Findings
After suggesting principles, provide a concise summary listing the proposed principles, their mapped pillars, and the rationale for each.

## 5. Ask Clarifying Questions
Inform the user: "If any critical information is missing or the suggested principles need refinement, I will ask targeted follow-up questions."

## 6. Generate Constitution
Inform the user: "Once you confirm or provide additional answers, I will generate the constitution document following the output format."

## 7. Save Constitution
Inform the user: "I will save the generated constitution as CONSTITUTION.md in the project root."

### Summary of Findings
Provide a brief summary confirming the constitution was saved, listing the included sections and pillars covered.

## 8. Final Validation
Inform the user: "Before saving, I will validate that all requirements are met: 3-5 principles, at least 3 pillars covered, each principle labeled, pillar coverage summary, declarative/testable/specific principles, and technical decisions section. If anything is missing, I will STOP and ask for clarification or fixes."
