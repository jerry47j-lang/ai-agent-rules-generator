# Repository Instructions for AI Coding Agents

Project: AI Agent Rules Generator

## What this project does

This is a static web app that generates repo instruction files for AI coding agents, including `AGENTS.md`, Cursor rules, GitHub Copilot instructions, and `CLAUDE.md`.

## Agent rules

- Read `README.md`, `ROADMAP.md`, and nearby files before editing.
- Keep changes small, focused, and easy for a beginner maintainer to review.
- Do not introduce a framework unless the task clearly requires it.
- Keep the app usable as a static site with no backend or build step.
- When editing UI, check that text fits on desktop and mobile widths.
- When changing generated output, update examples or documentation if needed.
- Prefer clear, practical copy over abstract explanations.

## Verification

Open `index.html` in a browser and verify:

- The default output renders.
- Tabs switch between generated files.
- Editing fields updates output immediately.
- The layout does not overflow on mobile.

## Useful files

- `index.html`: app structure
- `styles.css`: responsive layout and visual design
- `script.js`: document generation logic
- `README.md`: project overview
- `ROADMAP.md`: planned work
- `EXAMPLES.md`: sample outputs and use cases
