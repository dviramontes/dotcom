import { FeedPost } from '../interfaces/feed'
import type { GetStaticPropsContext } from 'next'

export const BLUESKY_HANDLE = 'dviramontes.bsky.social'
export const BLUESKY_PROFILE = `https://bsky.app/profile/${BLUESKY_HANDLE}`

type Embed = {
  external?: { uri: string; title?: string }
  media?: Embed
}

type FeedItem = {
  reason?: { $type: string; indexedAt?: string }
  post: {
    uri: string
    author: { handle: string; did: string }
    record: {
      text: string
      createdAt: string
      reply?: unknown
      embed?: Embed
      facets?: { features: { $type: string; uri?: string }[] }[]
    }
  }
}

function externalURL(value: string): string | null {
  try {
    const url = new URL(value)
    if (!['https:', 'http:'].includes(url.protocol)) return null
    if (url.hostname === 'bsky.app' || url.hostname.endsWith('.bsky.app')) {
      return null
    }
    return url.href
  } catch {
    return null
  }
}

export function extractFeedPost(item: FeedItem): FeedPost | null {
  const { post, reason } = item
  const { record } = post
  if (record.reply) return null

  const links = new Map<string, string>()
  const external = record.embed?.external || record.embed?.media?.external
  if (external) {
    const url = externalURL(external.uri)
    if (url) links.set(url, external.title || new URL(url).hostname)
  }
  for (const facet of record.facets || []) {
    for (const feature of facet.features) {
      if (feature.$type !== 'app.bsky.richtext.facet#link' || !feature.uri)
        continue
      const url = externalURL(feature.uri)
      if (url && !links.has(url)) links.set(url, new URL(url).hostname)
    }
  }
  if (links.size === 0) return null

  const repost = reason?.$type === 'app.bsky.feed.defs#reasonRepost'
  const date = (repost && reason.indexedAt) || record.createdAt
  if (!Number.isFinite(Date.parse(date))) return null

  return {
    uri: post.uri,
    url: `https://bsky.app/profile/${post.author.did}/post/${post.uri
      .split('/')
      .pop()}`,
    text: record.text,
    date,
    author: post.author.handle,
    repost,
    links: Array.from(links, ([url, title]) => ({ url, title })),
  }
}

export async function getFeedPosts(): Promise<FeedPost[]> {
  const posts = new Map<string, FeedPost>()
  let cursor: string | undefined
  // Bound sparse-feed scans so static generation cannot run indefinitely.
  for (let page = 0; page < 10; page++) {
    const url = new URL(
      'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed',
    )
    url.searchParams.set('actor', BLUESKY_HANDLE)
    url.searchParams.set('filter', 'posts_no_replies')
    url.searchParams.set('limit', '100')
    if (cursor) url.searchParams.set('cursor', cursor)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    let data: { feed: FeedItem[]; cursor?: string }
    try {
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok)
        throw new Error(`Bluesky returned HTTP ${response.status}`)
      data = await response.json()
    } finally {
      clearTimeout(timeout)
    }
    if (!Array.isArray(data.feed)) throw new Error('Invalid Bluesky feed')
    for (const item of data.feed) {
      const post = extractFeedPost(item)
      if (post && !posts.has(post.uri)) posts.set(post.uri, post)
    }
    if (posts.size >= 10 || !data.cursor || data.cursor === cursor) break
    cursor = data.cursor
  }
  return Array.from(posts.values())
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 10)
}

export async function getFeedPostsForPage({
  revalidateReason,
}: GetStaticPropsContext): Promise<FeedPost[] | null> {
  try {
    return await getFeedPosts()
  } catch (error) {
    // Throw during ISR so Next.js keeps the last successfully generated page.
    if (revalidateReason !== 'build') throw error
    console.error('Could not load Bluesky feed during build', error)
    return null
  }
}
