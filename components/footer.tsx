import Container from './container'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <a className="hover:underline" href="/">~/</a>
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <Link href="/about">
              <a className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
                About
              </a>
            </Link>
            <a
              target="_blank"
              href="https://github.com/dviramontes"
              className="mx-3 font-bold hover:underline"
            >
              GitHub
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/davidviramontes/"
              className="mx-3 font-bold hover:underline"
            >
              Linkedin
            </a>
            <a
              target="_blank"
              href="https://twitter.com/dviramontes_"
              className="mx-3 font-bold hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
