type Block = { quote: boolean; lines: string[] }

// Only a lone chevron followed by a space marks a quoted line, so REPL prompts
// like ">>> import this" and comparisons like ">= 3" stay as ordinary text.
const QUOTE_LINE = /^>(?:$| (.*))/

function toBlocks(text: string): Block[] {
  const blocks: Block[] = []
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(QUOTE_LINE)
    const quote = Boolean(match)
    const content = match ? match[1] ?? '' : line
    const previous = blocks[blocks.length - 1]
    if (previous && previous.quote === quote) {
      previous.lines.push(content)
    } else {
      blocks.push({ quote, lines: [content] })
    }
  }
  return blocks
}

function paragraphs(lines: string[]): string[] {
  return lines
    .join('\n')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export default function FeedText({ text }: { text: string }) {
  return (
    <div className="space-y-4 whitespace-pre-wrap break-words leading-relaxed text-stone-800 dark:text-stone-100">
      {toBlocks(text).map((block, index) =>
        block.quote ? (
          <blockquote
            key={index}
            className="border-l-2 border-brand pl-4 italic text-stone-600 dark:text-stone-300"
          >
            {block.lines.join('\n').trim()}
          </blockquote>
        ) : (
          paragraphs(block.lines).map((paragraph, i) => (
            <p key={`${index}-${i}`}>{paragraph}</p>
          ))
        ),
      )}
    </div>
  )
}
