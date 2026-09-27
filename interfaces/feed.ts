export type FeedPost = {
  uri: string
  url: string
  text: string
  date: string
  author: string
  repost: boolean
  links: { url: string; title: string }[]
}
