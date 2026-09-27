import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'
import { createMarkdownRenderer } from 'vitepress'

export default {
  watch: ['../../sessions/session-*.md'],
  async load(files) {
    const markdown = await createMarkdownRenderer(process.cwd())
    const mentions = {}
    for (const file of [...files].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))) {
      const url = `/sessions/${basename(file, '.md')}`
      const env = { cleanUrls: true }
      markdown.render(await readFile(file, 'utf8'), env)
      const paths = new Set((env.links ?? [])
        .map(link => new URL(link, `https://wiki.local${url}`))
        .filter(link => link.origin === 'https://wiki.local')
        .map(link => link.pathname.replace(/\.(md|html)$/, '')))
      for (const path of paths) {
        if (/^\/(characters|places|factions|events)\/[^/]+$/.test(path)) {
          mentions[path] ??= []
          mentions[path].push({ url, title: env.title })
        }
      }
    }
    return mentions
  },
}
