import Container from './container'
import cn from 'classnames'
import { BLOG_PATH } from '../lib/constants'

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn('border-b', {
        'border-stone-800 bg-stone-800 text-white': preview,
        'border-stone-200 bg-stone-100 text-stone-800': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline transition-colors duration-200 hover:text-teal-300"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              <a
                rel="me"
                href={`https://github.com/dviramontes/${BLOG_PATH}`}
                className="underline transition-colors duration-200 hover:text-brand"
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Alert
