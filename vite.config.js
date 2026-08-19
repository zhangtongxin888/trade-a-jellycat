import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  appType: 'mpa',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        beginner: resolve(import.meta.dirname, 'beginner-guide/index.html'),
        trading: resolve(import.meta.dirname, 'trading-guide/index.html'),
        faq: resolve(import.meta.dirname, 'faq/index.html'),
      },
    },
  },
});
