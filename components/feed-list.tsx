import { FeedPost } from '../interfaces/feed'
import { formatTimestamp } from '../lib/dates'
import FeedText from './feed-text'

export default function FeedList({ posts }: { posts: FeedPost[] | null }) {
  if (posts === null) {
    return (
      <p className="text-stone-500 dark:text-stone-400">
        The feed is temporarily unavailable. Please check back soon.
      </p>
    )
  }

  if (!posts.length) {
    return (
      <p className="text-stone-500 dark:text-stone-400">
        No links shared yet. Check back soon.
      </p>
    )
  }

  return (
    <ol className="divide-y divide-stone-300/80 rounded-lg border border-stone-300/80 bg-white/60 dark:divide-stone-700 dark:border-stone-700 dark:bg-stone-900/50">
      {posts.map((post, index) => (
        <li key={post.uri} className="flex gap-4 p-5 sm:gap-6 sm:p-6">
          <span
            aria-hidden="true"
            className="pt-1 font-mono text-sm text-stone-400"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
              <time dateTime={post.date}>{formatTimestamp(post.date)}</time>
              {post.repost && <span>Reposted from @{post.author}</span>}
            </div>
            <FeedText text={post.text} />
            <ul className="mt-4 space-y-2">
              {post.links.map((link) => (
                <li key={link.url}>
                  <a
                    className="break-words font-medium text-brand hover:underline"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.title} <span aria-hidden="true">↗</span>
                  </a>
                  <p className="break-all text-xs text-stone-500 dark:text-stone-400">
                    {link.hostname}
                  </p>
                </li>
              ))}
            </ul>
            <a
              className="mt-4 inline-block text-sm text-stone-500 hover:underline dark:text-stone-400"
              href={post.url}
              target="_blank"
              rel="noreferrer"
            >
              View on Bluesky →
            </a>
          </div>
        </li>
      ))}
    </ol>
  )
}
