const form = document.querySelector("#projectForm");
const outputText = document.querySelector("#outputText");
const copyButton = document.querySelector("#copyButton");
const resetButton = document.querySelector("#resetButton");
const filePath = document.querySelector("#filePath");
const tabs = Array.from(document.querySelectorAll(".tab"));

let activeDoc = "agents";

const defaults = {
  projectName: "MaintainerBuddy",
  purpose:
    "幫開源維護者把 issue、PR、release 工作整理成可交給 AI coding agent 的任務。",
  stack: "Static HTML/CSS/JavaScript",
  stage: "Prototype",
  rules:
    "先讀 README 和現有檔案再修改\n保持變更小而聚焦\n不要重寫使用者沒有要求的部分\n新增功能時同步更新文件\n修改 UI 後檢查桌機和手機畫面\n能寫測試就補上最小測試",
  verifyCommand: "open index.html and test the generator manually",
};

const docMeta = {
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

function buildSharedBody(state, title) {
  return `# ${title}

Project: ${state.projectName}
Stage: ${state.stage}
Stack: ${state.stack}

## What this project does

${state.purpose}

## Agent rules

${bulletList(state.rules)}

## Workflow

${numberedList([
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
- Prefer plain Markdown, HTML, CSS, and JavaScript for this project.`;
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
  return `I built a tiny free tool for people using AI coding agents.

Most repos give agents no context, so every prompt starts from zero.

${state.projectName} generates:
- AGENTS.md
- Cursor project rules
- GitHub Copilot instructions
- CLAUDE.md

Goal: give your repo a clear instruction layer in under 30 seconds.

No login. No backend. Just open the page and copy the files.

Looking for feedback from people using Codex, Cursor, Claude Code, Copilot, Cline, Roo, or Aider.`;
}

function buildDocs(state) {
  return {
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
    : state.selectedDocs[0] || "agents";

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

  activeDoc = "agents";
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
  copyButton.textContent = "已複製";
  window.setTimeout(() => {
    copyButton.textContent = "複製";
  }, 1000);
});

resetButton.addEventListener("click", resetForm);

render();
