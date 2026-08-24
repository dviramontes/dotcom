import { CSSProperties, useEffect, useState } from 'react'
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

type ElementTileStyle = CSSProperties & {
  '--element-hue': string
}

function getElementTileStyle(index: number, total: number): ElementTileStyle {
  const progress = total > 1 ? index / (total - 1) : 0

  // Move smoothly from warm metals through metalloids to cool nonmetals.
  return { '--element-hue': `${Math.round(12 + progress * 205)}deg` }
}

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
          className={`font-bold text-stone-800 dark:text-stone-100 ${
            isSmall ? 'text-lg mb-3' : 'text-2xl mb-6'
          }`}
        >
          <Link href="/tools">Tools</Link>
        </h2>
      )}
      <div
        className={`flex flex-wrap mx-[5%] origin-top-left ${
          isSmall ? 'scale-75 gap-2 sm:scale-100 sm:gap-1.5' : 'gap-3'
        }`}
      >
        {tools.map((tool, index) => {
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group relative"
              title={tool.name}
            >
              <div
                className={`tool-element rounded flex flex-col items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 ${
                  isSmall
                    ? 'w-10 h-11 p-1 rounded-md'
                    : 'w-16 h-18 p-2 rounded-lg'
                }`}
                style={getElementTileStyle(index, tools.length)}
              >
                <span
                  className={`text-white/80 font-mono ${
                    isSmall ? 'text-[6px]' : 'text-[10px]'
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`font-bold text-white leading-none ${
                    isSmall ? 'text-sm' : 'text-2xl'
                  }`}
                >
                  {getElementSymbol(tool.name)}
                </span>
                {!isSmall && (
                  <span
                    className="text-[8px] text-white/80 text-center leading-tight mt-1 truncate w-full px-1"
                  >
                    {tool.name.split(' ')[0]}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ToolsPeriodicTable
