import { normalizePath } from './paths'
import type { Locale } from '@/i18n/translations'
import { contact } from './contact'

export const siteUrl = 'https://www.negro-services.com'
export const seoPages = {
  '/': {
    fr: {
      title: 'Création de sites web à Douala | Negro Services',
      description:
        'Negro Services, studio digital indépendant à Douala : sites web, applications mobiles, design UI/UX et communication digitale. Parlons de votre projet.',
    },
    en: {
      title: 'Web design & development in Douala | Negro Services',
      description:
        'Negro Services is an independent digital studio in Douala for websites, mobile apps, UI/UX design and digital communication. Tell us about your project.',
    },
  },
  '/services': {
    fr: {
      title: 'Services web, applications et design à Douala | Negro Services',
      description:
        'Découvrez les services de Negro Services : création de sites vitrines et e-commerce, applications mobiles, design UI/UX et marketing digital à Douala.',
    },
    en: {
      title: 'Web, mobile & design services in Douala | Negro Services',
      description:
        'Explore Negro Services: business websites, online stores, mobile applications, UI/UX design and digital marketing services in Douala, Cameroon.',
    },
  },
  '/about': {
    fr: {
      title: 'À propos du studio digital à Douala | Negro Services',
      description:
        'Découvrez Negro Services, entreprise indépendante de services numériques à Douala. Une identité noire affirmée, une approche personnelle et attentive au détail.',
    },
    en: {
      title: 'About our independent digital studio | Negro Services',
      description:
        'Meet Negro Services, an independent digital business in Douala. Black identity, personal collaboration and thoughtful design shape our approach.',
    },
  },
  '/portfolio': {
    fr: {
      title: 'Portfolio de concepts web, mobile et design | Negro Services',
      description:
        'Explorez les concepts illustratifs de Negro Services : boutique en ligne, application mobile, tableau de bord et identité visuelle. Inspirez votre projet.',
    },
    en: {
      title: 'Web, mobile & design concept portfolio | Negro Services',
      description:
        'Explore illustrative concepts from Negro Services: online stores, mobile apps, dashboards and visual identities. Find inspiration for your next project.',
    },
  },
  '/contact': {
    fr: {
      title: 'Contact et demande de devis à Douala | Negro Services',
      description:
        'Un projet de site web, d’application ou de design ? Contactez Negro Services à Akwa, Douala, par e-mail, téléphone ou WhatsApp pour discuter de vos besoins.',
    },
    en: {
      title: 'Contact & project enquiries in Douala | Negro Services',
      description:
        'Planning a website, app or design project? Contact Negro Services in Akwa, Douala, by email, phone or WhatsApp to discuss your needs.',
    },
  },
} as const
export type SeoPath = keyof typeof seoPages
export const seoPaths = Object.keys(seoPages) as SeoPath[]

export function getSeo(pathname: string, locale: Locale = 'fr') {
  const path = normalizePath(pathname)
  const page = seoPages[path as SeoPath]
  return {
    ...(page?.[locale] ?? {
      title:
        locale === 'fr'
          ? 'Page introuvable | Negro Services'
          : 'Page not found | Negro Services',
      description:
        locale === 'fr'
          ? 'Cette page n’existe pas. Retrouvez les services et les coordonnées de Negro Services.'
          : 'This page does not exist. Explore Negro Services or get in touch.',
    }),
    canonical: page ? `${siteUrl}${path === '/' ? '/' : path}` : null,
    robots: page ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    locale: locale === 'fr' ? 'fr_CM' : 'en_US',
    image: `${siteUrl}/social-preview.png`,
  }
}

export function getStructuredData(pathname: string, locale: Locale = 'fr') {
  const seo = getSeo(pathname, locale)
  if (!seo.canonical) return null
  const organization = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Negro Services',
    url: `${siteUrl}/`,
    description:
      locale === 'fr'
        ? 'Studio digital indépendant à Douala : sites web, applications, design et communication digitale.'
        : 'Independent digital studio in Douala: websites, apps, design and digital communication.',
    email: contact.email,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Douala',
      addressCountry: 'CM',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phone,
      email: contact.email,
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'Negro Services',
        publisher: { '@id': organization['@id'] },
        inLanguage: ['fr', 'en'],
      },
      {
        '@type':
          normalizePath(pathname) === '/contact'
            ? 'ContactPage'
            : normalizePath(pathname) === '/about'
              ? 'AboutPage'
              : 'WebPage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: locale,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': organization['@id'] },
      },
    ],
  }
}
