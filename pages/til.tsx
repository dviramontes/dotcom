import Container from '../components/container'
import TILTerminalList from '../components/til-terminal-list'
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
          <title>{CMS_NAME}</title>
        </Head>
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Today I Learned
          </h1>
          {allPosts.length > 0 && <TILTerminalList entries={allPosts} />}
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
    'content',
  ])

  return {
    props: { allPosts },
  }
}
