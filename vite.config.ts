import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isPreview }) => ({
  // Preview must serve each generated HTML page rather than the SPA shell.
  appType: isPreview ? 'mpa' : 'spa',
  resolve: { tsconfigPaths: true },
  plugins: [viteReact(), tailwindcss()],
}))
