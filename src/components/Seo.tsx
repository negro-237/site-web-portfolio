import { useEffect } from 'react'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useLocation } from '@/lib/router'
import { getSeo, getStructuredData } from '@/lib/seo'

export function Seo() {
  const { pathname } = useLocation()
  const { locale } = useLanguage()
  useEffect(() => {
    const seo = getSeo(pathname, locale)
    document.title = seo.title
    function meta(
      attribute: 'name' | 'property',
      key: string,
      content: string,
    ) {
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      )
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.append(element)
      }
      element.content = content
    }
    meta('name', 'description', seo.description)
    meta('name', 'robots', seo.robots)
    meta('property', 'og:title', seo.title)
    meta('property', 'og:description', seo.description)
    meta('property', 'og:type', 'website')
    meta('property', 'og:site_name', 'Negro Services')
    meta('property', 'og:locale', seo.locale)
    meta('property', 'og:image', seo.image)
    meta('property', 'og:image:width', '1200')
    meta('property', 'og:image:height', '630')
    meta(
      'property',
      'og:image:alt',
      'Negro Services — Web, applications & design',
    )
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', seo.title)
    meta('name', 'twitter:description', seo.description)
    meta('name', 'twitter:image', seo.image)
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (seo.canonical) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = seo.canonical
      meta('property', 'og:url', seo.canonical)
    } else {
      canonical?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }
    let data = document.head.querySelector<HTMLScriptElement>(
      '#organization-schema',
    )
    const schema = getStructuredData(pathname, locale)
    if (schema) {
      if (!data) {
        data = document.createElement('script')
        data.id = 'organization-schema'
        data.type = 'application/ld+json'
        document.head.append(data)
      }
      data.textContent = JSON.stringify(schema)
    } else {
      data?.remove()
    }
  }, [pathname, locale])
  return null
}
