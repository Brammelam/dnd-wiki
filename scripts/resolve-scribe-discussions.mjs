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
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors, null, 2))
  }
  return json.data
}

for (const t of THREADS) {
  try {
    if (t.body) {
      const r1 = await gql(addComment, {
        input: { discussionId: t.id, body: t.body },
      })
      console.log(`#${t.n} comment:`, r1.addDiscussionComment?.comment?.url || "ok")
    } else {
      console.log(`#${t.n} comment: (skip — already noted)`)
    }
    const r2 = await gql(closeDisc, {
      input: { discussionId: t.id, reason: "RESOLVED" },
    })
    console.log(`#${t.n} closed:`, r2.closeDiscussion?.discussion?.closed ?? r2)
  } catch (e) {
    console.error(`FAIL #${t.n}:`, e.message)
    process.exitCode = 1
  }
}
