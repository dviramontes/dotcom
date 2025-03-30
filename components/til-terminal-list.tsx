import Link from 'next/link'
import { useState, useEffect } from 'react'
import TILType from '../interfaces/til'

type Props = {
  entries: TILType[]
}

const TILTerminalList = ({ entries }: Props) => {
  const [formattedEntries, setFormattedEntries] = useState<
    { name: string; size: string; date: string }[]
  >([])

  useEffect(() => {
    // Format entries into terminal-style listing
    const formatted = entries.map((entry) => {
      // Extract date from filename (assuming format YYYYMMDD.md)
      const date = entry.date

      // Format size (mock data for now, could be replaced with actual size)
      const sizeKB = Math.round((entry.content?.length || 0) / 10) / 100
      const size = `${sizeKB > 0 ? sizeKB : 1}.${
        Math.floor(Math.random() * 9) + 1
      } KB`

      return {
        name: `${entry.slug}.md`,
        size,
        date,
      }
    })

    setFormattedEntries(formatted)
  }, [entries])

  return (
    <div className="mt-8 mb-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Today I Learned</h2>
      <div className="bg-gray-900 text-gray-200 p-4 rounded-md font-mono text-sm overflow-x-auto">
        <div className="font-bold mb-2 text-gray-400">$ ls -l _til</div>
        {formattedEntries.length > 0 ? (
          formattedEntries.map((entry, index) => (
            <Link
              key={index}
              href={`/til/${entry.name.replace('.md', '')}`}
              className="block hover:bg-gray-800 hover:text-white px-2 py-1 rounded transition-colors duration-150"
            >
              <div className="flex flex-wrap">
                <span className="text-blue-400 mr-2">.rw-r--r--</span>
                <span className="text-green-400 mr-2">davm</span>
                <span className="text-yellow-400 mr-2">staff</span>
                <span className="text-purple-400 mr-2">{entry.size}</span>
                <span className="text-white underline decoration-dotted decoration-gray-500 hover:decoration-white">
                  {entry.name}
                </span>
                <span className="ml-2 text-gray-500 text-xs">[til]</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-500">No TIL entries found</div>
        )}
      </div>
    </div>
  )
}

export default TILTerminalList
