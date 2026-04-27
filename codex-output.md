Summary
- Added an accessible textbox to the homepage and a minimal test to prevent regressions.
- Wired npm test to run the new test, verified green tests and successful build, and synced docs per Auto Document Mode.

Tests Added/Updated
- tests/homepage.spec.mjs: Node-based check that asserts:
  - An <input> exists in src/App.tsx.
  - The input is text-like (type="text" or has a placeholder).
  - The input has accessible labelling (label/aria-label/aria-labelledby).
- package.json: Added script "test": "node tests/homepage.spec.mjs".

Homepage Change (minimal)
- src/App.tsx: Inserted a prominently placed, accessible textbox within the hero section:
  - Uses a visually hidden label plus aria-label for accessibility.
  - Markup: a simple form with an input type="text" and placeholder.
- src/index.css: Added a .sr-only utility class for accessible, visually hidden labels.

Commands Run
- Setup: npm ci (from Verity config; implicitly satisfied via installed node_modules).
- Tests: npm test → Homepage textbox test passed.
- Build: npm run build → Vite build successful.
- Docs sync (Auto Mode enabled): python scripts/sync_repo_docs.py → Updated docs/REPO_CONTEXT.md and docs/AI_HANDOFF.md.

Notes
- Followed AGENTS.md: minimal, production-ready change; no new dependencies; no secrets.
- If you want, I can convert the Node check to a proper React/Vitest test harness later, but kept scope minimal as requested.