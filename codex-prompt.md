# Verity Codex Test Generation

Generate/update tests to reflect intended behavior and prevent regressions.

Rules:
- Follow `AGENTS.md`.
- Prefer adding tests over changing production code.
- Keep scope minimal.

Steps:
1) Read `.verity/config.yml` to learn test/build commands.
2) Add/update tests.
3) If `policies.documentation.auto_mode` is enabled, run `python scripts/sync_repo_docs.py`.
4) Run tests/build until green.
5) Final message: Summary, tests added, commands run.

## Scope

As a homepage visitor, I want to see a textbox on the homepage - A homepage visitor is typically an unauthenticated or first-time user who lands on the main page of the application. This user wants to see a textbox prominently displayed on the homepage. The textbox could serve various purposes, such as search, input, or engagement, and its presence can improve user interaction and guide users toward key actions. Ensuring the textbox is visible and accessible on the homepage supports usability an
