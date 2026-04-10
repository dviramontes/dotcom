import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`${markdownStyles['markdown']} !text-stone-800 dark:!text-stone-200 dark:[&_h1]:!text-stone-100 dark:[&_h2]:!text-stone-100 dark:[&_h3]:!text-stone-100`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody
