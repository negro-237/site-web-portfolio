import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Mail, MapPin, Phone, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useLanguage();
  const scrollRef = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: Mail, label: t("contact.form.email"), value: "contact@negro-services.com" },
    { icon: Phone, label: "Phone", value: "+237 678 66 08 00" },
    { icon: MapPin, label: "Location", value: "Douala Akwa, CA" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-20 min-h-screen" ref={scrollRef}>
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center mb-16 scroll-fade">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            {t("contact.badge")}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            {t("contact.title1")}{" "}
            <span className="gradient-text">{t("contact.highlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-10 scroll-fade">
          <div className="lg:col-span-3">
            <div className="mono-card p-8 rounded-2xl bg-card">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
                    <Send className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t("contact.form.success.title")}</h3>
                  <p className="mt-2 text-muted-foreground">{t("contact.form.success.desc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("contact.form.name")}</Label>
                      <Input id="name" placeholder={t("contact.form.namePlaceholder")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
                      <Input id="email" type="email" placeholder={t("contact.form.emailPlaceholder")} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t("contact.form.subject")}</Label>
                    <Input id="subject" placeholder={t("contact.form.subjectPlaceholder")} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.form.message")}</Label>
                    <Textarea id="message" placeholder={t("contact.form.messagePlaceholder")} rows={5} required />
                  </div>
                  <Button variant="hero" size="lg" type="submit" className="w-full">
                    {t("contact.form.submit")} <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="mono-card p-6 rounded-2xl bg-card hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <info.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium text-foreground">{info.value}</p>
                  </div>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/23778660800?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover-lift">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t("contact.whatsapp")}</p>
                    <p className="text-sm text-muted-foreground">{t("contact.whatsapp.desc")}</p>
                  </div>
                </div>
              </div>
            </a>

            <div className="aspect-[4/3] rounded-2xl border border-border bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Douala Akwa, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
