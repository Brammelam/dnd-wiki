import assert from 'node:assert/strict'
import { test } from 'node:test'

test('resolution script posts once and closes once across retries', async () => {
  const previousFetch = globalThis.fetch
  const previousToken = process.env.GITHUB_TOKEN
  const discussions = new Map()
  let comments = 0
  let closes = 0

  process.env.GITHUB_TOKEN = 'test-token'
  globalThis.fetch = async (_url, options) => {
    const { query, variables } = JSON.parse(options.body)
    const id = variables.id ?? variables.input.discussionId
    const state = discussions.get(id) ?? { closed: false, bodies: [] }
    discussions.set(id, state)

    if (query.includes('query($id: ID!)')) {
      return Response.json({ data: { node: {
        closed: state.closed,
        comments: { nodes: state.bodies.map(body => ({ body })), pageInfo: { hasNextPage: false } },
      } } })
    }
    if (query.includes('AddDiscussionCommentInput')) {
      state.bodies.push(variables.input.body)
      comments++
      return Response.json({ data: { addDiscussionComment: { comment: { url: `https://example.test/${comments}` } } } })
    }
    state.closed = true
    closes++
    return Response.json({ data: { closeDiscussion: { discussion: { closed: true } } } })
  }

  try {
    await import('./resolve-scribe-discussions.mjs?first')
    assert.equal(comments, 12)
    assert.equal(closes, 14)
    await import('./resolve-scribe-discussions.mjs?retry')
    assert.equal(comments, 12)
    assert.equal(closes, 14)
  } finally {
    globalThis.fetch = previousFetch
    if (previousToken === undefined) delete process.env.GITHUB_TOKEN
    else process.env.GITHUB_TOKEN = previousToken
  }
})

test('implementation reply script rejects a missing comment URL', async () => {
  const previousFetch = globalThis.fetch
  const previousToken = process.env.GITHUB_TOKEN
  const previousExitCode = process.exitCode
  process.env.GITHUB_TOKEN = 'test-token'
  globalThis.fetch = async () => Response.json({ data: { addDiscussionComment: { comment: {} } } })

  try {
    await import('./post-discussion-implementation-replies.mjs?missing-url')
    assert.equal(process.exitCode, 1)
  } finally {
    globalThis.fetch = previousFetch
    process.exitCode = previousExitCode
    if (previousToken === undefined) delete process.env.GITHUB_TOKEN
    else process.env.GITHUB_TOKEN = previousToken
  }
})
