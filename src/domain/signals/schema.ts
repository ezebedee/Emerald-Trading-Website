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
import {
  SIGNAL_CATEGORIES,
  SIGNAL_DELIVERY_METHODS,
  SIGNAL_MODULE_CATEGORIES,
  SIGNAL_MODULE_ROLES,
} from "./types";

export const signalCategorySchema = z.enum(SIGNAL_CATEGORIES);
export const signalDeliveryMethodSchema = z.enum(SIGNAL_DELIVERY_METHODS);
export const signalModuleCategorySchema = z.enum(SIGNAL_MODULE_CATEGORIES);
export const signalModuleRoleSchema = z.enum(SIGNAL_MODULE_ROLES);

export const signalModuleSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    name: z.string().min(1),
    shortName: z.string().min(1).optional(),
    description: z.string().min(1),
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    category: signalModuleCategorySchema,
    role: signalModuleRoleSchema,
    instrumentScope: z.literal("multi-instrument"),
    generatedByProductId: readableIdSchema,
    consumedByProductIds: z.array(readableIdSchema).optional(),
    relatedSignalModuleIds: z.array(readableIdSchema).optional(),
    capabilityIds: z.array(readableIdSchema).optional(),
    researchStatus: contentStatusSchema.optional(),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();

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
    marketCategories: z.array(marketCategorySchema).optional(),
    instruments: z.array(instrumentSymbolSchema).optional(),
    instrumentScope: z
      .enum(["single-instrument", "multi-instrument"])
      .optional(),
    signalModuleIds: z.array(readableIdSchema).optional(),
    capabilities: z.array(z.string().min(1)).optional(),
    featuredAssetId: assetReferenceIdSchema.optional(),
    assetIds: z.array(assetReferenceIdSchema).optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    relatedIndicatorIds: z.array(readableIdSchema).optional(),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
