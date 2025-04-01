import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8888'
    }
  },
  build: {
    outDir: 'dist'
  },
  // 👇 This is the important part
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  // 👇 Add this to support client-side routing
  base: '/',
});
