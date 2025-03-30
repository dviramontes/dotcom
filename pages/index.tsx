import Container from '../components/container'
import MorePosts from '../components/more-posts'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import TILTerminalList from '../components/til-terminal-list'
import { getAllEntries } from '../lib/api'
import Head from 'next/head'
import Post from '../interfaces/post'
import TILType from '../interfaces/til'

type Props = {
  allPosts: Post[]
  allTILs: TILType[]
}

export default function Index({ allPosts, allTILs }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>dviramontes.com</title>
        </Head>
        <Container>
          <Intro />
          {allTILs.length > 0 && <TILTerminalList entries={allTILs} />}
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
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllEntries('posts', [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  const allTILs = getAllEntries('til', [
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
    'content',
  ])

  return {
    props: {
      allPosts,
      allTILs,
    },
  }
}
