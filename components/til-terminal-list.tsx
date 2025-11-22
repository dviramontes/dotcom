import Link from 'next/link'
import TILType from '../interfaces/til'

type Props = {
  entries: TILType[]
}

const TILTerminalList = ({ entries }: Props) => {
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <Link href="/til">Today I Learned</Link>
      </h2>
      <div className="bg-gray-900 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
        <div className="font-bold mb-2 text-gray-400">$ ls til</div>
        {entries.length > 0 ? (
          entries.map((entry, index) => {
            const formatted = formatEntry(entry)
            return (
              <Link
                key={index}
                href={`/til/${entry.slug}`}
                className="block hover:bg-gray-800 hover:text-white px-2 py-1 rounded transition-colors duration-150"
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
                  <span className="text-gray-400 mr-2 underline decoration-dotted decoration-gray-500 hover:decoration-white flex-shrink-0">
                    {formatted.name}
                  </span>
                  <span className="ml-2 text-gray-200 font-medium text-sm truncate">
                    {formatted.excerpt}
                  </span>
                </div>
              </Link>
            )
          })
        ) : (
          <div className="text-gray-500">No TIL entries found</div>
        )}
      </div>
    </div>
  )
}

export default TILTerminalList
