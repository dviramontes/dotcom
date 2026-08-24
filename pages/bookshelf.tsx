import { GetStaticProps } from 'next'
import Head from 'next/head'
import BookList from '../components/book-list'
import Container from '../components/container'
import Header from '../components/header'
import Layout from '../components/layout'
import PostTitle from '../components/post-title'
import Bookshelf from '../interfaces/bookshelf'
import { getBookshelf } from '../lib/bookshelf'

type Props = {
  bookshelf: Bookshelf | null
  error: string | null
}

function BookshelfPage({ bookshelf, error }: Props): JSX.Element {
  return (
    <Layout preview={false}>
      <Head>
        <title>Bookshelf | dviramontes.com</title>
        <meta
          name="description"
          content="Books David is reading and has read."
        />
      </Head>
      <Container>
        <Header />
        <PostTitle>Bookshelf</PostTitle>
        <article className="mb-32">
          <div className="mx-auto max-w-2xl">
            <p className="mb-10 text-lg leading-relaxed">
              Books I&apos;m reading and some I&apos;ve read, synced from{' '}
              <a
                className="text-brand hover:underline"
                href={
                  bookshelf
                    ? `https://hardcover.app/@${bookshelf.username}`
                    : 'https://hardcover.app'
                }
                target="_blank"
                rel="noreferrer"
              >
                Hardcover
              </a>
              .
            </p>

            {error ? (
              <p className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                {error}
              </p>
            ) : (
              bookshelf && (
                <div className="space-y-12">
                  <section>
                    <h2 className="mb-4 text-2xl font-bold text-stone-800 dark:text-stone-100">
                      Reading
                    </h2>
                    <BookList
                      books={bookshelf.reading}
                      emptyMessage="No books are marked as currently reading."
                    />
                  </section>

                  <section>
                    <h2 className="mb-4 text-2xl font-bold text-stone-800 dark:text-stone-100">
                      Read
                    </h2>
                    <BookList
                      books={bookshelf.read}
                      emptyMessage="No books are marked as read yet."
                    />
                  </section>
                </div>
              )
            )}
          </div>
        </article>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    return {
      props: {
        bookshelf: await getBookshelf(),
        error: null,
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Could not load bookshelf', error)
    return {
      props: {
        bookshelf: null,
        error: 'The bookshelf could not be loaded. Please try again later.',
      },
      revalidate: 300,
    }
  }
}

export default BookshelfPage
