import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  isoDateStringSchema,
  readableIdSchema,
  slugSchema,
  videoReferenceIdSchema,
  visibilitySchema,
} from "../common/schema";

export const videoRecordSchema = z
  .object({
    id: videoReferenceIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    summary: z.string().min(1),
    status: contentStatusSchema,
    visibility: visibilitySchema,
    publishedDate: isoDateStringSchema.optional(),
    youtubeReferenceId: videoReferenceIdSchema.optional(),
    posterAssetId: assetReferenceIdSchema.optional(),
    relatedLedgerEntryIds: z.array(readableIdSchema).optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
