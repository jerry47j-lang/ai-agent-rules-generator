# AI Agent Rules Generator

Generate and regenerate repo instruction files for AI coding agents from one source of truth.

Live demo: https://jerry47j-lang.github.io/ai-agent-rules-generator/

## Why this project is timely

AI coding agents are becoming a normal part of software work, but most repositories still do not give agents clear project context. This tool now starts with `AGENT_CONTEXT.md` as the source of truth, then derives the files agents and IDE assistants look for:

- `AGENT_CONTEXT.md`
- `AGENTS.md`
- `.cursor/rules/project-rules.mdc`
- `.github/copilot-instructions.md`
- `CLAUDE.md`
- `launch-post.md`

## Product direction

The first version generated starter files. The next direction is sharper: humans maintain one source-of-truth file, and downstream agent files are regenerated when the repo changes.

This is meant to reduce drift. A hand-maintained agent doc can fall behind the code. A derived agent doc can be regenerated from the current source context.

## What it helps with

- Giving coding agents consistent repo context
- Reducing repeated setup prompts for maintainers
- Keeping generated agent files aligned with one editable source of truth
- Creating starter rules for PR review, issue triage, and release workflows
- Helping new OSS projects document how AI agents should work in the codebase

## Run locally

Open `index.html` in a browser.

No build step, backend, account, or API key is required.

## Suggested GitHub repo description

Generate AGENT_CONTEXT.md, AGENTS.md, Cursor rules, Copilot instructions, and CLAUDE.md for AI coding agents.

## Launch angle

Most people ask AI agents better prompts. This project helps repos maintain better context.

## Roadmap

- Export all generated files as a ZIP
- Add more project templates for React, Python, Node.js, and docs repos
- Add a README-to-AGENT_CONTEXT.md generator
- Add a regenerate-from-source workflow for downstream files
- Add optional OpenAI API-powered repo summary
- Add examples from real maintainer workflows

See `ROADMAP.md` for the active plan.

## Contributing

Feedback, examples, and small pull requests are welcome. See `CONTRIBUTING.md`.

## Examples

See `EXAMPLES.md` for sample agent rules for different project types.

## License

MIT
