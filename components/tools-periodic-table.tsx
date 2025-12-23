import { useEffect, useState } from 'react'
import Link from 'next/link'

type Tool = {
  name: string
  slug: string
  description: string
  url: string
}

type Props = {
  size?: 'default' | 'small'
  showTitle?: boolean
}

const TOOLS_JSON_URL = 'https://dviramontes.github.io/tools/tools.json'

function getElementSymbol(name: string): string {
  const words = name.split(' ').filter((w) => w.length > 0)
  const first = words[0]?.[0]?.toUpperCase() || '?'
  const second = words[1]?.[0]?.toLowerCase() || ''
  return first + second
}

const ToolsPeriodicTable = ({ size = 'default', showTitle = true }: Props) => {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(TOOLS_JSON_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setTools(data.tools || data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return null
  }

  if (tools.length === 0) {
    return null
  }

  const isSmall = size === 'small'

  return (
    <div className={isSmall ? 'mb-6' : 'mt-8 mb-12'}>
      {showTitle && (
        <h2
          className={`font-bold text-gray-800 ${
            isSmall ? 'text-lg mb-3' : 'text-2xl mb-6'
          }`}
        >
          <Link href="/tools">Tools</Link>
        </h2>
      )}
      <div className={`flex flex-wrap ${isSmall ? 'gap-1.5' : 'gap-3'}`}>
        {tools.map((tool, index) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group relative"
            title={tool.name}
          >
            <div
              className={`bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 rounded flex flex-col items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 ${
                isSmall
                  ? 'w-8 h-9 p-0.5 rounded-sm'
                  : 'w-16 h-18 p-2 rounded-lg'
              }`}
            >
              <span
                className={`text-emerald-100 font-mono ${
                  isSmall ? 'text-[5px]' : 'text-[10px]'
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`font-bold text-white leading-none ${
                  isSmall ? 'text-xs' : 'text-2xl'
                }`}
              >
                {getElementSymbol(tool.name)}
              </span>
              {!isSmall && (
                <span className="text-[8px] text-emerald-100 text-center leading-tight mt-1 truncate w-full px-1">
                  {tool.name.split(' ')[0]}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ToolsPeriodicTable
