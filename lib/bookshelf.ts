import http from 'node:http'
import https from 'node:https'

import Bookshelf from '../interfaces/bookshelf'

const DEFAULT_BOOKSHELF_API_URL =
  'https://hardcover.guava.nyc/api/bookshelf'

function requestBookshelf(apiURL: string): Promise<Bookshelf> {
  const url = new URL(apiURL)
  const transport = url.protocol === 'https:' ? https : http

  return new Promise((resolve, reject) => {
    const request = transport.get(
      url,
      {
        family: 4,
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'identity',
        },
      },
      (response) => {
        const chunks: Buffer[] = []

        response.on('data', (chunk: Buffer) => chunks.push(chunk))
        response.on('end', () => {
          const statusCode = response.statusCode ?? 500
          if (statusCode < 200 || statusCode >= 300) {
            reject(new Error(`Bookshelf API returned HTTP ${statusCode}`))
            return
          }

          try {
            resolve(
              JSON.parse(Buffer.concat(chunks).toString('utf8')) as Bookshelf,
            )
          } catch (error) {
            reject(error)
          }
        })
      },
    )

    request.setTimeout(10_000, () => {
      request.destroy(new Error('Bookshelf API request timed out'))
    })
    request.on('error', reject)
  })
}

export async function getBookshelf(): Promise<Bookshelf> {
  return requestBookshelf(
    process.env.BOOKSHELF_API_URL || DEFAULT_BOOKSHELF_API_URL,
  )
}
