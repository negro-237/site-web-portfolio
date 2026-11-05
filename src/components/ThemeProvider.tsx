import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function savedTheme(): Theme {
  try {
    return localStorage.getItem('negro-services-theme') === 'light'
      ? 'light'
      : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setTheme(savedTheme())
    setReady(true)
  }, [])
  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    root.style.colorScheme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0d0e0e' : '#f7f6f2')
    try {
      localStorage.setItem('negro-services-theme', theme)
    } catch {
      /* Theme switching also works without storage. */
    }
  }, [theme, ready])
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () =>
          setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
