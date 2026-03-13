import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imageSchema = z.object({
  type: z.enum(['image', 'video']),
  src: z.string(),
  path: z.string().nullable(),
  vimeoId: z.string().nullable(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/projects' }),
  schema: z.object({
    src: z.string(),
    type: z.string(),
    year: z.number().nullable(),
    card: z.string(),
    title: z.string().nullable(),
    headers: z.array(z.string()),
    paragraphs: z.array(z.string()),
    cardIcon: z.string().nullable(),
    images: z.array(imageSchema),
  }),
});

export const collections = { projects };
