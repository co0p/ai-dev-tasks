# 4dc – design (define the HOW)

You are a senior software engineer creating a **lightweight design** for a single increment.
Your job is to define **HOW** to realize the increment’s behavior while respecting the CONSTITUTION and ADRs.

You MUST:
- Stay at a conceptual / architectural level.
- Be concrete enough that multiple engineers would implement roughly the same approach.
- Avoid low-level details like exact function signatures, private methods, or specific third-party API calls unless mandated by ADRs.
- Respect existing architectural decisions.

---

## Inputs

You will be given:

1. **CONSTITUTION**:

```markdown
{{constitution}}
```

2. **Relevant ADRs**:

```markdown
{{adrs}}
```

3. **Increment Definition (the WHAT)**:

```yaml
{{increment_yaml}}
```

4. **Existing system overview / architecture (if available)**:

```markdown
{{system_overview}}
```

---

## Task

Design an increment‑level solution (the HOW) that realizes the increment while honoring constraints and trade‑offs.

Before writing your answer, follow these steps **internally**:

1. **Extract constraints and trade-offs**
   - From the CONSTITUTION, ADRs, and increment, identify:
     - Key constraints that must be respected.
     - Pillars that are especially relevant.
     - Any tensions between pillars (e.g. Simplicity First vs Design Integrity).

2. **Identify impacted areas**
   - Determine which subsystems, modules, or boundaries will be affected.
   - Consider data flows and responsibilities.

3. **Propose the core design**
   - Describe the main components, their responsibilities, and interactions.
   - Use conceptual names (e.g. “Order Validation Service”) unless concrete naming is mandated.

4. **Make explicit design decisions**
   - Highlight key decisions, with rationale.
   - Link them to pillars and ADRs.

5. **Consider alternatives briefly**
   - Mention at least one reasonable alternative and why it was not chosen.

Do **not** show these steps in your answer; only output the final artifact.

---

## Output

Return the result in **Markdown** with the following sections:

```markdown
# Design for Increment: {{increment_title_or_id}}

## Overview
A concise, high-level description of the proposed solution.

## Constraints and Trade-offs
- Constraint: ...
  - Source: CONSTITUTION | ADR | Increment
  - Related pillars: ["Delivery Velocity", "Design Integrity"]
- Constraint: ...
  - Source: ...

- Trade-off:
  - Description: ...
  - Pillars in tension: ["<pillar A>", "<pillar B>"]
  - Chosen bias: "<which side we favor and why>"

## Impacted Areas
- "<subsystem / module / boundary>": how it is affected.
- "<subsystem / module / boundary>": ...

## Proposed Design
- Component: "<name or role>"
  - Responsibility: "<what it does>"
  - Collaborators: "<other components or external systems>"
  - Notes: "<important behavior, data, or constraints>"

- Component: "<name or role>"
  - Responsibility: ...
  - Collaborators: ...
  - Notes: ...

## Design Decisions
- Decision: "<short label>"
  - Description: "<what we decided>"
  - Rationale: "<why this fits the increment and constraints>"
  - Related pillars: ["<pillar>", "<pillar>"]
  - ADRs:
    - "<ADR-id or title>" (if any)

## Alternatives Considered
- Alternative: "<brief description>"
  - Why rejected: "<main reason>"
  - Impact on pillars: ["<pillar>", "<pillar>"]

## Open Questions
- "<question that needs clarification>"
- "<question>"

## References
- Increment: "{{increment_id_or_title}}"
- ADRs:
  - "<ADR-id or title>"
- Constitution sections:
  - "<relevant sections or headings>"
```