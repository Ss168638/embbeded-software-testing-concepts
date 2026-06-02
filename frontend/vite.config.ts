import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path/win32'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // Set base to './' for relative paths
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional: Set up an alias for easier imports
    },
  },
})
