import { z, defineCollection } from 'astro:content';

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      coords: z.object({ lat: z.number(), lon: z.number() }),
      cover: z.string().optional(),
      tags: z.string().array(),
    }),
  }),
};
