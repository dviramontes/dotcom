import Footer from './footer'
import Meta from './meta'
import { ThemeToggle } from './theme-toggle'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-stone-100 text-stone-950 transition-colors duration-300 dark:bg-[#0f1115] dark:text-stone-100">
        <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6">
          <ThemeToggle />
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
