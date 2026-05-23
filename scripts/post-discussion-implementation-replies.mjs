/**
 * Post "implemented in wiki" replies on GitHub Discussions.
 *
 *   export GITHUB_TOKEN=ghp_...   # classic PAT with `repo` scope, or use fine-grained with Discussions read/write
 *   node scripts/post-discussion-implementation-replies.mjs
 *
 * Or:  gh auth refresh -h github.com -s write:discussion
 * and pipe token — GitHub does not expose PAT via gh by default; prefer GITHUB_TOKEN from
 *   https://github.com/settings/tokens
 */

const OWNER = "Brammelam"
const REPO = "dnd-wiki"

const DISCUSSIONS = [
  {
    number: 13,
    // node_id from: GET /repos/OWNER/REPO/discussions/13 — field node_id
    nodeId: "D_kwDOSBoiMc4Al6KT",
    body: `**Scribe / wiki:** The changes from this thread are implemented in the repo.

- **Magda** — Updated: she does **intelligence / information** for **General Kamp** (not an artificer) and is **Thor’s superior**. Page: \`characters/magda.md\` (replaces the old \`magda-artificer\` slug). Session 24, Return to Morgan’s Keep, Thor, and links are updated; **General Camp** was corrected to **Kamp** with a [Third Army](https://dnd-wiki-0mrf.onrender.com/factions/third-army) link where relevant.
`,
  },
  {
    number: 14,
    nodeId: "D_kwDOSBoiMc4Al6XW",
    body: `**Scribe / wiki:** The changes from this thread are implemented in the repo.

- **Gregory Alabastor** — Added as the deceased they plan to **find in the [Crypt of Alabaster](https://dnd-wiki-0mrf.onrender.com/places/crypt-of-alabaster)** (per “the man who has passed”), with a stub at \`characters/gregory-alabastor.md\`. [Session 24](https://dnd-wiki-0mrf.onrender.com/sessions/session-24), [Return to Morgan’s Keep](https://dnd-wiki-0mrf.onrender.com/events/return-to-morgans-keep), and the crypt place page are aligned.
`,
  },
]

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error("Set GITHUB_TOKEN (see script header).")
  process.exit(1)
}

const mutation = `
  mutation($input: AddDiscussionCommentInput!) {
    addDiscussionComment(input: $input) {
      comment { url }
    }
  }
`

for (const d of DISCUSSIONS) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: { discussionId: d.nodeId, body: d.body },
      },
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(`Discussion #${d.number} failed:`, JSON.stringify(json.errors, null, 2))
    process.exitCode = 1
  } else {
    const url = json.data?.addDiscussionComment?.comment?.url
    console.log(`OK #${d.number}:`, url || json)
  }
}
