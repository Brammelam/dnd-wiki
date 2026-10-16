/**
 * Post scribe-resolution comments and close giscus wiki threads (RESOLVED).
 *
 *   export GITHUB_TOKEN=$(gh auth token)
 *   node scripts/resolve-scribe-discussions.mjs
 */

const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error("Set GITHUB_TOKEN (e.g. export GITHUB_TOKEN=$(gh auth token))")
  process.exit(1)
}

const addComment = `
  mutation($input: AddDiscussionCommentInput!) {
    addDiscussionComment(input: $input) {
      comment { url }
    }
  }
`

const closeDisc = `
  mutation($input: CloseDiscussionInput!) {
    closeDiscussion(input: $input) {
      discussion { id closed }
    }
  }
`

const discussionState = `
  query($id: ID!) {
    node(id: $id) {
      ... on Discussion {
        closed
        comments(first: 100) {
          nodes { body }
          pageInfo { hasNextPage }
        }
      }
    }
  }
`

/** node_id from GET /repos/OWNER/REPO/discussions/N */
const THREADS = [
  {
    n: 1,
    id: "D_kwDOSBoiMc4Alzl2",
    body: `**Scribe / wiki:** Feedback here is incorporated: [places index](https://github.com/Brammelam/dnd-wiki/blob/main/places/index.md) — Academy framed as a national org (Dior = one office); Fey Realm / Alverike cross-linked. Closing as **resolved**.`,
  },
  {
    n: 2,
    id: "D_kwDOSBoiMc4AlzmA",
    body: `**Scribe / wiki:** [Morgan's Keep](https://github.com/Brammelam/dnd-wiki/blob/main/places/morgans-keep.md) updated (full party in Known Residents; Church of the Triad). **Resolved**.`,
  },
  {
    n: 3,
    id: "D_kwDOSBoiMc4AlzmW",
    body: `**Scribe / wiki:** [Factions index](https://github.com/Brammelam/dnd-wiki/blob/main/factions/index.md) + [kingdom politics](https://github.com/Brammelam/dnd-wiki/blob/main/places/kingdom-of-morgan.md): Third Army, Toll Guild / Garreth, Triad, great houses, King’s Council framing. **Resolved**.`,
  },
  {
    n: 4,
    id: "D_kwDOSBoiMc4Alzma",
    body: `**Scribe / wiki:** [The Academy (faction)](https://github.com/Brammelam/dnd-wiki/blob/main/factions/the-academy.md) — offices in major cities, not a single Dior-only campus. **Resolved**.`,
  },
  {
    n: 5,
    id: "D_kwDOSBoiMc4Alzmf",
    body: `**Scribe / wiki:** [Church of the Triad](https://github.com/Brammelam/dnd-wiki/blob/main/factions/temple-of-tyr.md) (file \`temple-of-tyr.md\`) replaces “Temple of the Just” as the main national church framing. **Resolved**.`,
  },
  {
    n: 6,
    id: "D_kwDOSBoiMc4Alzmp",
    body: `**Scribe / wiki:** [Carlos](https://github.com/Brammelam/dnd-wiki/blob/main/characters/carlos.md) — Half-Orc + background per table. **Resolved**.`,
  },
  {
    n: 7,
    id: "D_kwDOSBoiMc4Alzm6",
    body: `**Scribe / wiki:** [Sommerhimmel](https://github.com/Brammelam/dnd-wiki/blob/main/characters/sommerhimmel.md) — Titania / Elowen contact + stakes. **Resolved**.`,
  },
  {
    n: 8,
    id: "D_kwDOSBoiMc4AlznC",
    body: `**Scribe / wiki:** Character is **[Anne Knutsen](https://github.com/Brammelam/dnd-wiki/blob/main/characters/anne-knutsen.md)** (old \`anna-pilsen\` slug removed). **Resolved**.`,
  },
  {
    n: 9,
    id: "D_kwDOSBoiMc4AlznF",
    body: `**Scribe / wiki:** **[Lynn Salt](https://github.com/Brammelam/dnd-wiki/blob/main/characters/lynn-salt.md)** — single NPC (merged Gilda/Frida reception + road). **Resolved**.`,
  },
  {
    n: 10,
    id: "D_kwDOSBoiMc4AlznG",
    body: `**Scribe / wiki:** Gilda merged into **[Lynn Salt](https://github.com/Brammelam/dnd-wiki/blob/main/characters/lynn-salt.md)**; standalone \`gilda.md\` removed. **Resolved**.`,
  },
  {
    n: 11,
    id: "D_kwDOSBoiMc4AlznO",
    body: `**Scribe / wiki:** Academy “Frida” merged into **[Lynn Salt](https://github.com/Brammelam/dnd-wiki/blob/main/characters/lynn-salt.md)**; [Frida Marsensen](https://github.com/Brammelam/dnd-wiki/blob/main/characters/frida-marsensen.md) stays separate. **Resolved**.`,
  },
  {
    n: 12,
    id: "D_kwDOSBoiMc4AlznS",
    body: `**Scribe / wiki:** [Konstantin](https://github.com/Brammelam/dnd-wiki/blob/main/characters/konstantin-carnelian.md) — Rinden / promise to leave party be. **Resolved**.`,
  },
  {
    n: 13,
    id: "D_kwDOSBoiMc4Al6KT",
    body: null,
  },
  {
    n: 14,
    id: "D_kwDOSBoiMc4Al6XW",
    body: null,
  },
]

async function gql(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (!res.ok || json.errors || !json.data) {
    throw new Error(`GitHub HTTP ${res.status}: ${JSON.stringify(json.errors ?? json)}`)
  }
  return json.data
}

for (const t of THREADS) {
  try {
    const state = (await gql(discussionState, { id: t.id })).node
    if (!state?.comments || state.comments.pageInfo.hasNextPage) {
      throw new Error('Discussion missing or has more than 100 comments; inspect it before retrying')
    }
    const alreadyPosted = t.body && state.comments.nodes.some(({ body }) => body.trim() === t.body.trim())
    if (t.body && !alreadyPosted && !state.closed) {
      const r1 = await gql(addComment, {
        input: { discussionId: t.id, body: t.body },
      })
      const url = r1.addDiscussionComment?.comment?.url
      if (!url) throw new Error('Comment response did not include a URL')
      console.log(`#${t.n} comment:`, url)
    } else if (t.body && !alreadyPosted) {
      throw new Error('Discussion is closed without the expected resolution comment')
    } else {
      console.log(`#${t.n} comment: (already posted or not required)`)
    }
    if (!state.closed) {
      const r2 = await gql(closeDisc, {
        input: { discussionId: t.id, reason: "RESOLVED" },
      })
      if (!r2.closeDiscussion?.discussion?.closed) throw new Error('Discussion was not closed')
    }
    console.log(`#${t.n} closed`)
  } catch (e) {
    console.error(`FAIL #${t.n}:`, e.message)
    process.exitCode = 1
  }
}
