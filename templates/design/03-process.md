## Process

Follow this process to produce a `design.md` that is aligned with the constitution and the current increment.

1. **Gather Context**

   - Read and internalize:
     - `CONSTITUTION.md` — values, principles, guardrails, delivery expectations.
     - The current `increment.md` — context, goal, tasks (WHAT), risks, success criteria.
   - Optionally review:
     - Relevant ADRs.
     - Existing `design.md` documents for related areas.
     - Recent `improve.md` documents that mention this part of the system.

2. **Restate Problem and Scope (Briefly)**

   - In a few sentences, restate:
     - What problem this design is solving.
     - The outcome the increment targets.
     - The scope and non-goals from `increment.md`.

3. **Identify Involved Components and Boundaries**

   - Determine which:
     - Modules, packages, services, or layers are impacted.
     - External systems (datastores, queues, APIs) are involved.
   - Note any existing boundaries that must be respected (from the constitution).

4. **Propose a Technical Approach**

   - Describe:
     - How responsibilities will be distributed across components.
     - Any new components or changes to existing ones.
     - The main data flows (inputs, outputs, key transformations).
   - Keep the approach:
     - As simple as possible.
     - Constrained to the increment’s scope.

5. **Define Contracts & Interfaces**

   - Specify:
     - New or changed APIs, function signatures, events, or schemas.
   - Clarify:
     - What remains stable.
     - How backward compatibility will be preserved where necessary.

6. **Plan the Safety Net (Testing)**

   - Enumerate:
     - Which **unit tests** are needed (per component).
     - Which **integration / end-to-end tests** are needed (per flow or contract).
   - Include:
     - Any regression tests required for known bugs.
     - Any special test data/fixtures.

7. **Consider CI/CD and Rollout**

   - Note:
     - Whether existing pipelines are sufficient or need updates.
     - Any required configuration or environment changes.
   - Describe:
     - How this change can be rolled out safely:
       - Feature flags?
       - Gradual rollout?
       - Internal dogfooding first?
     - How it can be rolled back:
       - Reverting code.
       - Toggling configuration.

8. **Specify Observability**

   - Define:
     - Logs needed (what to log and with what context).
     - Metrics (counters, histograms, gauges) that reflect:
       - Usage.
       - Performance.
       - Errors and unusual conditions.
   - Mention:
     - Any alerts or dashboards that should be created or updated.

9. **Summarize Risks, Trade-offs, and Follow-ups**

   - List:
     - Known risks (technical and operational).
     - Trade-offs made (e.g. speed vs. flexibility).
   - Suggest:
     - Potential follow-up increments:
       - Deeper refactors, optimizations.
       - Additional features discovered during design.

10. **Produce the Final `design.md`**

   - Follow the structure defined in the merged output/examples file.
   - Keep the document:
     - Clear, concise, and specific.
     - Traceable back to the increment and constitution.