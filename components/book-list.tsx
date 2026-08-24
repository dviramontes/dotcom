import Image from 'next/image'
import { Book } from '../interfaces/bookshelf'

type Props = {
  books: Book[]
  emptyMessage: string
}

const readDateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})

function formatReadDate(date: string): string {
  return readDateFormatter.format(new Date(`${date}T00:00:00Z`))
}

const BookList = ({ books, emptyMessage }: Props) => {
  if (books.length === 0) {
    return (
      <p className="rounded-lg border border-stone-300/80 bg-white/60 p-6 text-stone-600 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-300">
        {emptyMessage}
      </p>
    )
  }

  return (
    <ol className="divide-y divide-stone-300/80 overflow-hidden rounded-lg border border-stone-300/80 bg-white/60 dark:divide-stone-700 dark:border-stone-700 dark:bg-stone-900/50">
      {books.map((book, index) => (
        <li
          key={book.id}
          className="grid grid-cols-[1.5rem_3rem_minmax(0,1fr)] items-start gap-x-4 gap-y-2 px-5 py-5 sm:grid-cols-[1.5rem_3.5rem_minmax(0,1fr)_auto] sm:px-6"
        >
          <span className="col-start-1 row-start-1 mt-1 text-right text-sm text-stone-400 dark:text-stone-500">
            {index + 1}
          </span>
          <a
            aria-label={`View ${book.title} on Hardcover`}
            className="col-start-2 row-span-2 row-start-1 aspect-[2/3] overflow-hidden rounded-sm bg-stone-200 shadow-sm ring-1 ring-stone-950/10 transition-transform hover:-translate-y-0.5 dark:bg-stone-800 dark:ring-white/10"
            href={book.url}
            target="_blank"
            rel="noreferrer"
          >
            {book.coverURL ? (
              <Image
                alt=""
                className="h-full w-full object-cover"
                height={84}
                src={book.coverURL}
                unoptimized
                width={56}
              />
            ) : (
              <span className="flex h-full items-center justify-center text-stone-400 dark:text-stone-600">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5A2.25 2.25 0 0 1 6.75 17.25H19.5m-15 2.25V5.25A2.25 2.25 0 0 1 6.75 3H19.5v14.25M4.5 19.5A1.5 1.5 0 0 0 6 21h13.5v-3.75"
                  />
                </svg>
              </span>
            )}
          </a>
          <div className="col-start-3 row-start-1 min-w-0">
            <a
              className="font-medium text-stone-900 transition-colors hover:text-brand dark:text-stone-100 dark:hover:text-brand"
              href={book.url}
              target="_blank"
              rel="noreferrer"
            >
              {book.title}
            </a>
            {book.authors.length > 0 && (
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {book.authors.join(', ')}
              </p>
            )}
          </div>
          <div className="col-start-3 row-start-2 flex flex-wrap gap-x-3 text-sm text-stone-500 dark:text-stone-400 sm:col-start-4 sm:row-start-1 sm:block sm:text-right">
            {book.latestReadDate && (
              <p>Read {formatReadDate(book.latestReadDate)}</p>
            )}
            {book.rating !== null && <p>{book.rating.toFixed(1)} / 5</p>}
            {book.readCount > 1 && <p>Read {book.readCount} times</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default BookList
