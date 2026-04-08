import Link from 'next/link'
import TILType from '../interfaces/til'

type Props = {
  entries: TILType[]
  limit?: number
}

const TILTerminalList = ({ entries, limit }: Props) => {
  const displayEntries = limit ? entries.slice(0, limit) : entries
  const hasMore = limit && entries.length > limit
  const formatEntry = (entry: TILType) => ({
    name: `${entry.slug}.md`,
    size: `${Math.max(
      1,
      Math.round((entry.content?.length || 0) / 100) / 10,
    ).toFixed(1)} KB`,
    date: entry.date,
    excerpt: entry.excerpt,
  })

  return (
    <div className="mt-8 mb-12 max-w-[1300px]">
      <h2 className="mb-4 text-2xl font-bold text-stone-800 dark:text-stone-100">
        <Link href="/til">Today I Learned</Link>
      </h2>
      <div className="overflow-x-auto rounded-md border border-[#2f2926] bg-[#1c1917] p-4 font-mono text-sm text-[#f5f5f4] shadow-sm dark:border-[#44403c]">
        <div className="mb-2 font-bold text-[#b8b0aa]">$ ls til</div>
        {displayEntries.length > 0 ? (
          displayEntries.map((entry, index) => {
            const formatted = formatEntry(entry)
            return (
              <Link
                key={index}
                href={`/til/${entry.slug}`}
                className="block rounded px-2 py-1 transition-colors duration-150 hover:bg-[#2f2926] hover:text-white"
              >
                <div className="flex flex-nowrap items-center">
                  <span className="text-blue-400 mr-2 hidden sm:inline">
                    .rw-r--r--
                  </span>
                  <span className="text-green-400 mr-2 hidden sm:inline">
                    dv
                  </span>
                  <span className="text-purple-400 mr-2 hidden sm:inline">
                    {formatted.size}
                  </span>
                  <span className="mr-2 flex-shrink-0 text-[#b8b0aa] underline decoration-dotted decoration-[#6b625d] hover:decoration-white">
                    {formatted.name}
                  </span>
                  <span className="ml-2 truncate text-sm font-medium text-[#f5f5f4]">
                    {formatted.excerpt}
                  </span>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="text-[#8f8680] dark:text-stone-400">
            No TIL entries found
          </div>
        )}
        {hasMore && (
          <Link
            href="/til"
            className="mt-1 block px-2 py-1 text-[#b8b0aa] hover:text-white"
          >
            ... [show more]
          </Link>
        )}
      </div>
    </div>
  )
}

export default TILTerminalList
