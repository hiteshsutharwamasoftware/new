Here’s what I did to add theme-toggle coverage and keep the repo green.

Summary
- Implemented a minimal theme utility and wired a homepage toggle button that sets a data-theme attribute and persists choice.
- Added Node’s built-in tests for theme logic (no extra deps).
- Kept changes small and production-ready, and respected existing architecture.

Tests Added
- src/theme.test.js
  - normalizeTheme accepts only 'light'/'dark'.
  - computeInitialTheme uses stored value; otherwise honors system preference.
  - toggleTheme flips between states.
  - persistTheme writes using THEME_KEY.

Code Changes (scoped and minimal)
- src/theme.js: Small, dependency-free theme helpers: computeInitialTheme, toggleTheme, persistTheme, applyThemeAttr, THEME_KEY.
- src/theme.d.ts: Type declarations so TypeScript build succeeds.
- src/App.tsx: Adds a “Toggle theme (current: …)” button on the homepage; initializes theme from storage or system preference; updates document attribute and persists on toggle.
- src/index.css: Adds explicit [data-theme='light'|'dark'] overrides to complement media-query defaults.

Repo Commands Run
- Setup: npm ci
- Tests: npm test (Node test runner)
- Build: npm run build
- Auto docs (enabled): python scripts/sync_repo_docs.py

Results
- Tests pass: 1 suite, 1 test file, all green.
- Build succeeds via TypeScript + Vite.

Notes
- No new dependencies introduced.
- No secrets added or logged.
- Feature is accessible on the homepage and remembers selection via localStorage.

Want me to also add a lightweight E2E interaction test (e.g., Playwright) to simulate clicking the toggle and asserting data-theme, or keep it unit-only for now?