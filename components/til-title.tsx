import { ReactNode } from 'react'
import { titleStyles } from './title-styles'

type Props = {
  children?: ReactNode
}

const TILTitle = ({ children }: Props) => {
  return (
    <h1 className={`${titleStyles} mb-12`}>
      <span className="text-stone-800 dark:text-stone-100">TIL: </span>
      <span className="text-brand">{children}</span>
    </h1>
  )
}

export default TILTitle
