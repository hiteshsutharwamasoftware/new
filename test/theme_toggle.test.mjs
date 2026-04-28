import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (p) => fs.readFileSync(p, 'utf8');

// 1) UI toggle accessibility
test('App has an accessible theme toggle button', () => {
  const tsx = read('src/App.tsx');
  assert.match(tsx, /className="theme-toggle"/);
  assert.match(tsx, /aria-label="Toggle color theme"/i);
  assert.match(tsx, /aria-pressed=\{theme === 'dark'\}/);
});

// 2) Persistence key and write
test('useTheme persists with STORAGE_KEY preferred-theme', () => {
  const hook = read('src/hooks/useTheme.ts');
  assert.match(hook, /const STORAGE_KEY = 'preferred-theme'/);
  assert.match(hook, /localStorage\.setItem\(STORAGE_KEY, theme\)/);
});

// 3) First visit system preference
test('useTheme respects system dark preference via matchMedia', () => {
  const hook = read('src/hooks/useTheme.ts');
  assert.match(hook, /prefers-color-scheme: dark/);
});

// 4) CSS dark theme variables
test('CSS defines dark theme variables under [data-theme=dark]', () => {
  const css = read('src/index.css');
  assert.match(css, /\[data-theme="dark"\]/);
  assert.match(css, /--bg: #16171d/);
  assert.match(css, /--text-h: #f3f4f6/);
});
