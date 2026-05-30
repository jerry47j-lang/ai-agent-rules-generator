# Examples

These examples show the kind of repo context this project helps generate.

## Source-of-truth model

Use `AGENT_CONTEXT.md` as the file humans edit. Downstream files like `AGENTS.md`, Cursor rules, Copilot instructions, and `CLAUDE.md` should be regenerated from that context.

```md
# AGENT_CONTEXT.md

- Architecture lives in plain HTML, CSS, and JavaScript.
- The app must stay static and easy to fork.
- Generated agent files should not be hand-maintained.
- Humans edit this source context, then regenerate downstream files.
```

## Static Site

Use this when a project is plain HTML, CSS, and JavaScript.

```md
# Repository Instructions

- Keep the site static and dependency-free.
- Check layout on desktop and mobile after UI changes.
- Keep copy short and useful.
- Do not add a build step unless asked.
```

## React App

Use this when a project has components, state, and a build step.

```md
# Repository Instructions

- Follow existing component patterns.
- Keep state close to where it is used.
- Update tests when behavior changes.
- Check loading, empty, and error states.
```

## Python CLI

Use this when a project exposes command-line workflows.

```md
# Repository Instructions

- Keep CLI output clear and scriptable.
- Add help text for new commands.
- Prefer standard library modules unless a dependency is necessary.
- Add small tests for parsing and edge cases.
```

## OSS Maintainer Workflow

Use this when the repo receives issues and pull requests.

```md
# Repository Instructions

- Triage issues before implementing.
- Prefer small pull requests.
- Ask for reproduction steps when bug reports are unclear.
- Update release notes when user-facing behavior changes.
```
