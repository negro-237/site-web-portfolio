import { ThemeProvider } from '@/components/ThemeProvider'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Seo } from '@/components/Seo'
import { useLanguage } from '@/i18n/LanguageProvider'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { LanguageProvider } from '@/i18n/LanguageProvider'
import { RouterProvider, useLocation } from '@/lib/router'
import AboutPage from '@/routes/about'
import ContactPage from '@/routes/contact'
import HomePage from '@/routes/index'
import PortfolioPage from '@/routes/portfolio'
import ServicesPage from '@/routes/services'

const routes: Record<string, React.ComponentType> = {
  '/': HomePage,
  '/about': AboutPage,
  '/services': ServicesPage,
  '/portfolio': PortfolioPage,
  '/contact': ContactPage,
}

function NotFoundPage() {
  const { locale } = useLanguage()
  const fr = locale === 'fr'
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {fr ? 'Page introuvable' : 'Page not found'}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {fr
            ? 'Cette page n’existe pas ou a été déplacée.'
            : 'This page does not exist or has moved.'}
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            {fr ? 'Retour à l’accueil' : 'Go home'}
          </a>
        </div>
      </div>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const motionRef = useScrollAnimation([location.pathname])
  const { locale } = useLanguage()
  const Page = routes[location.pathname] ?? NotFoundPage

  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>
      <Seo />
      <Header />
      <main ref={motionRef} id="main-content" tabIndex={-1}>
        <div key={location.pathname} className="page-enter">
          <Page />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export function App({ initialPath }: { initialPath?: string } = {}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider initialPath={initialPath}>
          <AppRoutes />
        </RouterProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
