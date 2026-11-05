import { Link } from '@/lib/router'
import { useLanguage } from '@/i18n/LanguageProvider'
import { ArrowUpRight } from 'lucide-react'
export default function AboutPage() {
  const { locale } = useLanguage()
  const fr = locale === 'fr'
  return (
    <div className="editorial-wrap about-page">
      <p className="eyebrow">
        {fr ? 'À PROPOS / NEGRO SERVICES' : 'ABOUT / NEGRO SERVICES'}
      </p>
      <h1>
        {fr ? 'Une identité forte.' : 'A strong identity.'}
        <br />
        <span className="serif">
          {fr ? 'Une approche personnelle.' : 'A personal approach.'}
        </span>
      </h1>
      <p className="about-lead">
        {fr
          ? 'Negro Services est une entreprise indépendante de services numériques. Elle accompagne les projets de sites web, d’applications, de design et de communication digitale.'
          : 'Negro Services is an independent digital services business supporting websites, apps, design and digital communication projects.'}
      </p>
      <div className="about-story">
        <span className="brand-stamp" aria-hidden="true">
          N.
        </span>
        <div>
          <p className="eyebrow">{fr ? 'LE SENS DU NOM' : 'BEHIND THE NAME'}</p>
          <h2>
            {fr ? 'Une fierté qui' : 'Pride that'}
            <br />
            <span className="serif">{fr ? 'se voit.' : 'shows.'}</span>
          </h2>
          <p>
            {fr
              ? 'Le nom Negro Services est un choix affirmé pour mettre en avant l’identité noire. Le noir occupe ainsi une place centrale dans notre univers visuel : il exprime notre ancrage et donne à notre marque sa singularité.'
              : 'The name Negro Services is a deliberate choice to celebrate Black identity. Black is central to our visual world: it expresses our roots and gives our brand its character.'}
          </p>
          <p>
            {fr
              ? 'Cette identité nourrit une approche attentive au sens, à la lisibilité et au détail. Chaque projet commence par une discussion pour comprendre votre activité et définir une réponse adaptée.'
              : 'This identity informs an approach focused on meaning, clarity and detail. Every project begins with a conversation to understand your business and define a suitable response.'}
          </p>
        </div>
      </div>
      <div className="process-grid about-values">
        {(fr
          ? [
              [
                'Écoute',
                'Comprendre votre besoin avant de proposer une solution.',
              ],
              [
                'Clarté',
                'Définir le périmètre, les étapes et les livrables ensemble.',
              ],
              [
                'Soin',
                'Porter la même attention au fonctionnement et à la présentation.',
              ],
            ]
          : [
              ['Listen', 'Understand your needs before proposing a solution.'],
              ['Clarify', 'Define the scope, steps and deliverables together.'],
              ['Care', 'Give equal attention to function and presentation.'],
            ]
        ).map(([title, desc]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
      <Link to="/contact" className="action-primary">
        {fr ? 'Parlons de votre projet' : 'Let’s discuss your project'}{' '}
        <ArrowUpRight size={18} />
      </Link>
    </div>
  )
}
