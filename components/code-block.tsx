import React, { useEffect } from 'react'
import Prism from 'prismjs'

type Props = {
  language: string
  value: string
}

const CodeBlock = ({ language, value }: Props) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [value])

  return (
    <pre className={`language-${language}`}>
      <code className={`language-${language}`}>{value}</code>
    </pre>
  )
}

export default CodeBlock
