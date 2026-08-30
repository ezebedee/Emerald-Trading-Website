import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
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
    summary: z.string().min(1),
    status: contentStatusSchema,
    visibility: visibilitySchema,
    platforms: z.array(tradingPlatformSchema).min(1),
    markets: z.array(marketCategorySchema).optional(),
    screenshotAssetId: assetReferenceIdSchema.optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
