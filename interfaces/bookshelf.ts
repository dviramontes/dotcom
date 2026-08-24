export type Book = {
  id: number
  title: string
  slug: string
  url: string
  coverURL: string | null
  authors: string[]
  rating: number | null
  readCount: number
  latestReadDate: string | null
}

type Bookshelf = {
  username: string
  reading: Book[]
  read: Book[]
}

export default Bookshelf
