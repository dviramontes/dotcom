import Link from 'next/link'
import { FeedPost } from '../interfaces/feed'
import FeedList from './feed-list'

export default function FeedPreview({ posts }: { posts: FeedPost[] | null }) {
  return (
    <section className="mb-12 mt-8 max-w-[1300px]">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
          <Link href="/feed">Feed</Link>
        </h2>
        <Link
          href="/feed"
          className="text-sm font-medium text-brand hover:underline"
        >
          View feed →
        </Link>
      </div>
      <FeedList posts={posts} />
    </section>
  )
}
