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
import { SIGNAL_CATEGORIES, SIGNAL_DELIVERY_METHODS } from "./types";

export const signalCategorySchema = z.enum(SIGNAL_CATEGORIES);
export const signalDeliveryMethodSchema = z.enum(SIGNAL_DELIVERY_METHODS);

export const signalProductSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    name: z.string().min(1),
    shortName: z.string().min(1).optional(),
    description: z.string().min(1),
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    signalCategory: signalCategorySchema,
    deliveryMethods: z.array(signalDeliveryMethodSchema).optional(),
    platforms: z.array(tradingPlatformSchema).min(1),
    marketCategories: z.array(marketCategorySchema).min(1),
    instruments: z.array(instrumentSymbolSchema).optional(),
    capabilities: z.array(z.string().min(1)).optional(),
    featuredAssetId: assetReferenceIdSchema.optional(),
    assetIds: z.array(assetReferenceIdSchema).optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    relatedIndicatorIds: z.array(readableIdSchema).optional(),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
