import { useTheme } from '@/components/ThemeProvider'
import { Link, useLocation } from '@/lib/router'
import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider'
const links = [
  { to: '/', key: 'nav.home' },
  { to: '/services', key: 'nav.services' },
  { to: '/portfolio', key: 'nav.portfolio' },
  { to: '/about', key: 'nav.about' },
] as const
export function Header() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { locale, setLocale, t } = useLanguage()
  const { pathname } = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [pathname])
  useEffect(() => {
    if (!open) return
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])
  return (
    <header className="site-header">
      <div className="header-inner editorial-wrap">
        <Link
          to="/"
          className="wordmark"
          aria-label={
            locale === 'fr'
              ? 'Negro Services — Accueil'
              : 'Negro Services — Home'
          }
        >
          <span className="logo-mark" aria-hidden="true">
            N.
          </span>
          <span>
            NEGRO<span className="wordmark-sub">SERVICES</span>
          </span>
        </Link>
        <nav
          className="desktop-nav"
          aria-label={
            locale === 'fr' ? 'Navigation principale' : 'Main navigation'
          }
        >
          {links.map((l) => (
            <Link
              to={l.to}
              key={l.to}
              aria-current={pathname === l.to ? 'page' : undefined}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="header-controls">
          <button
            className="language-button"
            onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
            aria-label={
              locale === 'fr' ? 'Switch to English' : 'Passer en français'
            }
          >
            {locale === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              locale === 'fr'
                ? theme === 'dark'
                  ? 'Activer le mode clair'
                  : 'Activer le mode sombre'
                : theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
            }
            title={
              locale === 'fr'
                ? theme === 'dark'
                  ? 'Mode clair'
                  : 'Mode sombre'
                : theme === 'dark'
                  ? 'Light mode'
                  : 'Dark mode'
            }
          >
            {theme === 'dark' ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
          <Link to="/contact" className="header-cta">
            {locale === 'fr' ? 'Un projet ?' : 'Have a project?'}{' '}
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="mobile-toggle"
            aria-label={
              locale === 'fr'
                ? open
                  ? 'Fermer le menu'
                  : 'Ouvrir le menu'
                : open
                  ? 'Close menu'
                  : 'Open menu'
            }
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-nav"
          aria-label={
            locale === 'fr' ? 'Navigation mobile' : 'Mobile navigation'
          }
        >
          {[...links, { to: '/contact', key: 'nav.contact' } as const].map(
            (l) => (
              <Link
                onClick={() => setOpen(false)}
                key={l.to}
                to={l.to}
                aria-current={pathname === l.to ? 'page' : undefined}
              >
                {t(l.key)} <ArrowUpRight size={17} />
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  )
}
