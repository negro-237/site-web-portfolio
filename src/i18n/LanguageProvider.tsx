import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { Locale, TranslationKey } from './translations'
import { translations } from './translations'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem('locale')
    if (saved === 'fr' || saved === 'en') return saved
  } catch {
    /* Use the default language when storage is unavailable. */
  }
  return 'fr'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem('locale', l)
    } catch {
      /* Language switching remains available without storage. */
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[key]?.[locale] ?? key
    },
    [locale],
  )

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
