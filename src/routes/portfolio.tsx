import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import type { TranslationKey } from "@/i18n/translations";

import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectFitness from "@/assets/project-fitness.jpg";
import projectSaas from "@/assets/project-saas.jpg";
import projectRealestate from "@/assets/project-realestate.jpg";
import projectFood from "@/assets/project-food.jpg";
import projectBrand from "@/assets/project-brand.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Our Portfolio — Negro Services" },
      { name: "description", content: "Explore our portfolio of web, mobile, and design projects that showcase our expertise." },
      { property: "og:title", content: "Our Portfolio — Negro Services" },
      { property: "og:description", content: "Explore our portfolio of web, mobile, and design projects." },
    ],
  }),
  component: PortfolioPage,
});

const filterKeys = ["all", "web", "mobile", "design"] as const;

const projects = [
  { titleKey: "project.ecommerce" as const, descKey: "portfolio.ecommerce.desc" as TranslationKey, category: "web", tech: ["React", "Node.js", "PostgreSQL"], image: projectEcommerce },
  { titleKey: "project.fitness" as const, descKey: "portfolio.fitness.desc" as TranslationKey, category: "mobile", tech: ["React Native", "Firebase", "TypeScript"], image: projectFitness },
  { titleKey: "project.saas" as const, descKey: "portfolio.saas.desc" as TranslationKey, category: "design", tech: ["Figma", "Design System", "Prototyping"], image: projectSaas },
  { titleKey: "project.realestate" as const, descKey: "portfolio.realestate.desc" as TranslationKey, category: "web", tech: ["Next.js", "Mapbox", "Prisma"], image: projectRealestate },
  { titleKey: "project.food" as const, descKey: "portfolio.food.desc" as TranslationKey, category: "mobile", tech: ["Flutter", "Stripe", "Google Maps"], image: projectFood },
  { titleKey: "project.brand" as const, descKey: "portfolio.brand.desc" as TranslationKey, category: "design", tech: ["Illustrator", "Brand Strategy", "Print"], image: projectBrand },
];

function PortfolioPage() {
  const { t } = useLanguage();
  const scrollRef = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState<(typeof filterKeys)[number]>("all");
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-20 min-h-screen" ref={scrollRef}>
      <section className="section-padding scroll-fade">
        <div className="mx-auto max-w-4xl text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            {t("portfolio.badge")}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            {t("portfolio.title1")}{" "}
            <span className="gradient-text">{t("portfolio.highlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12">
          {filterKeys.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeFilter === f
                  ? "gradient-bg text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`portfolio.filter.${f}` as TranslationKey)}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.titleKey}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover-lift scroll-fade"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  width={800}
                  height={512}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-foreground/20">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <ExternalLink className="h-5 w-5 text-foreground" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {t(`portfolio.filter.${project.category}` as TranslationKey)}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{t(project.titleKey)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(project.descKey)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}