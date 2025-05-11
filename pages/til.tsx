import Container from '../components/container'
import TILTerminalList from '../components/til-terminal-list'
import Layout from '../components/layout'
import { getAllEntries } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import type TILType from '../interfaces/til'
import Header from '../components/header'

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
            <Header />
            <article className="w-full">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-8 text-center md:text-left">
                  Today I Learned
                </h1>
                {allPosts.length > 0 && <TILTerminalList entries={allPosts} />}
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
