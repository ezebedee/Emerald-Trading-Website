import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  marketCategorySchema,
  readableIdSchema,
  runtimeStatusSchema,
  slugSchema,
  systemLifecycleStatusSchema,
  tradingPlatformSchema,
  visibilitySchema,
} from "../common/schema";

export const tradingSystemSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    name: z.string().min(1),
    summary: z.string().min(1),
    status: contentStatusSchema,
    lifecycleStatus: systemLifecycleStatusSchema,
    runtimeStatus: runtimeStatusSchema.optional(),
    visibility: visibilitySchema,
    platforms: z.array(tradingPlatformSchema).min(1),
    markets: z.array(marketCategorySchema).min(1),
    primaryAssetId: assetReferenceIdSchema.optional(),
    relatedIndicatorIds: z.array(readableIdSchema).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
