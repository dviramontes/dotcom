import { NextApiRequest, NextApiResponse } from 'next'
import { getAllEntries } from '../lib/api'
import type PostType from '../interfaces/post'
import type TILType from '../interfaces/til'

const SITE_URL = 'https://dviramontes.com'

function generateRss(posts: PostType[], tils: TILType[]) {
  const allEntries = [
    ...posts.map((post) => ({ ...post, type: 'post' })),
    ...tils.map((til) => ({ ...til, type: 'til' })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>dviramontes.com Blog</title>
    <link>${SITE_URL}</link>
    <description>Blog posts and Today I Learned entries from dviramontes.com</description>
    <language>en-us</language>
    ${allEntries
      .map(
        (entry) => `
      <item>
        <title>${entry.title}</title>
        <link>${SITE_URL}/${entry.type}/${entry.slug}</link>
        <guid>${SITE_URL}/${entry.type}/${entry.slug}</guid>
        <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
        <description><![CDATA[${entry.excerpt}]]></description>
        ${
          entry.coverImage
            ? `<enclosure url="${entry.coverImage}" type="image/jpeg" />`
            : ''
        }
      </item>
    `,
      )
      .join('')}
  </channel>
</rss>`
}

export default function Feed() {
  return null
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const posts = getAllEntries('posts', [
    'title',
    'date',
    'slug',
    'excerpt',
    'coverImage',
  ]) as unknown as PostType[]

  const tils = getAllEntries('til', [
    'title',
    'date',
    'slug',
    'excerpt',
    'coverImage',
  ]) as unknown as TILType[]

  const rss = generateRss(posts, tils)

  res.setHeader('Content-Type', 'application/xml')
  res.write(rss)
  res.end()

  return {
    props: {},
  }
}
