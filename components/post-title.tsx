import { ReactNode } from 'react'
import TILTitle from './til-title'
import { titleStyles } from './title-styles'

type Props = {
  children?: ReactNode
  isTIL?: boolean
}

const PostTitle = ({ children, isTIL }: Props) => {
  if (isTIL) {
    return <TILTitle>{children}</TILTitle>
  }

  return <h1 className={`${titleStyles} mb-12`}>{children}</h1>
}

export default PostTitle
