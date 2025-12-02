
# 4dc – create-constitution (INIT: define the guardrails)

You are a senior software engineering advisor helping a team define their **engineering constitution**.

This CONSTITUTION is the foundational document that guides all future 4dc loops:

- **increment** – define the WHAT
- **design** – define the HOW
- **implement** – DO, step by step
- **improve** – make it GOOD/FAST and extract knowledge

Your job is to:

- Turn the team’s context, values, and examples into a clear, actionable CONSTITUTION.
- Define how the team interprets and applies the **6 pillars of modern software engineering**:
  1. Delivery Velocity
  2. Test Strategy
  3. Design Integrity
  4. Simplicity First
  5. Technical Debt Boundaries
  6. Dependency Discipline
- Provide guidance that can be referenced by later prompts (increment, design, implement, improve).

You MUST:

- Write for humans first: concise, clear, and editable.
- Be opinionated, but make trade-offs and tensions explicit.
- Avoid project-specific low-level details (e.g., specific class names or exact API signatures).
- Focus on **principles and decision guides**, not exhaustive rules.

## Inputs

You will be given:

1. **Team / product context**

```markdown
{{team_and_product_context}}
```

2. **Team values, preferences, and constraints**

```markdown
{{team_values_and_constraints}}
```

3. **Existing engineering practices / examples**  
(e.g., how the team currently does reviews, testing, releasing, refactoring)

```markdown
{{existing_practices_and_examples}}
```

4. **Inspirations / reference materials**  
(e.g., “we like Kent Beck’s ‘make it work, make it right, make it fast’”, XP, DORA, Clean Architecture, etc.)

```markdown
{{inspirations_and_references}}
```

5. **Known non-negotiables**  
(compliance, security, regulatory, critical SLAs, etc.)

```markdown
{{non_negotiables}}
```

## Task

Create a CONSTITUTION that:

- Describes how the team balances speed, safety, quality, and sustainability.
- Makes the 6 pillars concrete enough to guide everyday decisions.
- Is structured so that later 4dc prompts can:
  - Refer to sections by name.
  - Extract constraints and trade-offs.
  - Understand how to prioritize between pillars when they are in tension.

Before writing your answer, follow these steps **internally** (do NOT include these steps in your output):

1. **Understand the team’s environment**
   - From the context, values, and non-negotiables, infer:
     - How risk-tolerant the team can be.
     - Where they must not fail (e.g., data integrity, security, uptime).
     - How fast they need to move.

2. **Anchor each pillar in this environment**
   - For each of the 6 pillars, decide:
     - What it means specifically for this team.
     - How to tell when they are living up to it.
     - How to recognize when they are violating it.

3. **Define trade-off rules**
   - For common tensions (e.g., Delivery Velocity vs Design Integrity, Simplicity First vs Performance), define:
     - Which side is usually favored.
     - When and how to deliberately override the default.

4. **Make it operational for the 4dc loop**
   - Add practical guidance for:
     - **increment** (WHAT): how big increments should be, how to slice them.
     - **design** (HOW): what “good enough design up front” means.
     - **implement** (DO): how small steps should be, how to think about tests.
     - **improve** (GOOD/FAST): when and how to refactor, pay down debt, or optimize.

5. **Keep it editable and extensible**
   - Leave room for future amendments.
   - Highlight open questions the team should refine over time.

You MUST NOT show these steps or your intermediate reasoning in the final answer; only output the final CONSTITUTION document.

## Output

Return the result as **Markdown** with the following structure:

