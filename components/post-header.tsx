import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  isTIL?: boolean
}

const PostHeader = ({ title, coverImage, date, author, isTIL }: Props) => {
  return (
    <>
      <PostTitle isTIL={isTIL}>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      {coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} src={coverImage} />
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="flex">
          <div className="mb-6 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostHeader
