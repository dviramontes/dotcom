import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Header from '../../components/header'
import PostTitle from '../../components/post-title'

type Tool = {
  name: string
  description: string
  slug: string
  url: string
}

const TOOLS_JSON_URL = 'https://dviramontes.github.io/tools/tools.json'

function ToolPage(): JSX.Element {
  const router = useRouter()
  const { slug } = router.query
  const [tool, setTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    fetch(TOOLS_JSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tools')
        return res.json()
      })
      .then((data) => {
        const tools = data.tools || data
        const found = tools.find((t: Tool) => t.slug === slug)
        if (found) {
          setTool(found)
        } else {
          setError('Tool not found')
        }
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  return (
    <Layout preview={false}>
      <Container>
        <Header />
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {tool && (
          <>
            <Link
              href="/tools"
              className="text-gray-500 hover:text-gray-700 mb-4 inline-block"
            >
              ← Back to Tools
            </Link>
            <PostTitle>{tool.name}</PostTitle>
            <p className="text-lg leading-relaxed mb-6 w-full max-w-2xl break-words overflow-hidden">
              {tool.description}
            </p>
            <div className="flex justify-end">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2 bg-black text-white font-medium tracking-wide text-sm uppercase hover:shadow-md hover:translate-y-[-2px] transition-all duration-200"
              >
                visit tool
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
            <div className="mb-16">
              <iframe
                src={tool.url}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg"
                style={{ height: '80vh' }}
                title={tool.name}
              />
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default ToolPage
