export type Theme = 'light' | 'dark'
export const THEME_KEY: 'theme'
export function normalizeTheme(v: unknown): Theme | null
export function computeInitialTheme(stored: unknown, prefersDark: boolean): Theme
export function toggleTheme(theme: Theme): Theme
export function persistTheme(storage: { setItem: (k: string, v: string) => void }, theme: Theme): void
export function applyThemeAttr(theme: Theme, root?: Element): void

