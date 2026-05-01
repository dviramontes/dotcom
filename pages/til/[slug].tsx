import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import TILPagination from '../../components/til-pagination'
import Layout from '../../components/layout'
import EntryArticle from '../../components/entry-article'
import {
  getEntryBySlug,
  getAllEntries,
  getPreviousAndNextTIL,
} from '../../lib/api'
import PostTitle from '../../components/post-title'
import markdownToHtml from '../../lib/markdownToHtml'
import type TILType from '../../interfaces/til'

type Props = {
  post: TILType
  previousTIL: TILType | null
  nextTIL: TILType | null
  preview?: boolean
}

export default function TIL({ post, previousTIL, nextTIL, preview }: Props) {
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
          <EntryArticle
            title={post.excerpt}
            headTitle={post.excerpt}
            ogImageUrl={post.ogImage.url}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            content={post.content}
            isTIL
          >
            <TILPagination previousTIL={previousTIL} nextTIL={nextTIL} />
          </EntryArticle>
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
