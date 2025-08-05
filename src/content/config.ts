import { z, defineCollection } from 'astro:content';

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      coords: z.object({ lat: z.number(), lon: z.number() }).optional(),
      locations: z.array(z.object({
        name: z.string(),
        coords: z.object({ lat: z.number(), lon: z.number() }),
        isMain: z.boolean().optional()
      })).optional(),
      cover: z.string().optional(),
      description: z.string().optional(),
    }),
  }),
};
