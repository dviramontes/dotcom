import Link from 'next/link'
import { Book } from '../interfaces/bookshelf'
import BookList from './book-list'

type Props = {
  books: Book[]
}

const BookshelfPreview = ({ books }: Props) => {
  if (books.length === 0) {
    return null
  }

  return (
    <section className="mb-12 mt-8 max-w-[1300px]">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
          <Link href="/bookshelf">Bookshelf</Link>
        </h2>
        <Link
          href="/bookshelf"
          className="text-sm font-medium text-brand hover:underline"
        >
          View all →
        </Link>
      </div>
      <BookList books={books} emptyMessage="No books are marked as read yet." />
    </section>
  )
}

export default BookshelfPreview
