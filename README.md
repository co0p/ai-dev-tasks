
<p align="center">
	<picture>
		<source srcset="assets/4dc-logo-traced-dark.svg" media="(prefers-color-scheme: dark)">
		<img src="assets/4dc-logo-traced.svg" alt="4DC logo" width="96" />
	</picture>
</p>

<p align="center"><em>4dc – Small, Safe Steps for Modern Software Teams</em></p>

# 

4dc is a set of **LLM-friendly prompts and templates** that help teams work in **small, safe steps**:

- Define **increments** (what to change and why) without leaking into implementation details.
- Turn increments into **technical designs** that respect your project’s constitution.
- Break designs into **XP-style implementation plans** (small, testable tasks).
- Periodically run **improve passes** across the codebase to capture lessons, refactors, and ADRs.

The prompts in this repo are **assembled** at the top level for easy distribution and consumption by tools like GitHub Copilot Chat. You don’t need to pull in the whole repo structure—just the prompts.

---

## Why this repo is useful

4dc is for teams who want the benefits of:

- **XP / small-batch delivery, with AI in the loop**
  - Increments stay as clean WHAT-only descriptions.
  - Design and Implement prompts keep “plan” and “tasks” separate.
  - Improve prompts look across the whole codebase, not just one story.

- **A living project constitution**
  - You describe your values, test expectations, and layout once in `CONSTITUTION.md`.
  - All other prompts (increment, design, implement, improve) read and respect it automatically.
  - Mode/rigor is configurable: a small example app can run “lighter” practices; a production system can choose deeper analysis and more guardrails.

- **Safer AI-assisted changes**
  - LLMs don’t jump straight to “edit all the things.”
  - Instead, they produce artifacts you can review, diff, and evolve:
    - `docs/increments/.../increment.md`
    - `design.md`
    - `implement.md`
    - `docs/improve/YYYY-MM-DD-improve.md`
  - The workflow nudges you toward small, testable steps and code review, rather than giant, opaque edits.

- **Codebase-wide learning**
  - Improve docs capture lessons, refactoring opportunities, and ADR candidates.
  - Each “Improvement” can become a future increment.
  - Over time, your constitution and patterns converge instead of drifting.

You can use 4dc:

- As a **prompt pack** for GitHub Copilot Chat or other LLMs.
- As a **playbook** for how your team wants to design, implement, and improve changes.

---

## Get started

This assumes:

- You already have a Git repo for your project.
- You want the 4dc prompt files (e.g. `increment.prompt.md`, `design.prompt.md`, `implement.prompt.md`, `improve.prompt.md`) under `.github/prompts/4dc` in your project.

From the root of **your** project, run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/co0p/4dc/main/scripts/install-4dc-prompts.sh)"
```

What this does:

- Downloads the installer script from this repo.
- Runs it in your current project directory.
- Copies the assembled 4dc prompt files into `.github/prompts/4dc/` in your project.

After running it, you’ll have something like:

- `.github/prompts/4dc/increment.prompt.md`
- `.github/prompts/4dc/design.prompt.md`
- `.github/prompts/4dc/implement.prompt.md`
- `.github/prompts/4dc/improve.prompt.md`

You can then point your LLM / Copilot Chat at those prompt files.

This assumes:

- You already have a Git repo for your project.
- You want 4dc prompts under `.github/prompts/4dc`.
- You’re okay running a small installer script from this repo.

From the root of **your** project, run:

```bash
bash -c 'set -euo pipefail
TMP_DIR="$(mktemp -d)"
REPO="https://github.com/co0p/4dc"
BRANCH="main"

echo ">> Downloading 4dc installer from $REPO@$BRANCH ..."
curl -fsSL "$REPO/raw/$BRANCH/scripts/install-4dc-prompts.sh" -o "$TMP_DIR/install-4dc-prompts.sh"
chmod +x "$TMP_DIR/install-4dc-prompts.sh"

echo ">> Running 4dc prompts installer into .github/prompts/4dc ..."
"$TMP_DIR/install-4dc-prompts.sh" .github/prompts/4dc

