import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Target, Eye, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Negro Services" },
      { name: "description", content: "Learn about Negro Services — our mission, vision, values, and the team behind your digital success." },
      { property: "og:title", content: "About Us — Negro Services" },
      { property: "og:description", content: "Learn about Negro Services — our mission, vision, values, and the team behind your digital success." },
    ],
  }),
  component: AboutPage,
});

const valueIcons = [Target, Eye, Heart, Users] as const;
const valueKeys = ["mission", "vision", "passion", "collaboration"] as const;

const team = [
  { name: "Alex Rivera", role: "CEO & Founder", initials: "AR" },
  { name: "Jordan Lee", role: "Lead Developer", initials: "JL" },
  { name: "Sam Patel", role: "Creative Director", initials: "SP" },
  { name: "Taylor Kim", role: "Marketing Strategist", initials: "TK" },
];

function AboutPage() {
  const { t } = useLanguage();
  const scrollRef = useScrollAnimation();

  return (
    <div className="pt-20 min-h-screen" ref={scrollRef}>
      <section className="section-padding scroll-fade">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            {t("about.badge")}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            {t("about.title1")}{" "}
            <span className="gradient-text">{t("about.highlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("about.intro")}
          </p>
        </div>
      </section>

      <section className="section-padding bg-muted/30 scroll-fade">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={t("about.values.label")}
            title={t("about.values.title")}
            description={t("about.values.description")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={key} className="p-6 rounded-2xl border border-border bg-card hover-lift text-center">
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-5">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t(`about.${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(`about.${key}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding scroll-fade">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "150+", key: "about.stats.projects" as const },
              { value: "50+", key: "about.stats.clients" as const },
              { value: "8+", key: "about.stats.years" as const },
              { value: "15+", key: "about.stats.team" as const },
            ].map((stat) => (
              <div key={stat.key}>
                <p className="text-4xl md:text-5xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t(stat.key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30 scroll-fade">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label={t("about.team.label")}
            title={t("about.team.title")}
            description={t("about.team.description")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-6 rounded-2xl border border-border bg-card hover-lift text-center">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-foreground">{member.initials}</span>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
