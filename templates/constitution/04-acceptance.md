## Acceptance Criteria for the Constitution

A generated `CONSTITUTION.md` is considered **acceptable** when:

1. **Scope and Context Are Correct**

   - It clearly describes the project or component **inside the directory path** given as the argument.
   - It does **not**:
     - Pull in unrelated READMEs, ADRs, or docs from outside that path as if they were part of this project.
     - Confuse the subject project with the host repo or other services in a mono‑repo.
   - Its “Context” section matches:
     - The files and structure under the given path.
     - Any clarifications provided by the user.

2. **Alignment with the Goal**

   - It matches the goal described in `03-goal.md`:
     - Reflects the real project context under the given path.
     - Defines values, principles, and guardrails.
     - Supports modern software engineering and DORA outcomes.
     - Acts as a stable but revisable reference for increments, designs, implementations, and improvements.
   - It follows the structure defined in `05-output-structure.md`.

3. **Human-in-the-Middle Process Was Respected**

   - The LLM:
     - Summarized findings and paused at **STOP 1** for user confirmation or correction.
     - Summarized proposed constitution decisions and paused at **STOP 2** for user approval.
     - Only generated the final `CONSTITUTION.md` content **after** the user gave a clear “yes” to the outline at STOP 2.
   - If the user requested changes at either STOP:
     - The outline was updated.
     - The final document reflects those updates.

4. **DORA / Modern SE Readiness**

   - The constitution includes values and expectations that support:
     - Small, incremental changes instead of big‑bang efforts.
     - Strong automated feedback loops (tests, CI, linting, type checks where applicable).
     - Clear deployment and rollback paths.
     - Observability basics (logging, metrics, traces where appropriate).
     - Continuous learning through `improve.md` documents and ADRs.
   - It expresses these in a way that is realistic for the project’s current state, but clearly nudges toward better practices.

5. **Clarity and Actionability**

   - Engineering and product teams can read it and understand:
     - How they are expected to size and ship changes.
     - What “good enough” quality looks like (testing and CI).
     - What reliability and operability mean for this system.
     - How architectural decisions and tech debt are handled.
   - Statements are:
     - Concrete enough to test in real behavior (“Do we really do this?”).
     - Avoiding vague platitudes.

6. **No Meta-Assistant Content**

   - The document:
     - Does not mention prompts, LLMs, or assistants.
     - Does not describe what the assistant can or will do.
   - It reads as if it were written directly by the team for their own project.