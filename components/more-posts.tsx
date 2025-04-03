import PostPreview from './post-preview'
import type Post from '../interfaces/post'
import type TILType from '../interfaces/til'

type Props = {
  posts: (Post | TILType)[]
  basePath: string
}

const MorePosts = ({ posts, basePath }: Props) => {
  return (
    <article>
      <section>
        <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {posts.map((post) => (
            <PostPreview
              key={post.slug}
              basePath={basePath}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </section>
    </article>
  )
}

export default MorePosts
