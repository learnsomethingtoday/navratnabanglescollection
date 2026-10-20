import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    sku: z.string(),
    summary: z.string(),
    categories: z.array(z.string()).min(1),
    collection: z.string().optional(),
    tags: z.array(z.string()).default([]),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string().min(1),
      focalPosition: z.string().optional(),
      cardFit: z.enum(['contain', 'cover']).optional(),
    })).min(1),
    material: z.array(z.string()).min(1),
    sizes: z.array(z.string()).min(1),
    colors: z.array(z.object({
      name: z.string(),
      hex: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
    })).min(1),
    availability: z.enum(['available', 'limited', 'coming-soon', 'unavailable']),
    features: z.array(z.string()).min(1),
    careInstructions: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    seasonalLaunch: z.string().optional(),
    launchDate: z.coerce.date().optional(),
    price: z.number().nonnegative().optional(),
    mrp: z.number().nonnegative().optional(),
    currency: z.string().length(3).optional(),
    showPrice: z.boolean().default(false),
    piecesPerSet: z.number().int().positive().optional(),
    sortOrder: z.number().int().default(999),
    draft: z.boolean().default(false),
  }),
});

export const collections = { products };
