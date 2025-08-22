import { z, defineCollection } from 'astro:content';

const multilingualField = z.union([
  z.string(),
  z.object({
    en: z.string(),
    it: z.string()
  })
]);

const multilingualLocationField = z.union([
  z.string(),
  z.object({
    en: z.string(),
    it: z.string()
  })
]);

const postSchema = z.object({
  title: multilingualField,
  eventTime: z.date(),
  publishTime: z.date(),
  coords: z.object({ lat: z.number(), lon: z.number() }).optional(),
  locations: z.array(z.object({
    name: multilingualLocationField,
    coords: z.object({ lat: z.number(), lon: z.number() }),
    isMain: z.boolean().optional()
  })).optional(),
  music: z.object({
    url: z.string(),
    description: multilingualField.optional()
  }).optional(),
  cover: z.string().optional(),
  description: multilingualField.optional(),
  lang: z.enum(['en', 'it']).optional(),
  translationKey: z.string().optional(),
});

export const collections = {
  posts: defineCollection({
    schema: postSchema,
  }),
};
