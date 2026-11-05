import { Link } from '@/lib/router'
import { contact } from '@/lib/contact'
import { useLanguage } from '@/i18n/LanguageProvider'
export function Footer() {
  const { locale, t } = useLanguage()
  const fr = locale === 'fr'
  return (
    <footer className="site-footer">
      <div className="editorial-wrap">
        <div className="footer-main">
          <div>
            <Link to="/" className="wordmark footer-wordmark">
              NEGRO<span className="serif"> services.</span>
            </Link>
            <p>
              {fr
                ? 'Une identité affirmée. Des solutions numériques pensées pour votre activité.'
                : 'A distinct identity. Digital solutions shaped around your business.'}
            </p>
          </div>
          <div>
            <p className="eyebrow">{fr ? 'EXPLORER' : 'EXPLORE'}</p>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/portfolio">{t('nav.portfolio')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
          </div>
          <div>
            <p className="eyebrow">
              {fr ? 'FAISONS CONNAISSANCE' : 'LET’S CONNECT'}
            </p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <Link to="/contact">
              {fr
                ? 'Parlons de votre projet ↗'
                : 'Let’s discuss your project ↗'}
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Negro Services. {t('footer.rights')}
          </span>
          <span>
            {fr
              ? 'Identité noire. Ambition numérique.'
              : 'Black identity. Digital ambition.'}
          </span>
        </div>
      </div>
    </footer>
  )
}
