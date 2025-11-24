# Rule: Generating a Use Case Specification

## Goal

To guide an AI assistant in creating a lightweight, focused use case specification in Markdown format. Each use case describes all the ways of using a system to achieve a particular goal for a particular user, with emphasis on validating or falsifying a core assumption through a minimal increment.

## Prerequisites

Before generating a use case, verify that a `CONSTITUTION.md` file exists in the project root. The constitution defines the project's core principles, technical decisions, and development philosophy.

**If `CONSTITUTION.md` does not exist:**
- Inform the user that a constitution is required first
- Suggest using `create-constitution.md` to generate one
- Do not proceed with use case generation until the constitution exists

**If `CONSTITUTION.md` exists:**
- Read and understand the project's core principles
- Use the constitution to guide technical approach and implementation decisions
- Ensure the use case aligns with the project's stated values and constraints

## Process

1.  **Verify Prerequisites:** Check for `CONSTITUTION.md` and read it if present.
2.  **Receive Initial Prompt:** The user provides a brief description or request for a new feature or functionality.
3.  **Ask Clarifying Questions:** Before writing the use case, the AI *must* ask only the most essential clarifying questions needed to write a clear specification. Limit questions to 3-5 critical gaps in understanding. Focus on understanding the user goal, the assumption being tested, and what success/failure looks like. Make sure to provide options in letter/number lists so I can respond easily with my selections.
4.  **Generate Use Case:** Based on the initial prompt, the user's answers to clarifying questions, and the project constitution, generate a use case specification using the structure outlined below.
5.  **Save Use Case:** Save the generated document as `usecase-[feature-name].md` inside the `/tasks` directory.

## Clarifying Questions (Guidelines)

Ask only the most critical questions needed to write a clear use case specification. Focus on areas where the initial prompt is ambiguous or missing essential context. Common areas that may need clarification:

*   **User Goal:** If unclear - "What specific goal is the user trying to achieve?"
*   **Core Assumption:** If unstated - "What assumption are we testing with this increment?"
*   **Success/Failure Criteria:** If vague - "How will we know if this assumption is validated or falsified?"
*   **User Context:** If missing - "What is the user's situation or context when they need this?"
*   **Scope Boundaries:** If broad - "What is the single, minimal increment that can test this assumption?"

**Important:** Only ask questions when the answer isn't reasonably inferable from the initial prompt. Prioritize questions that would significantly impact the use case's clarity or testability.

### Formatting Requirements

- **Number all questions** (1, 2, 3, etc.)
- **List options for each question as A, B, C, D, etc.** for easy reference
- Make it simple for the user to respond with selections like "1A, 2C, 3B"

### Example Format

```
1. What specific goal is the user trying to achieve?
   A. Find information quickly
   B. Complete a transaction
   C. Share content with others
   D. Configure settings

2. What assumption are we testing with this increment?
   A. Users want this capability
   B. This approach is technically feasible
   C. This will improve a specific metric
   D. Users will understand how to use this

3. What does success look like?
   A. Users complete the task in X seconds
   B. X% of users successfully use the feature
   C. Specific metric improves by X%
   D. Users provide positive feedback

4. What is the user's context when they need this?
   A. During onboarding
   B. During regular workflow
   C. When encountering an error
   D. When trying to accomplish task X
```

## Use Case Structure

The generated use case specification should include the following sections:

1.  **Use Case Title:** A clear, concise name describing the user goal (e.g., "User uploads a profile picture").
2.  **User Goal:** What the user wants to accomplish and why it matters to them.
3.  **Assumption Being Tested:** The core assumption this increment will validate or falsify.
4.  **User Context:** When/where/why the user needs this capability. What's their situation?
5.  **Main Success Scenario:** Step-by-step description of the happy path - how the user accomplishes their goal.
6.  **Alternative Paths (if any):** Other valid ways the user might accomplish the same goal.
7.  **Acceptance Criteria:** Specific, testable conditions that must be true for this use case to be considered complete.
8.  **Success Metrics:** How we'll measure if our assumption was validated (e.g., "80% of users complete the flow", "Task completion time < 30 seconds").
9.  **Failure Signals:** What would indicate our assumption was falsified (e.g., "< 20% adoption", "Users abandon after step 2").
10. **Out of Scope:** What this increment explicitly does NOT include to maintain focus.
11. **Open Questions:** Any remaining uncertainties that need resolution.

## Important: Separation of Concerns

**Use cases capture the WHAT, not the HOW:**
- **Use Cases** define what the user wants to accomplish and what success looks like
- **Technical Design Documents** (separate files) capture how to implement the solution
- **Architecture Decision Records (ADRs)** capture why specific technical choices were made

Keep use cases focused on user goals, behavior, and outcomes. Technical implementation details belong in separate technical design documents that reference the use case.

**Example structure:**
```
/tasks/
  usecase-record-and-transcribe.md    # WHAT: User goal and acceptance criteria
  design-recording-system.md           # HOW: Technical implementation approach
/docs/adr/
  001-web-speech-api.md                # WHY: Decision to use Web Speech API
```

## Target Audience

Assume the primary reader of the use case specification is a **product owner, designer, or developer** who needs to understand what the user wants to accomplish and how to verify success. Use cases should be understandable by both technical and non-technical stakeholders.

**Keep use cases user-focused:**
- Describe user actions and system responses
- Define clear acceptance criteria and success metrics
- Avoid implementation details (those go in technical design documents)
- Focus on observable behavior and outcomes

## Output

*   **Format:** Markdown (`.md`)
*   **Location:** `/tasks/`
*   **Filename:** `usecase-[feature-name].md`

## Final instructions

1. **Verify `CONSTITUTION.md` exists** before proceeding - if not, stop and ask user to create one first
2. **Read the constitution** to understand project values and constraints (informs what's in/out of scope)
3. **Do NOT include technical implementation details** - use cases capture WHAT, not HOW
4. **Keep use cases user-focused** - describe user goals, actions, and observable outcomes
5. Make sure to ask the user clarifying questions before writing
6. Take the user's answers to the clarifying questions and improve the use case specification
7. Keep the focus tight - one user goal, one assumption to test, one minimal increment
8. **Suggest creating a separate technical design document** if implementation details are needed (reference the constitution for technical decisions)
