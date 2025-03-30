import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')
const tilDirectory: string = join(process.cwd(), '_til')

type Items = {
  [key: string]: string
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getTILSlugs() {
  return fs.readdirSync(tilDirectory)
}

export function getEntryBySlug(
  type: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath =
    type === 'posts'
      ? join(postsDirectory, `${realSlug}.md`)
      : join(tilDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllEntries(type: string, fields: string[] = []) {
  if (type === 'posts') {
    return (
      getPostSlugs()
        .map((slug) => getEntryBySlug('posts', slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    )
  }

  return (
    getTILSlugs()
      .map((slug) => getEntryBySlug('til', slug, fields))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  )
}
