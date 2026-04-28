import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useTheme } from './hooks/useTheme'
import { useWidgetUser } from './hooks/useWidget'

// Replace this with your real auth context when you have one
const MOCK_USER = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'user',
  tenant: { id: 'tenant-1', name: 'Demo Org' }
}

function App() {
  const [count, setCount] = useState(0)
  const { theme, toggle } = useTheme()

  // Syncs current user into the feedback widget
  useWidgetUser(MOCK_USER)

  return (
    <>
      {/* Accessible, persistent theme toggle */}
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
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
          <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text)' }}>
            Current theme: <strong style={{ color: 'var(--text-h)' }}>{theme}</strong>
          </p>
        </div>
        {/* Prominent, accessible textbox for homepage visitors */}
        <div className="textbox-wrap">
          <label htmlFor="homepage-textbox" className="sr-only">Homepage text input</label>
          <input
            id="homepage-textbox"
            name="homepage-textbox"
            type="text"
            className="homepage-textbox"
            placeholder="Type here to begin..."
            aria-describedby="textbox-help"
            inputMode="text"
            autoComplete="off"
          />
          <p id="textbox-help" className="visually-subtle">Press Tab to focus, then start typing.</p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
