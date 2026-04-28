// Minimal theme utilities with no external deps
// Runtime JS so Node's built-in test runner can import it.

/** @typedef {"light"|"dark"} Theme */

export const THEME_KEY = 'theme'

/**
 * @param {unknown} v
 * @returns {Theme|null}
 */
export function normalizeTheme(v) {
  if (v === 'light' || v === 'dark') return v
  return null
}

/**
 * Decide initial theme using stored value when valid, else system preference.
 * @param {unknown} stored
 * @param {boolean} prefersDark
 * @returns {Theme}
 */
export function computeInitialTheme(stored, prefersDark) {
  const norm = normalizeTheme(stored)
  if (norm) return norm
  return prefersDark ? 'dark' : 'light'
}

/**
 * @param {Theme} theme
 * @returns {Theme}
 */
export function toggleTheme(theme) {
  return theme === 'dark' ? 'light' : 'dark'
}

/**
 * Persist the theme to provided Storage (e.g., localStorage)
 * @param {{ setItem: (k:string, v:string) => void }} storage
 * @param {Theme} theme
 */
export function persistTheme(storage, theme) {
  try {
    storage.setItem(THEME_KEY, theme)
  } catch {
    // ignore storage failures
  }
}

/**
 * Apply `data-theme` to the given root element (defaults to `document.documentElement`).
 * Not covered by Node tests, but used by the app at runtime.
 * @param {Theme} theme
 * @param {Element} [root]
 */
export function applyThemeAttr(theme, root) {
  const el = root ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!el) return
  try {
    el.setAttribute('data-theme', theme)
  } catch {
    // ignore DOM failures
  }
}

