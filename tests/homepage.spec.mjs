// Minimal Node-based assertion to prevent regressions.
// Validates that the homepage markup contains a textbox input.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function assert(condition, message) {
  if (!condition) {
    console.error(message)
    process.exitCode = 1
  }
}

// Read the React source to ensure an <input> of type="text" is present
const appPath = resolve(process.cwd(), 'src', 'App.tsx')
const source = readFileSync(appPath, 'utf8')

// Basic checks: input exists and has an accessible label or placeholder
const hasInput = /<input[^>]*>/i.test(source)
assert(hasInput, 'Expected an <input> element on the homepage (src/App.tsx).')

// If input exists, ensure it is a textbox-like entry point
const isTextLike = /<input[^>]*(type\s*=\s*"text"|type\s*=\s*{\s*"text"\s*}|type\s*=\s*{\s*'text'\s*}|type\s*=\s*{\s*`text`\s*}|type\b(?!\s*=)|placeholder=)/i.test(
  source,
)
assert(
  isTextLike,
  'Expected the input to be a text entry (type="text") or include a placeholder.',
)

// Accessibility: look for an associated label or aria-label
const hasLabel = /<label[^>]*for=|aria-label=|aria-labelledby=|<label[^>]*>.*<input/i.test(
  source,
)
assert(
  hasLabel,
  'Expected the textbox to have an accessible label (label/aria-label/aria-labelledby).',
)

console.log('Homepage textbox test passed.')

