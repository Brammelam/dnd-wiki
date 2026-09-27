import assert from 'node:assert/strict'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sessions from '../.vitepress/theme/sessions.data.mjs'

const directory = await mkdtemp(join(tmpdir(), 'wiki-mentions-'))
try {
  const older = join(directory, 'session-09.md')
  const newer = join(directory, 'session-10.md')
  await writeFile(older, '# An earlier meeting\n\n[Thorn](/characters/thorn-alchemist)')
  await writeFile(newer, `# A later meeting

[Thorn](/characters/thorn-alchemist.md#history), [again](/characters/thorn-alchemist)
[Morgan's Keep](../places/morgans-keep.html), [the Academy][academy]
[Other site](https://example.com/characters/outsider)

[academy]: /factions/the-academy

\`[Not a mention](/characters/fiction)\`
`)
  const mentions = await sessions.load([older, newer])
  assert.deepEqual(mentions['/characters/thorn-alchemist'], [
    { url: '/sessions/session-10', title: 'A later meeting' },
    { url: '/sessions/session-09', title: 'An earlier meeting' },
  ])
  assert.equal(mentions['/places/morgans-keep'][0].url, '/sessions/session-10')
  assert.equal(mentions['/factions/the-academy'].length, 1)
  assert.equal(mentions['/characters/outsider'], undefined)
  assert.equal(mentions['/characters/fiction'], undefined)
  assert.deepEqual(await sessions.load([]), {})
  console.log('Session mentions: ordering, deduplication and Markdown links passed.')
} finally {
  await rm(directory, { recursive: true, force: true })
}
