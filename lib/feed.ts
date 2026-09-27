import { FeedLink, FeedPost } from '../interfaces/feed'
import type { GetStaticPropsContext } from 'next'

export const BLUESKY_HANDLE = 'dviramontes.bsky.social'
export const BLUESKY_PROFILE = `https://bsky.app/profile/${BLUESKY_HANDLE}`

const FEED_ENDPOINT =
  'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed'
export const MAX_POSTS = 10
// Bound sparse-feed scans so static generation cannot run indefinitely.
const MAX_PAGES = 10
// One deadline for the whole scan keeps getStaticProps well under serverless
// function limits even when every page request is slow.
const SCAN_DEADLINE_MS = 8000
// Both the homepage and /feed call getFeedPosts; share one scan per build.
const CACHE_TTL_MS = 60_000

type Embed = {
  external?: { uri?: string; title?: string }
  media?: Embed
}

type FeedItem = {
  reason?: { $type?: string; indexedAt?: string }
  post?: {
    uri: string
    author?: { handle?: string; did?: string }
    record?: {
      text?: string
      createdAt?: string
      reply?: unknown
      embed?: Embed
      facets?: { features?: { $type?: string; uri?: string }[] }[]
    }
  }
}

type FeedPage = { feed: FeedItem[]; cursor?: string }

function externalLink(value: string): Omit<FeedLink, 'title'> | null {
  try {
    const url = new URL(value)
    if (!['https:', 'http:'].includes(url.protocol)) return null
    if (url.hostname === 'bsky.app' || url.hostname.endsWith('.bsky.app')) {
      return null
    }
    return { url: url.href, hostname: url.hostname }
  } catch {
    return null
  }
}

export function extractFeedPost(item: FeedItem): FeedPost | null {
  const { post, reason } = item
  const record = post?.record
  if (!post?.uri || !post.author?.did || !record || record.reply) return null

  const links = new Map<string, FeedLink>()
  const addLink = (value: string | undefined, title?: string) => {
    if (!value) return
    const link = externalLink(value)
    if (link && !links.has(link.url)) {
      links.set(link.url, { ...link, title: title || link.hostname })
    }
  }
  const external = record.embed?.external || record.embed?.media?.external
  addLink(external?.uri, external?.title)
  for (const facet of record.facets ?? []) {
    for (const feature of facet.features ?? []) {
      if (feature.$type === 'app.bsky.richtext.facet#link') addLink(feature.uri)
    }
  }
  if (links.size === 0) return null

  const repost = reason?.$type === 'app.bsky.feed.defs#reasonRepost'
  const date = (repost && reason?.indexedAt) || record.createdAt
  if (!date || !Number.isFinite(Date.parse(date))) return null

  return {
    uri: post.uri,
    url: `https://bsky.app/profile/${post.author.did}/post/${post.uri
      .split('/')
      .pop()}`,
    text: record.text ?? '',
    date,
    author: post.author.handle ?? '',
    repost,
    links: Array.from(links.values()),
  }
}

// One malformed item must not discard the rest of the feed.
function safeExtractFeedPost(item: FeedItem): FeedPost | null {
  try {
    return extractFeedPost(item)
  } catch {
    return null
  }
}

async function fetchFeedPage(
  cursor: string | undefined,
  signal: AbortSignal,
): Promise<FeedPage> {
  const url = new URL(FEED_ENDPOINT)
  url.searchParams.set('actor', BLUESKY_HANDLE)
  url.searchParams.set('filter', 'posts_no_replies')
  url.searchParams.set('limit', '100')
  if (cursor) url.searchParams.set('cursor', cursor)

  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Bluesky returned HTTP ${response.status}`)
  const data: Partial<FeedPage> = await response.json()
  if (!Array.isArray(data.feed)) throw new Error('Invalid Bluesky feed')
  return { feed: data.feed, cursor: data.cursor }
}

async function scanFeed(): Promise<FeedPost[]> {
  const posts = new Map<string, FeedPost>()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), SCAN_DEADLINE_MS)
  try {
    let cursor: string | undefined
    for (let page = 0; page < MAX_PAGES; page++) {
      const data = await fetchFeedPage(cursor, controller.signal)
      for (const item of data.feed) {
        const post = safeExtractFeedPost(item)
        if (post && !posts.has(post.uri)) posts.set(post.uri, post)
      }
      if (posts.size >= MAX_POSTS || !data.cursor || data.cursor === cursor) {
        break
      }
      cursor = data.cursor
    }
  } finally {
    clearTimeout(timeout)
  }
  return Array.from(posts.values())
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, MAX_POSTS)
}

let cached: { promise: Promise<FeedPost[]>; expires: number } | null = null

export function getFeedPosts(): Promise<FeedPost[]> {
  if (cached && cached.expires > Date.now()) return cached.promise
  const promise = scanFeed()
  cached = { promise, expires: Date.now() + CACHE_TTL_MS }
  promise.catch(() => {
    if (cached?.promise === promise) cached = null
  })
  return promise
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
