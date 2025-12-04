## Tasks

Describe the **work items at the “WHAT” level**, not the technical “HOW”.

Tasks should express **what needs to be true for this increment to be considered complete**, in terms that are clear to product, engineering, QA, and stakeholders.

The LLM MUST:

1. **Express Tasks as Outcome-Oriented Work Items**

   - Each task should describe **what must change or exist** from a product/user/business point of view, for example:
     - “The login screen offers a ‘Forgot password?’ entry point.”
     - “Usage of the export feature is visible in analytics with basic volume metrics.”
     - “Support has a documented way to explain the new behavior to customers.”

   - Avoid:
     - Low-level implementation details (e.g. database tables, functions, framework choices).
     - Step-by-step instructions or technical plans (these belong in design/implement).

2. **Use a Simple, Consistent Structure**

   Each task SHOULD include:

   - **Task**: A short, action-oriented description of what will be true or available.
   - **User/Stakeholder Impact**: Whose experience or workflow is affected and how.
   - **Acceptance Clues**: How we might recognize that the task is “done” (from the WHAT perspective – e.g. behavior visible, outcome demonstrable – without prescribing tests or code).

   Example format:

   ```markdown
   - Task: Short, outcome-level description
     - User/Stakeholder Impact:
     - Acceptance Clues:
   ```

3. **Keep Tasks Independent and Small (at the WHAT level)**

   - Prefer more, smaller tasks rather than one huge catch-all.
   - Each task should:
     - Represent a **distinct observable aspect of the increment**.
     - Be small enough that it can be confidently delivered within this increment.

4. **Cover Non-Feature Outcomes Where Relevant**

   In addition to user-facing behavior, tasks MAY include:

   - **Discoverability & Communication**
     - What needs to be discoverable in UI, docs, or help.
     - What internal stakeholders (support, sales, ops) need to understand.

   - **Evidence & Learning**
     - What must be observable so that we can later tell if the increment helped (e.g. “We can see basic usage numbers for X”).
     - Any product-level follow-up checks (e.g. “Review metrics after N days to confirm adoption”).

   These tasks MUST still describe **WHAT** should be true, not HOW to instrument or implement it.

5. **Defer Implementation Planning**

   - Do **not**:
     - Describe code changes.
     - Specify test frameworks or CI details.
     - Propose PR groupings or technical rollout mechanisms.
   - Those belong in:
     - `design.md` (technical HOW, guardrails, test and deployment strategy).
     - `implement.md` (detailed steps, sequencing, and execution plan).

The end result should be a **product-level checklist** of outcomes that, when all true, mean this increment’s goal has been achieved.