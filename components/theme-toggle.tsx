import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const THEME_STORAGE_KEY = 'theme'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    const initialTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : getPreferredTheme()

    setTheme(initialTheme)
    applyTheme(initialTheme)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) {
        return
      }

      const nextTheme = mediaQuery.matches ? 'dark' : 'light'
      setTheme(nextTheme)
      applyTheme(nextTheme)
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const value = {
    theme,
    toggleTheme: () => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark'
      setTheme(nextTheme)
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
      applyTheme(nextTheme)
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/90 px-3 py-2 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur transition-colors hover:border-stone-400 hover:text-stone-950 dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:text-white"
    >
      <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
    </button>
  )
}
