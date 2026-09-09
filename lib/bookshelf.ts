import Bookshelf from '../interfaces/bookshelf'

const DEFAULT_BOOKSHELF_API_URL = 'https://hardcover.guava.nyc/api/bookshelf'

async function requestBookshelf(apiURL: string): Promise<Bookshelf> {
  const response = await fetch(apiURL, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Bookshelf API returned HTTP ${response.status}`)
  }

  return (await response.json()) as Bookshelf
}

export async function getBookshelf(): Promise<Bookshelf> {
  return requestBookshelf(
    process.env.BOOKSHELF_API_URL || DEFAULT_BOOKSHELF_API_URL,
  )
}
