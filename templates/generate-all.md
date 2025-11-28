---
name: generate-all
argument-hint: none
---

# Prompt: Generate All Self-Contained Prompts

You are tasked with generating all self-contained prompt files for the 4DC project, one after another, without interruption. For each prompt:

- Read and follow the instructions in the corresponding generate.md file.
- Merge only the content from the specified template files (frontmatter, persona, process, interaction, output, etc.), with no extra commentary unless present in the templates.
- Write the resulting self-contained prompt file at the top level of the repository (e.g., `/create-constitution.prompt.md`, `/design.prompt.md`, `/implement.prompt.md`, `/increment.prompt.md`, `/improve.prompt.md`).
- After each prompt is generated and saved, inform the user of progress and confirm success before moving to the next.

## Prompts to Generate
- `/templates/constitution/generate.md`
- `/templates/design/generate.md`
- `/templates/implement/generate.md`
- `/templates/increment/generate.md`
- `/templates/improve/generate.md`

# Output
A set of self-contained prompt files, each written to the top level of the repository and ready for use. Progress and completion messages for each prompt must be provided to the user.

