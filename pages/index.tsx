import Container from '../components/container'
import MorePosts from '../components/more-posts'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import TILTerminalList from '../components/til-terminal-list'
import ToolsPeriodicTable from '../components/tools-periodic-table'
import Webring from '../components/webring'
import { getAllEntries } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
import TILType from '../interfaces/til'

type Props = {
  allPosts: Post[]
  allTILs: TILType[]
}

const POST_FIELDS = ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']
const TIL_FIELDS = ['title', 'date', 'slug', 'coverImage', 'excerpt', 'content']

export default function Index({ allPosts, allTILs }: Props) {
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
        <ToolsPeriodicTable />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Posts</h2>
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
        <Webring className="mb-16" />
      </Container>
    </Layout>
  )
}

export const getStaticProps = async () => ({
  props: {
    allPosts: getAllEntries('posts', POST_FIELDS),
    allTILs: getAllEntries('til', TIL_FIELDS),
  },
})
