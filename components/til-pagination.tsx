import Link from 'next/link'
import type TILType from '../interfaces/til'

type Props = {
  previousTIL: TILType | null
  nextTIL: TILType | null
}

const TILPagination = ({ previousTIL, nextTIL }: Props) => {
  return (
    <nav className="flex justify-between items-center mt-10 pt-6 max-w-2xl mx-auto">
      <div className="flex-1">
        {previousTIL && (
          <Link
            href={`/til/${previousTIL.slug}`}
            className="group flex flex-col"
          >
            <span className="max-w-[200px] truncate text-sm text-stone-600 transition-colors group-hover:text-stone-950 group-hover:underline dark:text-stone-300 dark:group-hover:text-white">
              ← {previousTIL.title || previousTIL.excerpt}
            </span>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {nextTIL && (
          <Link
            href={`/til/${nextTIL.slug}`}
            className="group flex flex-col items-end"
          >
            <span className="max-w-[200px] truncate text-sm text-stone-600 transition-colors group-hover:text-stone-950 group-hover:underline dark:text-stone-300 dark:group-hover:text-white">
              {nextTIL.title || nextTIL.excerpt} →
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default TILPagination
