# Verity Codex Dev Cycle

Follow `AGENTS.md` and `.verity/config.yml`.

Do NOT commit/push/open PR yourself. Leave changes in the working tree; the workflow creates the PR.

Required steps:
1) Read `AGENTS.md` and `.verity/config.yml`.
2) Implement the request with minimal, production-safe changes.
3) If `policies.documentation.auto_mode` is enabled, run `python scripts/sync_repo_docs.py`.
4) Run `commands.test` and `commands.build` (if present).
5) Fix failures until green.
6) Final message: Summary, files changed, tests/build commands run.
