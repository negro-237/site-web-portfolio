export function normalizePath(path: string) {
  return (
    path
      .replace(/\/index\.html$/, '/')
      .replace(/\.html$/, '')
      .replace(/\/+$/, '') || '/'
  )
}
