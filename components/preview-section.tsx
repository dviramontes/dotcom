import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  title: string
  href: string
  linkText: string
  children: ReactNode
}

export default function PreviewSection({
  title,
  href,
  linkText,
  children,
}: Props) {
  return (
    <section className="mb-12 mt-8 max-w-[1300px]">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
          <Link href={href}>{title}</Link>
        </h2>
        <Link
          href={href}
          className="text-sm font-medium text-brand hover:underline"
        >
          {linkText} →
        </Link>
      </div>
      {children}
    </section>
  )
}
