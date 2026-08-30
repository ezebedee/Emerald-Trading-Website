import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  instrumentSymbolSchema,
  isoDateTimeStringSchema,
  marketCategorySchema,
  readableIdSchema,
  slugSchema,
  tradingPlatformSchema,
  visibilitySchema,
} from "../common/schema";
import { SIGNAL_DIRECTIONS } from "./types";

export const signalDirectionSchema = z.enum(SIGNAL_DIRECTIONS);

export const signalDefinitionSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    status: contentStatusSchema,
    visibility: visibilitySchema,
    platform: tradingPlatformSchema.optional(),
    market: marketCategorySchema.optional(),
    instrument: instrumentSymbolSchema.optional(),
    direction: signalDirectionSchema.optional(),
    generatedAt: isoDateTimeStringSchema.optional(),
    expiresAt: isoDateTimeStringSchema.optional(),
    relatedSystemId: readableIdSchema.optional(),
    relatedIndicatorIds: z.array(readableIdSchema).optional(),
    screenshotAssetId: assetReferenceIdSchema.optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
