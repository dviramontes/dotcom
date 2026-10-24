import Footer from './footer'
import Meta from './meta'
import TopMenu from './top-menu'
import { useRouter } from 'next/router'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  const { pathname } = useRouter()

  return (
    <>
      <Meta />
      <div className="min-h-screen bg-stone-200 text-stone-950 transition-colors duration-300 dark:bg-[#0f1115] dark:text-stone-100">
        <TopMenu />
        <main className={pathname === '/' ? undefined : 'pt-8 md:pt-12'}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
