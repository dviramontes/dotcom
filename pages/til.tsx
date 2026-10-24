import Container from '../components/container'
import TILTerminalList from '../components/til-terminal-list'
import Layout from '../components/layout'
import PostTitle from '../components/post-title'
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
      <Layout preview={false}>
        <Head>
          <title>TIL | {CMS_NAME}</title>
        </Head>
        <article>
          <Container>
            <PostTitle>TIL</PostTitle>
            <article className="w-full">
              <div className="max-w-4xl mx-auto">
                <TILTerminalList entries={allPosts} showTitle={false} />
              </div>
            </article>
          </Container>
        </article>
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
