import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import EntryArticle from '../../components/entry-article'
import { getEntryBySlug, getAllEntries } from '../../lib/api'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'

type Props = {
  post: PostType
  preview?: boolean
}

export default function Post({ post, preview }: Props) {
  const router = useRouter()
  const pageTitle = `${post.title} | ${CMS_NAME}`
  const postImage = post.ogImage?.url || post.coverImage
  const ogImageUrl = postImage
    ? postImage.startsWith('http')
      ? postImage
      : `https://www.dviramontes.com${postImage}`
    : undefined

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
            title={post.title}
            headTitle={pageTitle}
            ogImageUrl={ogImageUrl}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            content={post.content}
          />
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
  const post = getEntryBySlug('posts', params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllEntries('posts', ['slug'])

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
