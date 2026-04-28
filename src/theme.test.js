// Node's built-in test runner and assert
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  THEME_KEY,
  normalizeTheme,
  computeInitialTheme,
  toggleTheme,
  persistTheme,
} from './theme.js'

test('normalizeTheme accepts only light/dark', () => {
  assert.equal(normalizeTheme('light'), 'light')
  assert.equal(normalizeTheme('dark'), 'dark')
  assert.equal(normalizeTheme('foo'), null)
  assert.equal(normalizeTheme(undefined), null)
})

test('computeInitialTheme prefers stored when valid', () => {
  assert.equal(computeInitialTheme('dark', false), 'dark')
  assert.equal(computeInitialTheme('light', true), 'light')
})

test('computeInitialTheme falls back to system preference', () => {
  assert.equal(computeInitialTheme(null, true), 'dark')
  assert.equal(computeInitialTheme('nope', false), 'light')
})

test('toggleTheme flips between light and dark', () => {
  assert.equal(toggleTheme('light'), 'dark')
  assert.equal(toggleTheme('dark'), 'light')
})

test('persistTheme writes to storage under THEME_KEY', () => {
  const calls = []
  const storage = { setItem: (k, v) => calls.push([k, v]) }
  persistTheme(storage, 'dark')
  assert.deepEqual(calls, [[THEME_KEY, 'dark']])
})

