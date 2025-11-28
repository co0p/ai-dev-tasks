---
name: generate-increment-prompt
argument-hint: none
---

# Prompt: Generate Self-Contained increment.prompt.md

You are tasked with generating a fully self-contained `increment.prompt.md` file for the 4DC project. Use the contents of all files in the `/templates/increment` folder (including frontmatter.md, persona.md, process.md, interaction.md, output.md, pillars.md) as source material.

- Only merge content from the specified template files. Do not add extra summary or instructional lines unless they are present in the templates.
- Do not append commentary like "This file is now ready to use..." unless it is explicitly included in the template files.
- The frontmatter (YAML block) from `frontmatter.md` must be placed at the very top of the generated file, before any other content.
- Immediately after the frontmatter, merge all relevant details from persona.md, process.md, interaction.md, output.md, and pillars.md.
- Do not reference or link to any external files or folders in the output.
- The resulting prompt must include the persona, process, pillars, and output format directly in the file.
- Ensure clarity, completeness, and maintainability.
- The output should be ready to use as a standalone prompt for generating a project increment.

# Output
A single, self-contained `increment.prompt.md` file containing all necessary instructions, context, and templates for increment generation.