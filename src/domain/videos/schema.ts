import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  isoDateTimeStringSchema,
  readableIdSchema,
  slugSchema,
  visibilitySchema,
} from "../common/schema";
import { VIDEO_PLATFORMS } from "./types";

export const videoPlatformSchema = z.enum(VIDEO_PLATFORMS);

export const videoRecordSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    description: z.string().min(1),
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    videoPlatform: videoPlatformSchema,
    externalVideoId: z.string().min(1).optional(),
    externalUrl: z.string().url().optional(),
    thumbnailAssetId: assetReferenceIdSchema.optional(),
    posterAssetId: assetReferenceIdSchema.optional(),
    publishedAt: isoDateTimeStringSchema.optional(),
    durationSeconds: z.number().int().positive().optional(),
    relatedLedgerEntryIds: z.array(readableIdSchema).optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    relatedIndicatorIds: z.array(readableIdSchema).optional(),
    relatedSignalIds: z.array(readableIdSchema).optional(),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
