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
            <span className="text-sm text-neutral-700 group-hover:text-black group-hover:underline transition-colors truncate max-w-[200px]">
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
            <span className="text-sm text-neutral-700 group-hover:text-black group-hover:underline transition-colors truncate max-w-[200px]">
              {nextTIL.title || nextTIL.excerpt} →
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default TILPagination
