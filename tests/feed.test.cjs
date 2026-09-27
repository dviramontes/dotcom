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
  })
  return exports.getFeedPostsForPage
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
    const getPosts = loadFeed(fetch)
    assert.equal(await getPosts({ revalidateReason: 'build' }), null)
    for (const reason of ['stale', 'on-demand', undefined]) {
      await assert.rejects(getPosts({ revalidateReason: reason }))
    }
  })
}

test('successful empty feed remains distinct from unavailable feed', async () => {
  const getPosts = loadFeed(async () => ({
    ok: true,
    json: async () => ({ feed: [] }),
  }))
  for (const reason of ['build', 'stale', 'on-demand']) {
    const posts = await getPosts({ revalidateReason: reason })
    assert(Array.isArray(posts))
    assert.equal(posts.length, 0)
  }
})
