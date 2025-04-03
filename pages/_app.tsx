import { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/index.css'
import '../styles/prism.css'

// Import Prism and the languages you need
import Prism from 'prismjs'
// Core languages
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
// Additional languages based on your blog content
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-elixir'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-yaml'
// Plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Prism
    Prism.highlightAll()
  }, [])

  return <Component {...pageProps} />
}
