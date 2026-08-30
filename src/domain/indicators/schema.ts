import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  instrumentSymbolSchema,
  marketCategorySchema,
  readableIdSchema,
  slugSchema,
  tradingPlatformSchema,
  visibilitySchema,
} from "../common/schema";

export const indicatorDefinitionSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    name: z.string().min(1),
    shortName: z.string().min(1).optional(),
    description: z.string().min(1),
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    platforms: z.array(tradingPlatformSchema).min(1),
    marketCategories: z.array(marketCategorySchema).min(1),
    instruments: z.array(instrumentSymbolSchema).optional(),
    capabilities: z.array(z.string().min(1)).optional(),
    featuredAssetId: assetReferenceIdSchema.optional(),
    assetIds: z.array(assetReferenceIdSchema).optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    relatedSignalIds: z.array(readableIdSchema).optional(),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
