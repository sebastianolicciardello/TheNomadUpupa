import { z, defineCollection } from 'astro:content';

const multilingualField = z.union([
  z.string(),
  z.object({
    en: z.string(),
    it: z.string()
  })
]);

const postSchema = z.object({
  title: multilingualField,
  eventStartTime: z.date(),
  eventEndTime: z.date(),
  publishTime: z.date(),
  music: z.object({
    url: z.string(),
    description: multilingualField.optional()
  }).optional(),
  cover: z.string().optional(),
  coverCaption: multilingualField.optional(),
  description: multilingualField.optional(),
  lang: z.enum(['en', 'it']).optional(),
  translationKey: z.string().optional(),
});

export const collections = {
  posts: defineCollection({
    schema: postSchema,
  }),
};
