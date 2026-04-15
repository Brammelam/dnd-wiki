import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const pdf = require('pdf-parse/lib/pdf-parse.js')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HISTORY = path.resolve(__dirname, '../../dnd/History')
const files = fs.readdirSync(HISTORY).filter((f) => f.endsWith('.pdf'))

const out = {}
for (const f of files.sort()) {
  const buf = fs.readFileSync(path.join(HISTORY, f))
  try {
    const { text } = await pdf(buf)
    out[f] = text.trim()
  } catch (e) {
    out[f] = `__ERROR__ ${e.message}`
  }
}
console.log(JSON.stringify(out, null, 0))
