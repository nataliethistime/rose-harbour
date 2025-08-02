import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import type { RehypePlugin } from '@astrojs/markdown-remark';

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
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      // TODO: not sure why this TS teething issue is happening
      rehypeAccessibleEmojis as RehypePlugin,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
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
