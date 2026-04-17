import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { RouterProvider, useLocation } from "@/lib/router";
import AboutPage from "@/routes/about";
import ContactPage from "@/routes/contact";
import HomePage from "@/routes/index";
import PortfolioPage from "@/routes/portfolio";
import ServicesPage from "@/routes/services";

const routes: Record<string, React.ComponentType> = {
  "/": HomePage,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/portfolio": PortfolioPage,
  "/contact": ContactPage,
};

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg gradient-bg px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const Page = routes[location.pathname] ?? NotFoundPage;

  return (
    <>
      <Header />
      <main>
        <Page />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider>
          <AppRoutes />
        </RouterProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
