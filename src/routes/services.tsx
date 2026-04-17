import { Link } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Code, Smartphone, Palette, Megaphone, ArrowRight, Check } from "lucide-react";
import type { TranslationKey } from "@/i18n/translations";

import serviceDesign from "@/assets/service-design.jpg";
import serviceMarketing from "@/assets/service-marketing.jpg";
import serviceMobile from "@/assets/service-mobile.jpg";
import serviceWebdev from "@/assets/service-webdev.jpg";

const services = [
  { icon: Code, key: "webdev", featureCount: 6, image: serviceWebdev },
  { icon: Smartphone, key: "mobile", featureCount: 6, image: serviceMobile },
  { icon: Palette, key: "design", featureCount: 6, image: serviceDesign },
  { icon: Megaphone, key: "marketing", featureCount: 6, image: serviceMarketing },
] as const;

export default function ServicesPage() {
  const { t } = useLanguage();
  const scrollRef = useScrollAnimation();

  return (
    <div className="pt-20 min-h-screen" ref={scrollRef}>
      <section className="section-padding scroll-fade">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            {t("services.badge")}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            {t("services.title1")}{" "}
            <span className="gradient-text">{t("services.highlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => (
            <div
              key={service.key}
              className={`scroll-fade flex flex-col lg:flex-row gap-10 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="flex-1">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-5">
                  <service.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t(`services.${service.key}.title` as TranslationKey)}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t(`services.${service.key}.desc` as TranslationKey)}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {Array.from({ length: service.featureCount }, (_, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {t(`services.${service.key}.f${i + 1}` as TranslationKey)}
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="hero">
                    {t("services.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="mono-card relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
                  <img
                    src={service.image}
                    alt={t(`services.${service.key}.title` as TranslationKey)}
                    width={900}
                    height={675}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-background/10 to-transparent" />
                  <div className="mono-pattern absolute inset-0 opacity-35" />
                  <div className="absolute inset-6 rounded-2xl border border-primary-foreground/25" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
