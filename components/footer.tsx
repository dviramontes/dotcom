import Container from './container'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-10 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <Link href="/">
              <span className="hover:underline">~/</span>
            </Link>
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/3">
            <div className="grid grid-cols-3 gap-y-6 gap-x-2 lg:flex lg:flex-row w-full lg:space-x-2 items-center px-4 lg:px-0">
              <div className="w-full lg:w-auto my-2 lg:my-0 text-center">
                <Link href="/about">
                  <span className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-8 lg:px-8 duration-200 transition-colors">
                    About
                  </span>
                </Link>
              </div>
              <div className="w-full lg:w-auto my-2 lg:my-0 text-center">
                <Link href="/">
                  <span className="font-bold hover:underline">Blog</span>
                </Link>
              </div>
              <div className="w-full lg:w-auto my-2 lg:my-0 text-center">
                <Link href="/til">
                  <span className="font-bold hover:underline">TIL</span>
                </Link>
              </div>
              <div className="w-full lg:w-auto my-2 lg:my-0 text-center">
                <a
                  target="_blank"
                  href="https://github.com/dviramontes"
                  className="font-bold hover:underline"
                >
                  GitHub
                </a>
              </div>
              <div className="w-full lg:w-auto my-2 lg:my-0 text-center">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/davidviramontes/"
                  className="font-bold hover:underline"
                >
                  Linkedin
                </a>
              </div>
              <div className="w-full lg:w-auto my-2 lg:my-0 text-center">
                <a
                  target="_blank"
                  href="https://dviramontes.bsky.social/"
                  className="font-bold hover:underline"
                >
                  Bluesky
                </a>
              </div>
              <div className="w-full lg:w-auto my-2 lg:my-0 text-center">
                <Link href="/feed.xml">
                  <span className="font-bold hover:underline">RSS</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
