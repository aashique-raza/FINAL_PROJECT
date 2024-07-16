import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist'  // Ensure this is correctly set
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     secure: false,
    //   },
    // },
  },
  plugins: [react()],
})
