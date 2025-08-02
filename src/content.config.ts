import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),

  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),

      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

const drives = defineCollection({
  loader: glob({ base: './src/content/drives', pattern: '**/*.{md,mdx}' }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      startAt: z.coerce.date(),
      endAt: z.coerce.date(),
      distanceKm: z.number(),
      averageSpeed: z.number().optional(),
      heroImage: image().optional(),
    }),
});

const kb = defineCollection({
  loader: glob({ base: './src/content/kb', pattern: '**/*.{md,mdx}' }),

  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
    }),
});

export const collections = { blog, drives, kb };
