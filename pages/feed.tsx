import { GetStaticProps } from 'next'
import Head from 'next/head'
import Container from '../components/container'
import Header from '../components/header'
import Layout from '../components/layout'
import PostTitle from '../components/post-title'
import FeedList from '../components/feed-list'
import { FeedPost } from '../interfaces/feed'
import { BLUESKY_PROFILE, getFeedPostsForPage } from '../lib/feed'

export default function Feed({ posts }: { posts: FeedPost[] | null }) {
  return (
    <Layout>
      <Head>
        <title>Feed | dviramontes.com</title>
        <meta name="description" content="Recent shared links." />
      </Head>
      <Container>
        <Header />
        <PostTitle>Feed</PostTitle>
        <div className="mx-auto mb-32 max-w-2xl">
          <FeedList posts={posts} />
          <p className="mt-10 text-lg leading-relaxed">
            <a
              className="text-brand hover:underline"
              href={BLUESKY_PROFILE}
              target="_blank"
              rel="noreferrer"
            >
              My Bluesky feed
            </a>
          </p>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => ({
  props: { posts: await getFeedPostsForPage(context) },
  revalidate: 900,
})
