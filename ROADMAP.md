# Roadmap

This roadmap focuses on making AI Agent Rules Generator useful for real maintainers, not just a demo.

The core direction is now source-of-truth first: maintain one editable context file, then regenerate downstream agent files from it.

## v0.1

- Static generator for common agent instruction files
- `AGENT_CONTEXT.md` as the first source-of-truth output
- Live GitHub Pages demo
- Starter documentation for contributors
- Example rules for common project types

## v0.2

- Add a paste-back mode: paste `AGENT_CONTEXT.md`, then regenerate downstream files
- Export all generated files as a ZIP
- Add copy buttons for each generated file
- Add templates for React, Python CLI, Node.js CLI, and documentation projects
- Add better launch copy variants for maintainers sharing their projects
- Add clearer regenerate-from-source copy in every downstream file

## v0.3

- Add a README paste box that generates `AGENT_CONTEXT.md` from existing project context
- Regenerate downstream files from `AGENT_CONTEXT.md`
- Add optional OpenAI API-powered repo summaries
- Add issue triage and PR review checklist templates

## v1.0

- Support common AI coding agent workflows across Codex, Cursor, Claude Code, Copilot, Cline, Roo, and Aider
- Publish a small gallery of real-world AGENTS.md examples
- Keep the project free, static-first, and easy to fork
