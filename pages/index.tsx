import Container from '../components/container'
import MorePosts from '../components/more-posts'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import TILTerminalList from '../components/til-terminal-list'
import ToolsPeriodicTable from '../components/tools-periodic-table'
import Webring from '../components/webring'
import BookshelfPreview from '../components/bookshelf-preview'
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
}

const POST_FIELDS = ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']
const TIL_FIELDS = ['title', 'date', 'slug', 'coverImage', 'excerpt', 'content']

export default function Index({ allPosts, allTILs, recentBooks }: Props) {
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
        <ToolsPeriodicTable />
        <Webring className="mb-16" />
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => {
  let recentBooks: Book[] = []

  try {
    const bookshelf = await getBookshelf()
    recentBooks = bookshelf.read.slice(0, 3)
  } catch (error) {
    console.error('Could not load recent books', error)
  }

  return {
    props: {
      allPosts: getAllEntries('posts', POST_FIELDS),
      allTILs: getAllEntries('til', TIL_FIELDS),
      recentBooks,
    },
    revalidate: 300,
  }
}
