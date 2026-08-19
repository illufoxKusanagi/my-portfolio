import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const blogSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  summary: z.string(),
  publishedAt: z.string(),
  readTime: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
});

export default defineContentConfig({
  collections: {
    blogEn: defineCollection({
      type: "page",
      source: "blog/en/*.md",
      schema: blogSchema,
    }),
    blogId: defineCollection({
      type: "page",
      source: "blog/id/*.md",
      schema: blogSchema,
    }),
  },
});
