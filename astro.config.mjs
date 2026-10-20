import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://learnsomethingtoday.github.io',
  base: '/navratnabanglescollection',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
