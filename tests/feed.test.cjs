const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

function loadFeed(fetch) {
  const exports = {}
  const source = fs.readFileSync(path.join(__dirname, '../lib/feed.ts'), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  })
  vm.runInNewContext(outputText, {
    exports,
    fetch,
    URL,
    AbortController,
    setTimeout,
    clearTimeout,
    console: { error() {} },
    Date,
  })
  return exports
}

function feedItem(overrides) {
  return {
    post: {
      uri: 'at://did:plc:me/app.bsky.feed.post/abc',
      author: { handle: 'me.bsky.social', did: 'did:plc:me' },
      record: {
        text: 'hello',
        createdAt: '2026-09-27T01:30:00Z',
        facets: [
          {
            features: [
              {
                $type: 'app.bsky.richtext.facet#link',
                uri: 'https://example.com/a?b=1',
              },
            ],
          },
        ],
      },
      ...overrides,
    },
  }
}

for (const [name, fetch] of [
  ['HTTP 503', async () => ({ ok: false, status: 503 })],
  [
    'timeout',
    async () => {
      throw new Error('Request aborted')
    },
  ],
  ['invalid response', async () => ({ ok: true, json: async () => ({}) })],
]) {
  test(`${name}: initial build falls back; refreshes reject`, async () => {
    const { getFeedPostsForPage: getPosts } = loadFeed(fetch)
    assert.equal(await getPosts({ revalidateReason: 'build' }), null)
    for (const reason of ['stale', 'on-demand', undefined]) {
      await assert.rejects(getPosts({ revalidateReason: reason }))
    }
  })
}

test('successful empty feed remains distinct from unavailable feed', async () => {
  const { getFeedPostsForPage: getPosts } = loadFeed(async () => ({
    ok: true,
    json: async () => ({ feed: [] }),
  }))
  for (const reason of ['build', 'stale', 'on-demand']) {
    const posts = await getPosts({ revalidateReason: reason })
    assert(Array.isArray(posts))
    assert.equal(posts.length, 0)
  }
})

test('a malformed item is skipped instead of discarding the feed', async () => {
  const feed = [
    { post: { uri: 'at://x/y/1', author: {}, record: null } },
    feedItem({ record: { text: 'x', createdAt: 'now', facets: [{}] } }),
    feedItem(),
  ]
  const { getFeedPosts } = loadFeed(async () => ({
    ok: true,
    json: async () => ({ feed }),
  }))
  const posts = await getFeedPosts()
  assert.equal(posts.length, 1)
  assert.deepEqual(JSON.parse(JSON.stringify(posts[0].links)), [
    {
      url: 'https://example.com/a?b=1',
      title: 'example.com',
      hostname: 'example.com',
    },
  ])
})

test('concurrent callers share one scan; failures are not cached', async () => {
  let calls = 0
  let fail = true
  const { getFeedPosts } = loadFeed(async () => {
    calls++
    if (fail) throw new Error('down')
    return { ok: true, json: async () => ({ feed: [feedItem()] }) }
  })
  await assert.rejects(getFeedPosts())
  fail = false
  const [a, b] = await Promise.all([getFeedPosts(), getFeedPosts()])
  assert.equal(a, b)
  assert.equal(calls, 2)
})