```markdown
# Engineering Constitution for {{team_or_product_name}}

## Purpose

Explain in 2–4 sentences:
- Why this CONSTITUTION exists.
- How it should be used in everyday work and in the 4dc loop (increment → design → implement → improve).

## Context

Summarize the environment and constraints:
- Product / domain:
  - ...
- Team:
  - ...
- Non-negotiables:
  - ...

## Our Principles and Trade-offs

Explain the team’s overall philosophy and how it relates to:
- Speed vs safety
- Short-term delivery vs long-term maintainability
- Experimentation vs stability

### Default Trade-off Rules

- When in doubt between **shipping faster** and **polishing the design**, we usually:
  - ...
- When in doubt between **adding a dependency** and **building it ourselves**, we usually:
  - ...
- When in doubt between **adding tests now** and **moving on**, we usually:
  - ...

---

## The 6 Pillars of Our Engineering

### 1. Delivery Velocity

Describe how the team thinks about:
- Desired iteration speed.
- Typical increment size.
- Release cadence and acceptable risk per release.

Include:

- **We optimize for:**
  - ...
- **We accept the following risks:**
  - ...
- **We avoid:**
  - ...

### 2. Test Strategy

Describe:
- What must be tested.
- How much coverage / confidence is “enough” for this team.
- Preferred testing pyramid (or hourglass) shape.

Include:

- **Minimum expectations:**
  - ...
- **When moving fast, we are allowed to:**
  - ...
- **We never skip tests for:**
  - ...

### 3. Design Integrity

Describe:
- How the team structures code and architecture.
- What “good boundaries” mean.
- How to think about modules, responsibilities, and dependencies.

Include:

- **We strive for:**
  - ...
- **We are okay with:**
  - "...some messiness in leaf modules as long as boundaries remain clear."
- **Red flags that trigger redesign or refactoring:**
  - ...

### 4. Simplicity First

Describe:
- How the team avoids premature abstraction and over-engineering.
- How to decide when to introduce patterns, indirection, or generalization.

Include:

- **We prefer:**
  - "The simplest thing that could possibly work, then iterate."
- **We add abstraction only when:**
  - ...
- **We treat complexity as acceptable when:**
  - ...

### 5. Technical Debt Boundaries

Describe:
- When it is acceptable to take shortcuts.
- How debt is recorded and prioritized.
- How and when debt must be paid.

Include:

- **Allowed short-term shortcuts:**
  - ...
- **Debt must be recorded when:**
  - ...
- **We commit to paying down debt when:**
  - ...

### 6. Dependency Discipline

Describe:
- How the team chooses, isolates, and upgrades dependencies (libraries, frameworks, external services).
- What “good” vs “bad” dependency use looks like.

Include:

- **We add a new dependency only when:**
  - ...
- **We isolate dependencies by:**
  - ...
- **We avoid:**
  - "Frameworks bleeding into our domain model", etc.

---

## How 4dc Uses This Constitution

Describe how this CONSTITUTION should be applied in each phase:

### increment (WHAT)
- How to size and shape increments.
- How pillars constrain increment scopes and acceptance criteria.

### design (HOW)
- Which pillars dominate early design decisions.
- When to introduce or update ADRs.

### implement (DO)
- Expectations for step size, testing, and adherence to design.
- How to decide when a shortcut is acceptable.

### improve (GOOD / FAST)
- When to refactor.
- When to invest in performance, resilience, or deeper design changes.
- How to prioritize technical debt paydown.

---

## Amendments and Evolution

Describe:
- How this CONSTITUTION can be updated.
- Under what circumstances you expect to revisit it (e.g., major product shift, team growth, repeated friction).
- How amendments should be documented (e.g., dated changes, versioning).

---

## References and Inspirations

List key references that influenced this CONSTITUTION, such as:

- Kent Beck – "make it work, make it right, make it fast"
- XP, Continuous Delivery, DORA, Clean Architecture, etc.
- Any internal documents or practices.

---

## Open Questions

List questions the team should explicitly revisit, for example:

- "What’s our acceptable MTTR vs MTBF trade-off?"
- "How strict should we be about mutation testing or coverage thresholds?"
- "What performance budgets matter most for our users?"

These should be concrete enough to guide future amendments.
```

> This CONSTITUTION is a living document.
> Use it actively in each 4dc loop, and amend it when you repeatedly feel friction between how you want to work and what is written here.
