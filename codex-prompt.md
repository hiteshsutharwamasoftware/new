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

As a homepage visitor, I want to toggle between dark and light themes - Homepage visitors (both new and returning users) want the ability to switch between dark and light themes to suit their visual preferences and improve accessibility. Providing a theme toggle enhances user experience, accommodates different lighting environments, and aligns with modern UI expectations. This feature should be easily accessible on the homepage and remember the user's selection for future visits.
