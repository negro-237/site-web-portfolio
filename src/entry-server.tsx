import { renderToString } from 'react-dom/server'
import { App } from './App'
export { getSeo, getStructuredData, seoPaths, siteUrl } from './lib/seo'
export function renderPage(pathname: string) {
  return renderToString(<App initialPath={pathname} />)
}
