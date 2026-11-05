import { normalizePath } from './lib/paths'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

const root = document.getElementById('root')!
const path = normalizePath(window.location.pathname)
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
if (root.dataset.prerender === path) hydrateRoot(root, app)
else createRoot(root).render(app)
