import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Locale, TranslationKey } from "./translations";
import { translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectLocale(): Locale {
  // Check localStorage first
  const saved = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
  if (saved === "fr" || saved === "en") return saved;

  // Detect browser language
  if (typeof navigator !== "undefined") {
    const lang = navigator.language || (navigator as any).userLanguage || "";
    if (lang.startsWith("fr")) return "fr";
  }

  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[key]?.[locale] ?? key;
    },
    [locale]
  );

  // Avoid hydration mismatch by rendering with default locale on server
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: "en", setLocale, t: (key) => translations[key]?.en ?? key }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}