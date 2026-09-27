import { FeedPost } from '../interfaces/feed'
import FeedList from './feed-list'
import PreviewSection from './preview-section'

type Props = {
  posts: FeedPost[] | null
}

export default function FeedPreview({ posts }: Props) {
  if (!posts?.length) {
    return null
  }

  return (
    <PreviewSection title="Feed" href="/feed" linkText="View feed">
      <FeedList posts={posts} />
    </PreviewSection>
  )
}
