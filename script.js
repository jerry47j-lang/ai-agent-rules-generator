const form = document.querySelector("#projectForm");
const outputText = document.querySelector("#outputText");
const copyButton = document.querySelector("#copyButton");
const resetButton = document.querySelector("#resetButton");
const filePath = document.querySelector("#filePath");
const tabs = Array.from(document.querySelectorAll(".tab"));

let activeDoc = "source";

const defaults = {
  projectName: "MaintainerBuddy",
  purpose:
    "A small tool that keeps AI coding agents aligned with the repository context.",
  stack: "Static HTML/CSS/JavaScript",
  stage: "Prototype",
  sourceTruth:
    "Architecture lives in plain HTML, CSS, and JavaScript.\nThe app must stay static and easy to fork.\nGenerated agent files should not be hand-maintained.\nHumans edit this source context, then regenerate downstream files.\nKeep instructions short enough for agents to actually follow.",
  rules:
    "Inspect nearby files before editing\nKeep changes small and focused\nDo not rewrite unrelated user work\nUpdate docs when behavior changes\nCheck desktop and mobile layout after UI changes",
  verifyCommand: "open index.html and test the generator manually",
};

const docMeta = {
  source: "AGENT_CONTEXT.md",
  agents: "AGENTS.md",
  cursor: ".cursor/rules/project-rules.mdc",
  copilot: ".github/copilot-instructions.md",
  claude: "CLAUDE.md",
  launch: "launch-post.md",
};

function lines(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getState() {
  const data = new FormData(form);

  return {
    projectName: data.get("projectName").trim() || defaults.projectName,
    purpose: data.get("purpose").trim() || defaults.purpose,
    stack: data.get("stack"),
    stage: data.get("stage"),
    sourceTruth: lines(data.get("sourceTruth") || defaults.sourceTruth),
    rules: lines(data.get("rules") || defaults.rules),
    verifyCommand:
      data.get("verifyCommand").trim() || defaults.verifyCommand,
    selectedDocs: data.getAll("docType"),
  };
}

function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function numberedList(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function generatedNotice(state) {
  return `> Generated from AGENT_CONTEXT.md for ${state.projectName}. Do not hand-maintain this file. Regenerate it when the source context changes.`;
}

function buildSource(state) {
  return `# AGENT_CONTEXT.md

Project: ${state.projectName}
Stage: ${state.stage}
Stack: ${state.stack}

## Purpose

${state.purpose}

## Source of truth

${bulletList(state.sourceTruth)}

## Agent rules

${bulletList(state.rules)}

## Regeneration model

${numberedList([
    "Humans edit this file when architecture, commands, boundaries, or maintainer preferences change.",
    "Downstream agent files are regenerated from this source.",
    "Generated files should stay boring, consistent, and disposable.",
    "If a generated file drifts from the repo, fix the source of truth first.",
  ])}

## Verification

\`${state.verifyCommand}\``;
}

function buildSharedBody(state, title) {
  return `${generatedNotice(state)}

# ${title}

Project: ${state.projectName}
Stage: ${state.stage}
Stack: ${state.stack}

## What this project does

${state.purpose}

## Derived repo context

${bulletList(state.sourceTruth)}

## Agent rules

${bulletList(state.rules)}

## Workflow

${numberedList([
    "Read AGENT_CONTEXT.md first.",
    "Understand the request and inspect nearby files before editing.",
    "Make the smallest useful change.",
    "Run the verification command when possible.",
    "Report changed files and any checks that could not be run.",
  ])}

## Verification

\`${state.verifyCommand}\``;
}

function buildAgents(state) {
  return `${buildSharedBody(state, "Repository instructions for AI coding agents")}

## Boundaries

- Do not introduce new frameworks unless the task clearly needs them.
- Do not remove existing user content without being asked.
- Keep generated copy beginner-friendly and easy to paste.
- Prefer updating AGENT_CONTEXT.md over editing this file directly.`;
}

function buildCursor(state) {
  return `---
description: Project rules for ${state.projectName}
globs:
  - "**/*"
alwaysApply: true
---

${buildSharedBody(state, "Cursor project rule")}

## Cursor behavior

- Prefer direct edits over long explanations.
- Keep UI text short and concrete.
- When touching frontend files, check responsive layout and text overflow.`;
}

function buildCopilot(state) {
  return `${buildSharedBody(state, "GitHub Copilot repository instructions")}

## Pull request review preferences

- Flag broad rewrites that are not required.
- Ask for tests or manual verification when behavior changes.
- Prefer actionable review comments with file-specific suggestions.
- Keep explanations concise enough for beginner maintainers.`;
}

function buildClaude(state) {
  return `${buildSharedBody(state, "Claude Code project memory")}

## Collaboration style

- Start with the most useful next action.
- If a task is ambiguous, make a reasonable assumption and state it.
- Keep generated documentation practical, not theoretical.
- Avoid changing unrelated files.`;
}

function buildLaunchPost(state) {
  return `I am turning ${state.projectName} from a one-time generator into a source-of-truth workflow.

The idea:
humans maintain AGENT_CONTEXT.md,
then AGENTS.md / Cursor rules / Copilot instructions / CLAUDE.md regenerate from it.

Less hand-maintained drift. More boring consistency.

Looking for feedback from people using Codex, Cursor, Claude Code, Cline, Roo, or Aider.`;
}

function buildDocs(state) {
  return {
    source: buildSource(state),
    agents: buildAgents(state),
    cursor: buildCursor(state),
    copilot: buildCopilot(state),
    claude: buildClaude(state),
    launch: buildLaunchPost(state),
  };
}

function render() {
  const state = getState();
  const docs = buildDocs(state);
  const firstSelectedDoc = state.selectedDocs.includes(activeDoc)
    ? activeDoc
    : state.selectedDocs[0] || "source";

  activeDoc = firstSelectedDoc;
  tabs.forEach((tab) => {
    const doc = tab.dataset.doc;
    tab.hidden = !state.selectedDocs.includes(doc);
    tab.classList.toggle("is-active", doc === activeDoc);
  });

  filePath.textContent = docMeta[activeDoc];
  outputText.textContent = docs[activeDoc];
}

function resetForm() {
  Object.entries(defaults).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });

  form.querySelectorAll('input[name="docType"]').forEach((field) => {
    field.checked = true;
  });

  activeDoc = "source";
  render();
}

form.addEventListener("input", render);
form.addEventListener("change", render);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeDoc = tab.dataset.doc;
    render();
  });
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(outputText.textContent);
  copyButton.textContent = "Copied";
  window.setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 1000);
});

resetButton.addEventListener("click", resetForm);

render();
