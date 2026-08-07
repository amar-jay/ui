import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import mdx from '@mdx-js/rollup'

export default defineConfig({
  plugins: [tanstackRouter(), { enforce: 'pre', ...mdx() }, react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
