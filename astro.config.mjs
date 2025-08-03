import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [mdx(), tailwind()],
  vite: { 
    optimizeDeps: { include: ['leaflet'] },
    base: '/TheNomadUpupa/',
  },
  site: 'https://sebastianolicciardello.github.io',
  base: '/TheNomadUpupa',
  build: {
    assets: 'assets'
  }
});