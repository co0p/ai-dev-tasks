# 4dc Prompt Authoring Guide (Flat Rules)

Use this file as a checklist when **authoring or editing prompts and templates** for 4dc.

Each rule describes how prompts should be structured so that runtime LLMs behave consistently.  
Prompts themselves MUST be **self-contained** (no dependency on this file at runtime).

---

1. **Each prompt must define a clear target scope.**  
   - Prompts MUST take an explicit argument that identifies the subject project or component (e.g. a directory path).
   - The instructions MUST say that this scope is the **subject** of the prompt.

2. **Prompts must constrain the LLM to that scope when reading files.**  
   - Instructions MUST tell the LLM to:
     - Read only files and directories **inside** the given path.
     - NOT rely on content from parent directories, sibling projects, or other repositories as primary context.
   - Surrounding repo content (frameworks, vendor dirs, examples) MAY be mentioned only as background, never as the subject.

3. **Prompts must be self-contained.**  
   - A generated `.prompt.md` MUST contain **all information the LLM needs at runtime**.
   - It MUST NOT:
     - Reference `RULES.md`.
     - Assume knowledge of other prompts.
     - Tell the LLM to “see another file” for essential rules.

4. **No cross-prompt references for behavior.**  
   - Prompts MUST NOT say:
     - “Follow the same rules as the design prompt.”
     - “See the constitution prompt for STOP behavior.”
   - If shared behavior is needed (e.g., STOP gates, scoping), it MUST be restated briefly in each prompt that needs it.

5. **Every main-phase prompt must include a human-in-the-loop flow.**  
   - Constitution, Increment, Design, Implement, and Improve prompts MUST:
     - Include at least two explicit STOP points.
     - STOP 1: After summarizing findings/context.
     - STOP 2: After summarizing proposed decisions/plan or outline.
   - The LLM MUST be instructed to:
     - Wait for user feedback at STOP 1.
     - Wait for explicit “yes” at STOP 2 before writing final artifacts.

6. **Prompts must tell the LLM to write artifacts only after explicit confirmation.**  
   - Instructions MUST say:
     - Do NOT write or overwrite the target artifact before STOP 2 approval.
     - Only generate the final document after an explicit “yes / go ahead / looks good”.
   - If the user says “no” or asks for changes:
     - The LLM must update the outline and re-ask for confirmation.

7. **Final artifacts must not mention prompts or assistants.**  
   - Prompts MUST instruct the LLM that:
     - Output artifacts (e.g. `CONSTITUTION.md`, `increment.md`, `design.md`) MUST NOT:
       - Mention prompts, LLMs, or assistants.
       - Contain meta-comments about how they were generated.
   - Artifacts must read as if written directly by the team.

8. **Final artifacts must follow a clear, fixed structure.**  
   - Each prompt MUST define a specific output structure (headings/sections or a schema).
   - Instructions MUST tell the LLM to:
     - Produce all required sections.
     - Not add unrelated top-level sections.
   - Optional extensions must be explicitly allowed if needed.

9. **Prompts may define acceptance criteria for the artifact.**  
   - It is recommended to include an “Acceptance” section in templates that says:
     - When an artifact is considered “good enough”.
     - What must be true for scope, alignment with goals, and clarity.
   - Acceptance criteria MUST be written in terms of the **artifact**, not the assistant.

10. **Prompts must describe persona and style briefly and concretely.**  
    - Each prompt SHOULD define:
      - A clear persona (e.g. Principal Engineer, Product Manager).
      - A concise style (direct, outcome-oriented, no fluff).
    - Persona/style text SHOULD be short and specific, not pages of prose.

11. **Prompts should separate goal (WHAT) from task/process (HOW).**  
    - Each main-phase template SHOULD:
      - Have a section that explains the **Goal** (what artifact we want and why).
      - Have a section that explains the **Task/Process** (how the LLM should behave step-by-step).
    - The Goal SHOULD be understandable without reading the Task; the Task SHOULD operationalize the Goal.

12. **Prompts should require focused, minimal clarifying questions.**  
    - Instructions SHOULD tell the LLM to:
      - Ask **targeted** clarifying questions only when critical information is missing or ambiguous.
      - Avoid long generic questionnaires.
    - Questions SHOULD mostly appear between STOP 1 and STOP 2.

13. **Prompts must keep the focus on the subject project, not the framework.**  
    - Instructions MUST emphasize:
      - The subject is the project/component under the given path.
      - The hosting repo, 4dc itself, or other tooling is NOT the subject unless explicitly part of the domain.
    - Any mention of frameworks or 4dc should be minimal and only when relevant to the project’s architecture.

14. **Prompts should be concise and opinionated, not verbose and vague.**  
    - Templates SHOULD:
      - Prefer concise, concrete rules over long, generic explanations.
      - State clear defaults and recommended practices.
    - Avoid:
      - “It depends” without guidance.
      - Huge walls of text for persona or style.

15. **Prompts must not ask the LLM to perform file I/O beyond what the host can handle.**  
    - If the environment supports file writes:
      - Prompts MUST still respect STOP 2 before writing.
    - If the environment is read-only:
      - Prompts must talk about generating content, not actually writing files.

---

When you (the human author) or a meta-assistant edits templates:

- Use this flat list as a **checklist**.
- Ensure each `.prompt.md`:
  - Has clear scoping instructions in its Inputs section (Rules 1–2).
  - Is self-contained and stop-gated (Rules 3–7).
  - Defines structure, persona, and goal/process cleanly (Rules 8–11).
  - Encourages focused clarifications and subject focus (Rules 12–14).