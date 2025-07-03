import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nataliethistime.com',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'never',
  compressHTML: false,

  server: {
    port: 3000,
  },

  devToolbar: {
    // Note: this might be useful in future if I start using the Islands feature
    enabled: false,
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: 'solarized-light',
        dark: 'solarized-dark',
      },
      defaultColor: 'light-dark()',
      wrap: true,
    },
  },
});
