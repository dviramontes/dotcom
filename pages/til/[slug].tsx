import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import TILPagination from '../../components/til-pagination'
import Layout from '../../components/layout'
import Webring from '../../components/webring'
import {
  getEntryBySlug,
  getAllEntries,
  getPreviousAndNextTIL,
} from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import type TILType from '../../interfaces/til'

type Props = {
  post: TILType
  morePosts: TILType[]
  previousTIL: TILType | null
  nextTIL: TILType | null
  preview?: boolean
}

export default function TIL({
  post,
  morePosts,
  previousTIL,
  nextTIL,
  preview,
}: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.excerpt}</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.excerpt}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                isTIL={true}
              />
              <PostBody content={post.content} />
              <TILPagination previousTIL={previousTIL} nextTIL={nextTIL} />
              <hr className="border-[#458c70] border-t border-dashed mt-12 w-1/3 mx-auto" />
              <Webring />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getEntryBySlug('til', params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
  ])
  const content = await markdownToHtml(post.content || '')

  const { previousTIL, nextTIL } = getPreviousAndNextTIL(params.slug, [
    'title',
    'slug',
    'excerpt',
  ])

  return {
    props: {
      post: {
        ...post,
        content,
      },
      previousTIL: previousTIL || null,
      nextTIL: nextTIL || null,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllEntries('til', ['slug'])
  console.log({ posts })
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
