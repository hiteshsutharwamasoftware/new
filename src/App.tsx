import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle color theme"
        aria-pressed={theme === 'dark'}
        onClick={toggle}
      >
        <span aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
        <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
      </button>
    </>
  )
}

export default App
