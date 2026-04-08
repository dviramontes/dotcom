import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const TILTitle = ({ children }: Props) => {
  const baseClasses =
    'font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left'
  const tilSizeClasses = 'text-4xl md:text-5xl lg:text-6xl'

  return (
    <h1 className={`${baseClasses} ${tilSizeClasses}`}>
      <span className="text-stone-800 dark:text-stone-100">TIL: </span>
      <span className="text-brand">{children}</span>
    </h1>
  )
}

export default TILTitle
