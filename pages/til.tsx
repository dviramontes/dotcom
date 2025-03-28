import Container from '../components/container'
import MorePosts from '../components/more-posts'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllEntries } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import type TILType from '../interfaces/til'

type Props = {
  allPosts: TILType[]
}

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Today I Learned | {CMS_NAME}</title>
        </Head>
        <Container>
          {/* You might want a dedicated TIL intro component later */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Today I Learned
          </h1>
          {allPosts.length > 0 && <MorePosts posts={allPosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllEntries('til', [
    'title',
    'date',
    'slug',
    'coverImage', 
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
