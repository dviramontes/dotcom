import { ReactNode } from 'react'
import TILTitle from './til-title'

type Props = {
  children?: ReactNode
  isTIL?: boolean
}

const PostTitle = ({ children, isTIL }: Props) => {
  if (isTIL) {
    return <TILTitle>{children}</TILTitle>
  }

  const baseClasses =
    'font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left'
  const defaultSizeClasses = 'text-5xl md:text-7xl lg:text-8xl'

  return <h1 className={`${baseClasses} ${defaultSizeClasses}`}>{children}</h1>
}

export default PostTitle
