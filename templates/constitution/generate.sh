#!/usr/bin/env bash
set -euo pipefail

# Simple helper to assemble the constitution prompt from template fragments.
# Usage (from repo root):
#   ./templates/constitution/generate.sh > create-constitution.prompt.md
#
# Or:
#   ./templates/constitution/generate.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TEMPLATES_DIR="${ROOT_DIR}/templates/constitution"
OUT_FILE="${ROOT_DIR}/create-constitution.prompt.md"

# If you want to write to stdout instead of a file, set WRITE_TO_STDOUT=1
WRITE_TO_STDOUT="${WRITE_TO_STDOUT:-0}"

generate() {
  cat "${TEMPLATES_DIR}/00-header.md"
  echo
  cat "${TEMPLATES_DIR}/01-persona.md"
  echo
  cat "${TEMPLATES_DIR}/02-inputs.md"
  echo
  cat "${TEMPLATES_DIR}/03-goal.md"
  echo
  cat "${TEMPLATES_DIR}/04-task.md"
  echo
  cat "${TEMPLATES_DIR}/05-output-structure.md"
  echo
  cat "${TEMPLATES_DIR}/06-footer.md"
}

if [ "$WRITE_TO_STDOUT" = "1" ]; then
  generate
else
  generate > "$OUT_FILE"
  echo "Wrote constitution prompt to: $OUT_FILE"
fi