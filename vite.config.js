import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
  ],
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Route chunks are handled automatically by React.lazy
        },
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    // Minify for production with esbuild (faster and included with Vite)
    minify: 'esbuild',
    // CSS minification
    cssMinify: true,
  },
})
