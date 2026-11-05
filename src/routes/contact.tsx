import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider'
import { contact, createEmailDraft } from '@/lib/contact'
export default function ContactPage() {
  const { locale, t } = useLanguage()
  const fr = locale === 'fr'
  const [prepared, setPrepared] = useState(false)
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fields = new FormData(e.currentTarget)
    const data = Object.fromEntries(
      ['name', 'email', 'subject', 'message'].map((k) => [
        k,
        String(fields.get(k) ?? '').trim(),
      ]),
    ) as { name: string; email: string; subject: string; message: string }
    window.location.href = createEmailDraft(data)
    setPrepared(true)
  }
  return (
    <div className="editorial-wrap contact-page">
      <p className="eyebrow">
        {fr ? 'CONTACT / UN PREMIER ÉCHANGE' : 'CONTACT / START A CONVERSATION'}
      </p>
      <h1>
        {fr ? 'Parlons de' : 'Let’s talk about'}
        <br />
        <span className="serif">{fr ? 'votre projet.' : 'your project.'}</span>
      </h1>
      <p className="about-lead">
        {fr
          ? 'Une idée à concrétiser, une présence à repenser ? Présentez votre besoin et définissons ensemble la suite.'
          : 'An idea to bring to life, a presence to rethink? Tell us what you need and let’s define the next steps.'}
      </p>
      <div className="contact-layout">
        <form onSubmit={submit} className="contact-form">
          <h2>
            {fr
              ? 'Quelques mots pour commencer.'
              : 'A few words to get started.'}
          </h2>
          <div className="form-two">
            <label htmlFor="name">
              {t('contact.form.name')}
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                placeholder={t('contact.form.namePlaceholder')}
              />
            </label>
            <label htmlFor="email">
              {t('contact.form.email')}
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </label>
          </div>
          <label htmlFor="subject">
            {t('contact.form.subject')}
            <select id="subject" name="subject" required defaultValue="">
              <option value="" disabled>
                {fr ? 'Choisissez un service' : 'Choose a service'}
              </option>
              {['webdev', 'mobile', 'design', 'marketing'].map((k) => (
                <option key={k}>
                  {t(`service.${k}.title` as Parameters<typeof t>[0])}
                </option>
              ))}
              <option>
                {fr
                  ? 'Autre / À définir ensemble'
                  : 'Other / Let’s define it together'}
              </option>
            </select>
          </label>
          <label htmlFor="message">
            {t('contact.form.message')}
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={4000}
              placeholder={t('contact.form.messagePlaceholder')}
            />
          </label>
          <p className="form-note">
            {fr
              ? 'Ce formulaire prépare un e-mail dans votre application de messagerie. Vous pourrez le relire et l’envoyer vous-même. Aucune donnée n’est enregistrée par ce formulaire.'
              : 'This form prepares an email in your mail app. You can review and send it yourself. This form does not store your information.'}
          </p>
          <button type="submit" className="action-primary">
            {fr ? 'Préparer mon e-mail' : 'Prepare my email'}
            <ArrowUpRight size={18} />
          </button>
          {prepared && (
            <p className="form-status" role="status">
              {fr
                ? 'Demande préparée. Si votre messagerie ne s’ouvre pas, écrivez directement à contact@negro-services.com ou contactez-nous sur WhatsApp. Aucun message n’a été envoyé automatiquement.'
                : 'Your draft is ready. If your mail app does not open, email contact@negro-services.com or use WhatsApp. No message has been sent automatically.'}
            </p>
          )}
        </form>
        <aside className="contact-aside">
          <p className="eyebrow">{fr ? 'EN DIRECT' : 'DIRECT CONTACT'}</p>
          <a href={`mailto:${contact.email}`}>
            <Mail size={20} />
            <span>
              <small>E-mail</small>
              {contact.email}
            </span>
            <ArrowUpRight size={17} />
          </a>
          <a href={contact.phoneHref}>
            <Phone size={20} />
            <span>
              <small>{fr ? 'Téléphone' : 'Phone'}</small>
              {contact.phone}
            </span>
            <ArrowUpRight size={17} />
          </a>
          <div className="contact-location">
            <MapPin size={20} />
            <span>
              <small>{fr ? 'Localisation' : 'Location'}</small>Akwa, Douala —{' '}
              {fr ? 'Cameroun' : 'Cameroon'}
            </span>
          </div>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-contact"
          >
            <MessageCircle size={20} />
            <span>
              <small>
                {fr ? 'Vous préférez échanger ?' : 'Prefer a conversation?'}
              </small>
              {t('contact.whatsapp')}
            </span>
            <ArrowUpRight size={17} />
          </a>
        </aside>
      </div>
    </div>
  )
}
