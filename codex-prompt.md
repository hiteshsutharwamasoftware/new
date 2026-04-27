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

As a homepage visitor, I want to see a textbox on the homepage - Homepage visitors (both new and returning users) need a textbox on the homepage to input information or interact with the application directly from the landing page. This feature streamlines user engagement by allowing users to immediately enter data or search, improving usability and reducing friction. The textbox should be prominently placed and accessible on all devices, ensuring a seamless experience.
