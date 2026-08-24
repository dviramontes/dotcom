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
        <li key={book.id} className="flex items-start gap-4 px-5 py-5 sm:px-6">
          <span className="mt-1 w-6 shrink-0 text-right text-sm text-stone-400 dark:text-stone-500">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
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
          <div className="shrink-0 text-right text-sm text-stone-500 dark:text-stone-400">
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
