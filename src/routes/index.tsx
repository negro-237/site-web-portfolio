import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ArrowRight, Code, Smartphone, Palette, Megaphone, Star, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Negro Services — We Build Powerful Digital Experiences" },
      { name: "description", content: "Premium digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing." },
      { property: "og:title", content: "Negro Services — We Build Powerful Digital Experiences" },
      { property: "og:description", content: "Premium digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing." },
    ],
  }),
  component: HomePage,
});

const serviceIcons = [Code, Smartphone, Palette, Megaphone] as const;
const serviceKeys = ["webdev", "mobile", "design", "marketing"] as const;

const projectKeys = [
  { key: "ecommerce" as const, category: "Web", color: "from-primary to-accent" },
  { key: "fitness" as const, category: "Mobile", color: "from-accent to-primary" },
  { key: "saas" as const, category: "Design", color: "from-primary/80 to-accent/80" },
];

const testimonialKeys = ["1", "2", "3"] as const;
const testimonialAuthors = [
  { name: "Sarah Johnson", role: "CEO, TechStart" },
  { name: "Michael Chen", role: "Founder, AppVenture" },
  { name: "Emily Davis", role: "Marketing Director, GrowthCo" },
];

function HomePage() {
  const { t } = useLanguage();
  const scrollRef = useScrollAnimation();

  return (
    <div className="min-h-screen" ref={scrollRef}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-8">
              {t("home.badge")}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {t("home.hero.title1")}{" "}
            <span className="gradient-text">{t("home.hero.highlight")}</span>
            <br />
            {t("home.hero.title2")}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {t("home.hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                {t("home.hero.cta1")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="glass" size="xl">
                {t("home.hero.cta2")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding scroll-fade">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={t("home.services.label")}
            title={t("home.services.title")}
            description={t("home.services.description")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[i];
              return (
                <div
                  key={key}
                  className="group relative p-6 rounded-2xl border border-border bg-card hover-lift cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t(`service.${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`service.${key}.desc`)}</p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/services">
              <Button variant="outline" size="lg">
                {t("home.services.cta")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-muted/30 scroll-fade">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={t("home.projects.label")}
            title={t("home.projects.title")}
            description={t("home.projects.description")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectKeys.map((project) => (
              <div
                key={project.key}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover-lift"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`} />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70 mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-primary-foreground">{t(`project.${project.key}`)}</h3>
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/portfolio">
              <Button variant="outline" size="lg">
                {t("home.projects.cta")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding scroll-fade">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={t("home.testimonials.label")}
            title={t("home.testimonials.title")}
            description={t("home.testimonials.description")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialKeys.map((key, i) => (
              <div key={key} className="p-6 rounded-2xl border border-border bg-card hover-lift">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">{t(`testimonial.${key}.text`)}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-semibold text-foreground">{testimonialAuthors[i].name}</p>
                <p className="text-sm text-muted-foreground">{testimonialAuthors[i].role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="section-padding bg-muted/30 scroll-fade">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-8">
            {t("home.trusted")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {["TechCorp", "InnovateLab", "StartupX", "DigitalFirst", "GrowthCo"].map((brand) => (
              <span
                key={brand}
                className="text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-200"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden scroll-fade">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {t("home.cta.title1")}{" "}
            <span className="gradient-text">{t("home.cta.highlight")}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("home.cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                {t("home.cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
