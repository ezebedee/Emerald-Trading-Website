import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  isoDateStringSchema,
  marketCategorySchema,
  readableIdSchema,
  slugSchema,
  visibilitySchema,
} from "../common/schema";

export const researchItemSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    summary: z.string().min(1),
    status: contentStatusSchema,
    visibility: visibilitySchema,
    publishedDate: isoDateStringSchema.optional(),
    markets: z.array(marketCategorySchema).optional(),
    documentAssetId: assetReferenceIdSchema.optional(),
    thumbnailAssetId: assetReferenceIdSchema.optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
