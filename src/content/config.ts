import { z, defineCollection } from 'astro:content';

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      coords: z.object({ lat: z.number(), lon: z.number() }).optional(),
      cover: z.string().optional(),
      description: z.string().optional(),
    }),
  }),
};
