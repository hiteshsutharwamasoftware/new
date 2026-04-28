import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'preferred-theme'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  // Fallback to system preference on first visit
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Apply to <html data-theme=...> as early as possible to avoid FOUC
  useLayoutEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
  }, [theme])

  // Persist selection
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
  }, [theme])

  // Toggle handler is memoized for stable reference
  const toggle = useMemo(() => () => setTheme(t => (t === 'light' ? 'dark' : 'light')), [])

  return { theme, setTheme, toggle }
}

