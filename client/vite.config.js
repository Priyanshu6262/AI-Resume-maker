import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Firebase signInWithPopup requires the opener window to be accessible
      // from the auth popup. Vite's default 'same-origin' COOP blocks this.
      // 'same-origin-allow-popups' restores popup communication while keeping
      // cross-origin navigation isolation.
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})
