import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import Container from '../components/container'
import Header from '../components/header'
import PostTitle from '../components/post-title'
import ToolsPeriodicTable from '../components/tools-periodic-table'

type Tool = {
  name: string
  description: string
  slug: string
  url: string
}

const TOOLS_JSON_URL = 'https://dviramontes.github.io/tools/tools.json'

function Tools(): JSX.Element {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(TOOLS_JSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tools')
        return res.json()
      })
      .then((data) => {
        setTools(data.tools || data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <Layout preview={false}>
      <Container>
        <Header />
        <PostTitle>Tools</PostTitle>
        <article className="mb-32">
          <div className="max-w-2xl mx-auto">
            <ToolsPeriodicTable size="small" showTitle={false} />
            <p className="text-lg leading-relaxed mb-8">
              Small, self-contained, single-purpose tools. Each one is a
              standalone HTML file with no dependencies.
            </p>
            {loading && (
              <p className="text-stone-500 dark:text-stone-400">
                Loading tools...
              </p>
            )}
            {error && (
              <p className="text-red-500">Error loading tools: {error}</p>
            )}
            <div className="space-y-6">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="block rounded-lg border border-stone-300/80 bg-white/60 p-6 transition-colors hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900/50 dark:hover:border-stone-500"
                >
                  <h2 className="text-xl font-semibold mb-2 text-[#458c70]">
                    {tool.name}
                  </h2>
                  <p className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </Container>
    </Layout>
  )
}

export default Tools
