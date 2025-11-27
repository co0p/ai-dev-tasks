# 4DC – 4 Document Cascade

A documentation system for clear, incremental, AI-assisted development, enabling robust, explicit architectural learning.  
**Everything starts with the constitution.**

---

## The Cycle: Increment, Design, Breakdown, Improve

The core workflow in 4DC is an explicit, repeatable learning loop:

1. **Start with the Constitution:**  
   Define foundational principles and technical constraints (`CONSTITUTION.md`). Every increment is built on this bedrock.

2. **Increment (WHAT):**  
   Describe the user-focused value to deliver. Summarize requirements and acceptance criteria in `[increment-name]/increment.md`.

3. **Design (HOW – Initial Sketch):**  
   Outline a technical approach (but don’t commit to details) in `[increment-name]/design.md`.

4. **Breakdown (HOW – Detailed):**  
   Break the solution into small, verifiable steps in `[increment-name]/tasks.md`.

5. **Implement & Improve:**  
   Complete each task, check off progress, and refactor after acceptance. During improvement, codify recurring patterns as Architecture Decision Records.

---

## Architectural Wisdom: ADRs

As you refactor and improve, record recurring patterns and tradeoffs as **Architecture Decision Records** (ADRs):

- **When?**  
  - A pattern appears across increments  
  - Project-wide implications  
  - New convention or trade-off
- **Where?**  
  - `design/[adr-number]-[topic].md`
- **Format:**  
  - Context, Decision, Consequences, Alternatives

Future increments reference both the constitution and accumulated ADRs.

---

## Example Directory

See real workflows in [`examples/`](examples/):

- **Todo App** (`examples/todo/`): Minimal browser-based todo with zero build steps.
- **EpicSum** (`examples/epicsum/`): Summing ticket hours using portable shell scripting.

Each example demonstrates the full documentation cycle, from constitution through implementation.

---

## Using Prompts in Visual Studio Code

4DC is designed for seamless AI-assistance via prompt files:

1. **Find prompt files** in the root or `.github/prompts/` directory (e.g. `create-constitution.prompt.md`, `increment.prompt.md`, etc).
2. **Invoke workflows** by referencing prompt files in Copilot Chat:
   ```
   @workspace /create-constitution
   @workspace /increment add todo item
   @workspace /design
   @workspace /breakdown
   @workspace /improve
   ```

3. **Integration tip:** For repository-wide discoverability, copy prompt files to `.github/prompts/` and reference as:
   ```
   #file:.github/prompts/create-feature.md
   ```

**For more see:**  
- [`prompts/README.md`](prompts/README.md)
- [VS Code Copilot Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

---

## References & Inspirations

Ideas in 4DC are based on or inspired by:

- **Kent Beck** – "Make it work, make it good, make it fast"
- **Martin Fowler** – Documentation and ADR discipline
- **Mary & Tom Poppendieck** – Lean Software principles
- **Robert C. Martin (Uncle Bob)** – Separation of concerns, clean code