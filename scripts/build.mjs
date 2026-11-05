import { build } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'

await build()
await build({ build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr' } })
const { renderPage, getSeo, getStructuredData, seoPaths, siteUrl } =
  await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const template = await readFile('dist/index.html', 'utf8')
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  )
const meta = (key, value, property = false) =>
  `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}" />`
for (const pathname of [...seoPaths, '/404']) {
  const seo = getSeo(pathname)
  const schema = getStructuredData(pathname)
  const head = [
    `<title>${escape(seo.title)}</title>`,
    meta('description', seo.description),
    meta('robots', seo.robots),
    meta('og:title', seo.title, true),
    meta('og:description', seo.description, true),
    meta('og:type', 'website', true),
    meta('og:site_name', 'Negro Services', true),
    meta('og:locale', seo.locale, true),
    meta('og:image', seo.image, true),
    meta('og:image:width', '1200', true),
    meta('og:image:height', '630', true),
    meta('og:image:alt', 'Negro Services — Web, applications & design', true),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', seo.title),
    meta('twitter:description', seo.description),
    meta('twitter:image', seo.image),
    ...(seo.canonical
      ? [
          `<link rel="canonical" href="${escape(seo.canonical)}" />`,
          meta('og:url', seo.canonical, true),
        ]
      : []),
    ...(schema
      ? [
          `<script id="organization-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`,
        ]
      : []),
  ].join('\n')
  const html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-prerender="${pathname}">${renderPage(pathname)}</div>`,
    )
  const file =
    pathname === '/'
      ? 'dist/index.html'
      : pathname === '/404'
        ? 'dist/404.html'
        : `dist${pathname}/index.html`
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  // Support both clean-URL hosts and hosts that resolve directory indexes.
  if (pathname !== '/' && pathname !== '/404')
    await writeFile(`dist${pathname}.html`, html)
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${seoPaths.map((path) => `  <url><loc>${escape(getSeo(path).canonical)}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', sitemap)
await writeFile(
  'dist/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
)
console.log(
  `Pre-rendered ${seoPaths.length} French pages and a 404 page; generated sitemap.xml and robots.txt.`,
)
await import('./check-seo.mjs')
