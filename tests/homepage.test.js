// Node-only smoke test: homepage includes an accessible textbox
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const srcPath = resolve(process.cwd(), 'src', 'App.tsx')
let src = ''
try {
  src = readFileSync(srcPath, 'utf8')
} catch (e) {
  console.error('FAIL: Could not read', srcPath)
  console.error(e?.message || e)
  process.exit(1)
}

// Match either <input type=text> or any element with role=textbox
const hasTextInput = /<\s*input[^>]*type\s*=\s*['"]text['"][^>]*>/i.test(src)
const hasRoleTextbox = /role\s*=\s*['"]textbox['"]/i.test(src)

// Require accessibility hint: aria-label, placeholder, or a label element
const hasA11y = /aria-label\s*=\s*['"][^'"]+['"]/i.test(src)
  || /placeholder\s*=\s*['"][^'"]+['"]/i.test(src)
  || /<\s*label\b/i.test(src)

if ((hasTextInput || hasRoleTextbox) && hasA11y) {
  console.log('PASS: Homepage includes an accessible textbox in src/App.tsx')
  process.exit(0)
}

console.error('FAIL: Expected an accessible textbox on the homepage (src/App.tsx).')
console.error('Hint: Add <input type="text" aria-label="..." /> near the top of the page.')
process.exit(2)
