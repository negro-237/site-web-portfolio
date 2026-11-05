import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Smartphone,
  Palette,
  Megaphone,
} from 'lucide-react'
import { Link } from '@/lib/router'
import { useLanguage } from '@/i18n/LanguageProvider'
import webImage from '@/assets/project-ecommerce.jpg'
import designImage from '@/assets/project-brand.jpg'
const keys = ['webdev', 'mobile', 'design', 'marketing'] as const
const icons = [Code2, Smartphone, Palette, Megaphone]
export default function HomePage() {
  const { locale, t } = useLanguage()
  const fr = locale === 'fr'
  return (
    <div className="home-page">
      <section className="hero editorial-wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="brand-dot" />{' '}
            {fr ? 'STUDIO DIGITAL À DOUALA' : 'DIGITAL STUDIO IN DOUALA'}
          </p>
          <h1>
            {fr ? 'Votre ambition.' : 'Your ambition.'}
            <br />
            <span>{fr ? 'Notre empreinte' : 'Our digital'}</span>
            <br />
            <span className="hero-serif">
              {fr ? 'digitale.' : 'signature.'}
            </span>
          </h1>
          <p className="hero-description">
            {fr
              ? 'Negro Services, studio digital indépendant à Douala, crée vos sites web, applications et identités visuelles. Une présence numérique pensée pour votre activité.'
              : 'Negro Services is an independent digital studio in Douala for websites, apps and visual identity. A digital presence shaped around your business.'}
          </p>
          <div className="hero-actions">
            <Link className="action-primary" to="/contact">
              {fr ? 'Parlons de votre projet' : 'Let’s discuss your project'}{' '}
              <ArrowUpRight size={19} />
            </Link>
            <Link className="text-link" to="/services">
              {fr ? 'Explorer les services' : 'Explore services'}{' '}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-caption">
            {fr
              ? 'Identité affirmée. Conception réfléchie. Relation directe.'
              : 'Distinct identity. Thoughtful design. Direct collaboration.'}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-top">
            <span>NEGRO SERVICES</span>
            <span>DIGITAL & DESIGN</span>
          </div>
          <div className="monogram">
            N<span>.</span>
          </div>
          <div className="art-orbit" />
          <div className="art-bottom">
            <span>
              {fr
                ? 'UNE IDENTITÉ. UNE SIGNATURE.'
                : 'ONE IDENTITY. ONE SIGNATURE.'}
            </span>
            <span>01 / NS</span>
          </div>
        </div>
        <div className="hero-baseline">
          <span>
            {fr
              ? 'ANCRÉ DANS L’IDENTITÉ. TOURNÉ VERS VOTRE AVENIR.'
              : 'ROOTED IN IDENTITY. FOCUSED ON YOUR FUTURE.'}
          </span>
          <a
            href="#expertises"
            aria-label={
              fr ? 'Découvrir les expertises' : 'Discover our expertise'
            }
          >
            <ArrowDown size={18} />
          </a>
        </div>
      </section>
      <section id="expertises" className="editorial-section editorial-wrap">
        <div className="section-intro">
          <p className="eyebrow">01 / {fr ? 'LES EXPERTISES' : 'EXPERTISE'}</p>
          <h2>
            {fr ? 'De l’idée à' : 'From the idea to'}
            <br />
            <span className="serif">
              {fr ? 'sa réalisation.' : 'the real thing.'}
            </span>
          </h2>
          <p>
            {fr
              ? 'Un accompagnement adapté à votre activité, à vos priorités et aux personnes que vous souhaitez toucher.'
              : 'Support shaped around your business, your priorities and the people you want to reach.'}
          </p>
        </div>
        <div className="expertise-list">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <Link to="/services" key={key} className="expertise-row">
                <span className="row-number">0{i + 1}</span>
                <Icon size={24} strokeWidth={1.4} />
                <div>
                  <h3>{t(`service.${key}.title`)}</h3>
                  <p>{t(`service.${key}.desc`)}</p>
                </div>
                <ArrowUpRight className="row-arrow" size={22} />
              </Link>
            )
          })}
        </div>
      </section>
      <section className="identity-band">
        <div className="editorial-wrap identity-inner">
          <p className="eyebrow">{fr ? 'NOTRE SIGNATURE' : 'OUR SIGNATURE'}</p>
          <h2>
            {fr ? 'Le noir comme identité.' : 'Black as an identity.'}
            <br />
            <span className="serif">
              {fr ? 'Le détail comme exigence.' : 'Detail as a commitment.'}
            </span>
          </h2>
          <div>
            <p>
              {fr
                ? 'Negro Services met à l’honneur l’identité noire. Notre univers sombre en est l’expression : une présence affirmée, sobre et singulière, au service de votre projet.'
                : 'Negro Services celebrates Black identity. Our dark visual world expresses it: a confident, considered and distinctive presence in service of your project.'}
            </p>
            <Link className="text-link" to="/about">
              {fr ? 'Découvrir notre histoire' : 'Discover our story'}{' '}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="editorial-section editorial-wrap">
        <div className="section-topline">
          <div>
            <p className="eyebrow">
              02 / {fr ? 'EXPLORATIONS CRÉATIVES' : 'CREATIVE EXPLORATIONS'}
            </p>
            <h2>
              {fr ? 'Des idées qui' : 'Ideas that'}{' '}
              <span className="serif">
                {fr ? 'prennent forme.' : 'take shape.'}
              </span>
            </h2>
          </div>
          <Link className="text-link" to="/portfolio">
            {fr ? 'Explorer le portfolio' : 'Explore the portfolio'}{' '}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <p className="section-note">
          {fr
            ? 'Aperçus de concepts illustratifs : des pistes pour imaginer votre prochain projet.'
            : 'Illustrative concepts: inspiration for your next project.'}
        </p>
        <div className="project-pair">
          {[
            {
              image: webImage,
              title: fr
                ? 'Une boutique, une expérience.'
                : 'A store. An experience.',
              type: 'WEB / E-COMMERCE',
            },
            {
              image: designImage,
              title: fr
                ? 'Une marque qui se distingue.'
                : 'A brand that stands apart.',
              type: fr
                ? 'DESIGN / IDENTITÉ VISUELLE'
                : 'DESIGN / VISUAL IDENTITY',
            },
          ].map((p) => (
            <Link to="/portfolio" className="project-preview" key={p.type}>
              <div className="project-image">
                <img
                  src={p.image}
                  alt={p.title}
                  width={800}
                  height={512}
                  loading="lazy"
                />
                <span>CONCEPT</span>
              </div>
              <div className="project-caption">
                <div>
                  <p className="eyebrow">{p.type}</p>
                  <h3>{p.title}</h3>
                </div>
                <ArrowUpRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-section editorial-wrap process-section">
        <div>
          <p className="eyebrow">03 / {fr ? 'LA MÉTHODE' : 'THE PROCESS'}</p>
          <h2>
            {fr ? 'Un projet clair.' : 'A clear project.'}
            <br />
            <span className="serif">
              {fr ? 'À chaque étape.' : 'At every step.'}
            </span>
          </h2>
        </div>
        <div className="process-grid">
          {(fr
            ? [
                [
                  'Échanger',
                  'Nous précisons ensemble votre besoin, votre public et vos objectifs.',
                ],
                [
                  'Concevoir',
                  'Nous définissons le périmètre et la direction visuelle avant la réalisation.',
                ],
                [
                  'Réaliser',
                  'Votre projet prend forme, avec des points de validation jusqu’à la livraison.',
                ],
              ]
            : [
                [
                  'Discover',
                  'We clarify your needs, audience and goals together.',
                ],
                [
                  'Design',
                  'We define the scope and visual direction before production.',
                ],
                [
                  'Build',
                  'Your project takes shape, with review points through to delivery.',
                ],
              ]
          ).map(([title, desc], i) => (
            <div key={title}>
              <span className="row-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="editorial-section editorial-wrap faq-section">
        <div className="section-intro">
          <p className="eyebrow">
            {fr ? 'QUESTIONS FRÉQUENTES' : 'FREQUENT QUESTIONS'}
          </p>
          <h2>
            {fr ? 'Votre projet,' : 'Your project,'}
            <br />
            <span className="serif">
              {fr ? 'en pratique.' : 'in practice.'}
            </span>
          </h2>
        </div>
        <div className="faq-list">
          {(fr
            ? [
                [
                  'Quels projets peut-on confier à Negro Services ?',
                  'Les services couvrent les sites vitrines, boutiques en ligne, applications web et mobiles, interfaces UI/UX et communication digitale. Le périmètre est défini ensemble selon vos besoins.',
                ],
                [
                  'Comment demander un devis pour un site web ?',
                  'Présentez votre activité, les pages ou fonctionnalités souhaitées, votre budget indicatif et votre calendrier. Contactez Negro Services par e-mail, téléphone ou WhatsApp depuis la page Contact.',
                ],
                [
                  'Quel budget et quel délai prévoir ?',
                  'Le budget et le calendrier dépendent du contenu, des fonctionnalités et des livrables. Ils sont précisés après un premier échange et le cadrage du projet.',
                ],
                [
                  'Où se trouve Negro Services ?',
                  'Negro Services est situé à Akwa, Douala, au Cameroun. Les coordonnées de contact sont disponibles sur le site pour discuter de votre projet.',
                ],
              ]
            : [
                [
                  'What projects can Negro Services help with?',
                  'Services cover business websites, online stores, web and mobile applications, UI/UX interfaces and digital communication. We define the scope together around your needs.',
                ],
                [
                  'How do I request a website quote?',
                  'Tell us about your business, the pages or features you need, your indicative budget and your timeline. Reach Negro Services by email, phone or WhatsApp through the Contact page.',
                ],
                [
                  'What budget and timeline should I expect?',
                  'Budget and timing depend on content, features and deliverables. They are defined after an initial conversation and project scoping.',
                ],
                [
                  'Where is Negro Services located?',
                  'Negro Services is located in Akwa, Douala, Cameroon. Use the contact details on this website to discuss your project.',
                ],
              ]
          ).map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="closing-cta editorial-wrap">
        <p className="eyebrow">
          {fr ? 'ET SI ON COMMENÇAIT ?' : 'LET’S GET STARTED'}
        </p>
        <h2>
          {fr ? 'Votre prochain chapitre' : 'Your next chapter'}
          <br />
          <span className="serif">
            {fr ? 'se construit ici.' : 'starts here.'}
          </span>
        </h2>
        <Link to="/contact" className="action-primary">
          {fr ? 'Discutons de votre projet' : 'Let’s discuss your project'}{' '}
          <ArrowUpRight size={20} />
        </Link>
      </section>
    </div>
  )
}
