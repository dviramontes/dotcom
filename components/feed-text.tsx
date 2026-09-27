export default function FeedText({ text }: { text: string }) {
  const blocks: { quote: boolean; lines: string[] }[] = []

  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*>[ \t]?(.*)$/)
    const quote = Boolean(match)
    const content = match ? match[1] : line
    const previous = blocks[blocks.length - 1]
    if (previous && previous.quote === quote) {
      previous.lines.push(content)
    } else {
      blocks.push({ quote, lines: [content] })
    }
  }

  return (
    <div className="space-y-4 whitespace-pre-wrap break-words leading-relaxed text-stone-800 dark:text-stone-100">
      {blocks.map((block, index) => {
        const content = block.lines.join('\n').trim()
        if (!content) return null
        return block.quote ? (
          <blockquote
            key={index}
            className="border-l-2 border-brand pl-4 italic text-stone-600 dark:text-stone-300"
          >
            {content}
          </blockquote>
        ) : (
          <p key={index}>{content}</p>
        )
      })}
    </div>
  )
}
