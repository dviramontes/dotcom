export type FeedLink = {
  url: string
  title: string
  hostname: string
}

export type FeedPost = {
  uri: string
  url: string
  text: string
  date: string
  author: string
  repost: boolean
  links: FeedLink[]
}
