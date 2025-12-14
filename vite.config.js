import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    allowedHosts: [
      'devserver-main--dreamy-kleicha-1c5f18.netlify.app'
    ]
  },
  base: "/KalpanaPortfolio/",
})
