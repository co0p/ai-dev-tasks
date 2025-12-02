---
name: generate-increment-prompt
argument-hint: none
---

# Prompt: Generate Self-Contained increment.prompt.md

You are tasked with generating a fully self-contained `increment.prompt.md` file for the 4DC project. Use the contents of all files in the `/templates/increment` folder (including `frontmatter.md`, `persona.md`, `goal.md`, `process.md`, `interaction.md`, `output.md`, `style.md`, `glossary.md`, `acceptance.md`, `examples.md`, `schema-hints.md`) as source material.

- Only merge content from the specified template files. Do not add extra summary or instructional lines unless they are present in the templates.
- Do not append commentary like "This file is now ready to use..." unless it is explicitly included in the template files.
- The frontmatter (YAML block) from `frontmatter.md` must be placed at the very top of the generated file, before any other content.
- Merge sections in this order for clarity and consistency:
	1) `persona.md`
	2) `goal.md` (immediately after Persona)
	3) `process.md` (include its "Structured JSON Outputs" immediately after Process)
	4) `interaction.md`
	5) `output.md` (place before Style)
	6) `style.md`
	7) `glossary.md`
	8) `acceptance.md`
	9) `examples.md`
	10) `schema-hints.md` (internal-only reference)
- Do not reference or link to any external files or folders in the output.
- The resulting prompt must include the persona, goal, process, interaction style, output format, writing style, glossary, acceptance checklist, examples library, and JSON schema hints directly in the file.
- Ensure the process and interaction sections reflect human-first interaction and that any JSON visibility is explicitly internal-only.
 - Place the "Structured JSON Outputs" section immediately after the Process section.
- Ensure clarity, completeness, and maintainability.
- The output should be ready to use as a standalone prompt for generating a project increment.

# Output
A single, self-contained `increment.prompt.md` file containing all necessary instructions, context, and templates for increment generation.