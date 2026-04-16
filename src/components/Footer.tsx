import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    [t("footer.services")]: [
      { label: t("service.webdev.title"), to: "/services" as const },
      { label: t("service.mobile.title"), to: "/services" as const },
      { label: t("service.design.title"), to: "/services" as const },
      { label: t("service.marketing.title"), to: "/services" as const },
    ],
    [t("footer.company")]: [
      { label: t("nav.about"), to: "/about" as const },
      { label: t("nav.portfolio"), to: "/portfolio" as const },
      { label: t("nav.contact"), to: "/contact" as const },
    ],
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold">
              <span className="gradient-text">Negro</span> Services
            </span>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex gap-4 mt-6">
              {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Negro Services. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