echo ">> Done. 4dc prompts are now in .github/prompts/4dc"
'
```

What this does:

- Downloads the `scripts/install-4dc-prompts.sh` helper from this repo.
- Runs it against your local project.
- The script copies the **assembled prompt files from the top of the 4dc repo** into `.github/prompts/4dc/` in your project.

After running it, you’ll have something like:

- `.github/prompts/4dc/increment/...`
- `.github/prompts/4dc/design/...`
- `.github/prompts/4dc/implement/...`
- `.github/prompts/4dc/improve/...`

(Exactly which files appear depends on how you structure the assembled prompts; adjust the script accordingly.)

---

## Next steps

### 1. Add a project constitution

Create a `CONSTITUTION.md` at the root of your project (or adapt from `examples/*/CONSTITUTION.md` here). In it, describe:

- **Values and principles**  
  - Example: small, safe steps; pragmatic DRY; refactoring as everyday work; testing & observability expectations.
- **Implementation & doc layout**  
  - Where increments, designs, implementations, and improve docs live (for example, `docs/increments/...`, `docs/improve/...`).
- **Modes / rigor (optional)**  
  - For example: lighter rules for demos/examples, deeper rules for production services.

All the 4dc prompts read and respect this constitution when they generate artifacts.

### 2. Run your first increment

Pick a small change you want to make.

Using your LLM / Copilot Chat, run the increment prompt from `.github/prompts/4dc/increment` with `path` pointing at where you want the increment folder to live. You should get:

- `docs/increments/<slug>/increment.md` – a **WHAT-only** document describing:
  - Context & goal.
  - Scope and non-goals.
  - Acceptance criteria & observability.

### 3. Design and implement

From inside the new increment folder:

- Run `/design` (or similar) with `path` pointing to that folder:
  - Produces `design.md` – a technical HOW, aligned with the constitution, but **not** a task list.
- Then run `/implement`:
  - Produces `implement.md` – an XP-style task list (small, testable steps) that implements the design.

You can then follow `implement.md` as a backlog of small tasks (commits/PRs), using TDD and your usual tooling.

### 4. Improve (periodic, codebase-wide)

Periodically (for example, after a few increments), run the Improve prompt with `path` pointing at your project root:

- Produces `docs/improve/YYYY-MM-DD-improve.md` with:
  - **Assessment** vs your constitution (star ratings per principle).
  - **Lessons** (worked well / to improve / emerging patterns).
  - **Improvements** (specific refactoring proposals; each can become a new increment).
  - ADR candidates for big architectural decisions (written separately via the ADR template).

This gives you a feedback loop from real code back into your constitution and future increments.

---

## Inspiration

4dc borrows heavily from:

- **Extreme Programming (XP)** – Kent Beck  
  - Small, safe steps; TDD; continuous refactoring; simple design.
- **Refactoring & design** – Martin Fowler, Michael Feathers, Sandi Metz, Robert C. Martin  
  - Clear names, small functions, separation of concerns, “make the change easy, then make the easy change.”
- **Domain-Driven Design (DDD)** – Eric Evans  
  - Ubiquitous language; aligning code structure with domain concepts.
- **DevOps & Delivery** – Jez Humble & David Farley, Michael Nygard, The Pragmatic Programmers  
  - Continuous delivery, fast feedback, operability, resilience, “wrap and pin” for dependencies.

These ideas show up explicitly in the **lenses** used by the Improve phase:

- **Naming & Clarity**
- **Modularity & Separation**
- **Architecture & Patterns**
- **Testing & Reliability**
- **Duplication & Simplicity**
- **Documentation & Communication**
- **Delivery & Flow**
- **Dependencies & Operability**

And they’re encoded into the **values and principles** you write in your `CONSTITUTION.md`:

- Small, safe steps over large, risky changes.
- Refactoring as everyday work, not a special event.
- Pragmatic DRY and simplicity (no speculative abstractions).
- Clear contracts, tests, and observability.
- Conscious dependency and operability choices.

4dc is an attempt to make those ideas concrete and accessible in a world where AI is part of the team: the prompts give the AI structure and guardrails, and your constitution keeps it aligned with how you want to build software.