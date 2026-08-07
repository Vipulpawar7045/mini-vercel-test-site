import { defineConfig } from 'vite';

export default defineConfig({
  base: './',   // use relative asset paths so the site works in any subdirectory
  build: {
    outDir: 'dist',
  },
});
