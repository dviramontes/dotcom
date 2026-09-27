import { Book } from '../interfaces/bookshelf'
import BookList from './book-list'
import PreviewSection from './preview-section'

type Props = {
  books: Book[]
}

const BookshelfPreview = ({ books }: Props) => {
  if (books.length === 0) {
    return null
  }

  return (
    <PreviewSection title="Bookshelf" href="/bookshelf" linkText="View all">
      <BookList books={books} emptyMessage="No books are marked as read yet." />
    </PreviewSection>
  )
}

export default BookshelfPreview
