---
name: generate-design-prompt
argument-hint: none
---


# Prompt: Generate Self-Contained design.prompt.md



You are tasked with generating a fully self-contained `design.prompt.md` file for the 4DC project. Use the contents of all files in the `/templates/design` folder (including `frontmatter.md`, `persona.md`, `goal.md`, `process.md`, `interaction.md`, `output.md`, `style.md`, `glossary.md`, `acceptance.md`, `examples.md`, `schema-hints.md`) as source material.

- Only merge content from the specified template files. Do not add extra summary or instructional lines unless they are present in the templates.
- Do not append commentary like "This file is now ready to use..." unless it is explicitly included in the template files.
- The frontmatter (YAML block) from `frontmatter.md` must be placed at the very top of the generated file, before any other content.
- Merge sections in this order for clarity and consistency:
	1) `persona.md`
	2) `goal.md` (immediately after Persona)
	3) `process.md` (include any "Structured JSON Outputs" immediately after Process; visibility is internal-only)
	4) `interaction.md`
	5) `output.md`
	6) `style.md`
	7) `glossary.md`
	8) `acceptance.md`
	9) `examples.md`
	10) `schema-hints.md` (internal-only reference)
- Do not reference or link to any external files or folders in the output.
- The resulting prompt must include the persona, goal, process, interaction style, output format, writing style, glossary, validation checklist, examples library, and JSON schema hints directly in the file.
- Ensure clarity, completeness, and maintainability.
- The output should be ready to use as a standalone prompt for generating a technical design for an increment.

# Output
A single, self-contained `design.prompt.md` file containing all necessary instructions, context, and templates for design generation. The file should be created at the top level of the repository (e.g., `/design.prompt.md`).