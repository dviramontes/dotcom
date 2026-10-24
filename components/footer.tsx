import { navigationLinks } from './navigation-links'
import Container from './container'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-stone-300/70 bg-[#171717] text-white dark:border-stone-800 dark:bg-black">
      <Container>
        <div className="py-10 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <Link href="/">
              <span className="hover:underline">~/</span>
            </Link>
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/3">
            <div className="grid grid-cols-3 gap-y-6 gap-x-2 lg:flex lg:flex-row w-full lg:space-x-2 items-center px-4 lg:px-0">
              {navigationLinks.map(({ href, label }) => (
                <div
                  key={label}
                  className="w-full lg:w-auto my-2 lg:my-0 text-center"
                >
                  <Link href={href}>
                    <span
                      className={
                        label === 'About'
                          ? 'border border-white bg-stone-950 px-3 py-3 font-bold text-white transition-colors duration-200 hover:bg-stone-800 lg:px-8'
                          : 'font-bold hover:underline'
                      }
                    >
                      {label}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
