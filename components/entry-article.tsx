import Head from 'next/head'
import type { ReactNode } from 'react'
import type Author from '../interfaces/author'
import PostBody from './post-body'
import PostHeader from './post-header'
import Webring from './webring'

type Props = {
  author: Author
  content: string
  coverImage: string
  date: string
  headTitle: string
  isTIL?: boolean
  ogImageUrl?: string
  title: string
  children?: ReactNode
}

const EntryArticle = ({
  author,
  children,
  content,
  coverImage,
  date,
  headTitle,
  isTIL,
  ogImageUrl,
  title,
}: Props) => (
  <article className="mb-32">
    <Head>
      <title>{headTitle}</title>
      {ogImageUrl && (
        <meta key="og:image" property="og:image" content={ogImageUrl} />
      )}
    </Head>
    <PostHeader
      title={title}
      coverImage={coverImage}
      date={date}
      author={author}
      isTIL={isTIL}
    />
    <PostBody content={content} />
    {children}
    <hr className="mx-auto mt-12 w-1/3 border-t border-dashed border-brand" />
    <Webring />
  </article>
)

export default EntryArticle
