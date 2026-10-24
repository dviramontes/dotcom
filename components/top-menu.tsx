import Link from 'next/link'
import Container from './container'
import { navigationLinks } from './navigation-links'
import { ThemeToggle } from './theme-toggle'

const TopMenu = () => (
  <header className="border-b border-stone-300/70 dark:border-stone-800">
    <Container>
      <div className="flex items-start gap-4 py-4 sm:items-center">
        <nav aria-label="Main navigation" className="flex-1">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                href="/"
                aria-label="Home"
                className="inline-block py-2 text-sm font-bold underline-offset-4 hover:underline focus-visible:underline"
              >
                ~/
              </Link>
            </li>
            {navigationLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="inline-block py-2 text-sm font-bold underline-offset-4 hover:underline focus-visible:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </Container>
  </header>
)

export default TopMenu
