import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'

const paths = ['/', '/services', '/about', '/portfolio', '/contact']
const titles = new Set()
const descriptions = new Set()
for (const path of paths) {
  const file = path === '/' ? 'dist/index.html' : `dist${path}/index.html`
  const source = await readFile(file, 'utf8')
  if (path !== '/')
    assert.equal(
      await readFile(`dist${path}.html`, 'utf8'),
      source,
      `${path}: clean-URL file matches directory index`,
    )
  const { document } = new JSDOM(source).window
  assert.equal(document.documentElement.lang, 'fr', `${path}: language`)
  assert.equal(
    document.querySelectorAll('title').length,
    1,
    `${path}: exactly one title`,
  )
  const title = document.title
  const description = document.querySelector(
    'meta[name="description"]',
  )?.content
  assert.ok(title && !titles.has(title), `${path}: unique title`)
  assert.ok(
    description && !descriptions.has(description),
    `${path}: unique description`,
  )
  titles.add(title)
  descriptions.add(description)
  assert.equal(document.querySelectorAll('h1').length, 1, `${path}: one H1`)
  assert.ok(
    document.querySelector('main')?.textContent.length > 200,
    `${path}: real content without JavaScript`,
  )
  assert.equal(
    document.querySelector('#root')?.dataset.prerender,
    path,
    `${path}: hydration route`,
  )
  const canonical = `https://www.negro-services.com${path === '/' ? '/' : path}`
  assert.equal(
    document.querySelectorAll('link[rel="canonical"]').length,
    1,
    `${path}: one canonical`,
  )
  assert.equal(
    document.querySelector('link[rel="canonical"]')?.href,
    canonical,
    `${path}: correct canonical`,
  )
  assert.equal(
    document.querySelector('meta[property="og:url"]')?.content,
    canonical,
    `${path}: matching social URL`,
  )
  assert.equal(
    document.querySelector('meta[property="og:title"]')?.content,
    title,
    `${path}: matching social title`,
  )
  assert.equal(
    document.querySelector('meta[property="og:description"]')?.content,
    description,
    `${path}: matching social description`,
  )
  assert.ok(
    !document.querySelector('meta[name="robots"]').content.includes('noindex'),
    `${path}: indexable`,
  )
  const schema = JSON.parse(
    document.querySelector('#organization-schema')?.textContent ?? '{}',
  )
  assert.equal(
    schema['@context'],
    'https://schema.org',
    `${path}: structured data`,
  )
  assert.ok(
    schema['@graph'].some(
      (item) =>
        item['@type'] === 'Organization' && item.name === 'Negro Services',
    ),
    `${path}: organization schema`,
  )
  for (const node of document.querySelectorAll(
    'img, script[src], link[rel="stylesheet"]',
  )) {
    const src = node.getAttribute('src') ?? node.getAttribute('href')
    if (src?.startsWith('/')) await access(resolve('dist', src.slice(1)))
    if (node.tagName === 'IMG')
      assert.ok(node.getAttribute('alt'), `${path}: image description`)
  }
  for (const link of document.querySelectorAll('a[href^="/"]')) {
    const target = new URL(link.getAttribute('href'), canonical)
    assert.ok(
      paths.includes(target.pathname.replace(/\/+$/, '') || '/'),
      `${path}: internal link ${target.pathname}`,
    )
  }
}
const error = new JSDOM(await readFile('dist/404.html', 'utf8')).window.document
assert.ok(
  error.querySelector('meta[name="robots"]')?.content.includes('noindex'),
  '404 must not be indexed',
)
assert.equal(
  error.querySelector('link[rel="canonical"]'),
  null,
  '404 must not point to a valid page as canonical',
)
const sitemap = new JSDOM(await readFile('dist/sitemap.xml', 'utf8'), {
  contentType: 'application/xml',
}).window.document
assert.equal(
  sitemap.querySelectorAll('url > loc').length,
  paths.length,
  'Sitemap includes exactly the public pages',
)
for (const path of paths)
  assert.ok(
    [...sitemap.querySelectorAll('loc')].some(
      (el) =>
        el.textContent ===
        `https://www.negro-services.com${path === '/' ? '/' : path}`,
    ),
    `Sitemap contains ${path}`,
  )
assert.ok(
  (await readFile('dist/robots.txt', 'utf8')).includes(
    'Sitemap: https://www.negro-services.com/sitemap.xml',
  ),
)
await access('dist/social-preview.png')
console.log(
  'SEO checks passed: HTML content, unique metadata, canonicals, schema, local assets, links, sitemap and noindex 404.',
)
