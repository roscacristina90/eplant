import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Compute base at build time so we can deploy to Netlify (root) or GitHub Pages (/REPO/)
const _proc = typeof process !== 'undefined' ? process : (globalThis.process || { env: {} })
const repo = _proc.env.GITHUB_REPOSITORY
const base = _proc.env.DEPLOY_ENV === 'github' && repo ? `/${repo.split('/')[1]}/` : (_proc.env.BASE || '/')

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
