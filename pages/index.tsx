import Container from '../components/container'
import MorePosts from '../components/more-posts'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import TILTerminalList from '../components/til-terminal-list'
import ToolsPeriodicTable from '../components/tools-periodic-table'
import Webring from '../components/webring'
import BookshelfPreview from '../components/bookshelf-preview'
import FeedPreview from '../components/feed-preview'
import { getFeedPosts } from '../lib/feed'
import { FeedPost } from '../interfaces/feed'
import { getAllEntries } from '../lib/api'
import { getBookshelf } from '../lib/bookshelf'
import Head from 'next/head'
import Post from '../interfaces/post'
import TILType from '../interfaces/til'
import { Book } from '../interfaces/bookshelf'

type Props = {
  allPosts: Post[]
  allTILs: TILType[]
  recentBooks: Book[]
  feedPosts: FeedPost[] | null
}

const POST_FIELDS = ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']
const TIL_FIELDS = ['title', 'date', 'slug', 'coverImage', 'excerpt', 'content']
const PREVIEW_COUNT = 3

export default function Index({
  allPosts,
  allTILs,
  recentBooks,
  feedPosts,
}: Props) {
  const [heroPost, ...morePosts] = allPosts

  return (
    <Layout>
      <Head>
        <title>dviramontes.com</title>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <Container>
        <Intro />
        {allTILs.length > 0 && <TILTerminalList entries={allTILs} limit={5} />}
        <h2 className="mb-4 text-2xl font-bold text-stone-800 dark:text-stone-100">
          Posts
        </h2>
        {heroPost && (
          <HeroPost
            basePath="/posts"
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && (
          <MorePosts posts={morePosts} basePath="/posts" />
        )}
        <BookshelfPreview books={recentBooks} />
        <FeedPreview posts={feedPosts} />
        <ToolsPeriodicTable />
        <Webring className="mb-16" />
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  // Neither external source may block the homepage's posts, TILs, or refreshes.
  const [bookshelf, feed] = await Promise.allSettled([
    getBookshelf(),
    getFeedPosts(),
  ])

  let recentBooks: Book[] = []
  if (bookshelf.status === 'fulfilled') {
    recentBooks = bookshelf.value.read.slice(0, PREVIEW_COUNT)
  } else {
    console.error('Could not load recent books', bookshelf.reason)
  }

  let feedPosts: FeedPost[] | null = null
  if (feed.status === 'fulfilled') {
    feedPosts = feed.value.slice(0, PREVIEW_COUNT)
  } else {
    console.error('Could not load Bluesky feed', feed.reason)
  }

  return {
    props: {
      allPosts: getAllEntries('posts', POST_FIELDS),
      allTILs: getAllEntries('til', TIL_FIELDS),
      recentBooks,
      feedPosts,
    },
    revalidate: 300,
  }
}
