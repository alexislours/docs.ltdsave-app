import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const leafEntry = z.object({
  name: z.string(),
  hash: z.string(),
  type: z.string(),
  options: z.string().optional(),
  state: z.enum(['undocumented', 'partial', 'documented']),
});

const instanceEntry = z.object({
  name: z.string(),
  hashes: z.record(z.string(), z.string()),
});

const subgroupSummary = z.object({
  name: z.string(),
  leafCount: z.number(),
});

const savReferenceFields = z.object({
  schema: z.enum(['player', 'mii', 'map']).optional(),
  path: z.string().optional(),
  kind: z.enum(['root', 'group', 'template']).optional(),
  leafCount: z.number().optional(),
  instanceCount: z.number().optional(),
  leaves: z.array(leafEntry).optional(),
  instances: z.array(instanceEntry).optional(),
  subgroups: z.array(subgroupSummary).optional(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: savReferenceFields }),
  }),
};
