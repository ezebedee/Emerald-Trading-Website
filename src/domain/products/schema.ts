import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  readableIdSchema,
  slugSchema,
  visibilitySchema,
} from "../common";
import { platformIdSchema } from "../platforms";
import {
  PLATFORM_AVAILABILITY_STATUSES,
  PLATFORM_DOCUMENTATION_STATUSES,
  PRODUCT_ACCESS_MODELS,
  PRODUCT_LAYERS,
  PRODUCT_PLATFORM_CAPABILITY_IDS,
  PRODUCT_RELATIONSHIP_TYPES,
} from "./types";

export const productAccessModelSchema = z.enum(PRODUCT_ACCESS_MODELS);
export const productLayerSchema = z.enum(PRODUCT_LAYERS);
export const productRelationshipTypeSchema = z.enum(PRODUCT_RELATIONSHIP_TYPES);
export const platformAvailabilityStatusSchema = z.enum(
  PLATFORM_AVAILABILITY_STATUSES,
);
export const platformDocumentationStatusSchema = z.enum(
  PLATFORM_DOCUMENTATION_STATUSES,
);
export const productPlatformCapabilityIdSchema = z.enum(
  PRODUCT_PLATFORM_CAPABILITY_IDS,
);

export const tradingProductDefinitionSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    name: z.string().min(1),
    shortName: z.string().min(1).optional(),
    description: z.string().min(1),
    role: z.string().min(1),
    productLayer: productLayerSchema,
    accessModel: productAccessModelSchema,
    visibility: visibilitySchema,
    contentStatus: contentStatusSchema,
    supportedPlatformIds: z.array(platformIdSchema).min(1),
    capabilityIds: z.array(readableIdSchema).optional(),
    signalModuleIds: z.array(readableIdSchema).optional(),
    relatedProductIds: z.array(readableIdSchema).optional(),
    specializedRecordIds: z.array(readableIdSchema).optional(),
    assetIds: z.array(assetReferenceIdSchema).optional(),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();

export const productRelationshipSchema = z
  .object({
    id: readableIdSchema,
    sourceProductId: readableIdSchema,
    targetProductId: readableIdSchema,
    relationshipType: productRelationshipTypeSchema,
    description: z.string().min(1),
  })
  .strict();

export const productPlatformImplementationSchema = z
  .object({
    id: readableIdSchema,
    productId: readableIdSchema,
    platformId: platformIdSchema,
    availability: platformAvailabilityStatusSchema,
    accessModel: productAccessModelSchema,
    capabilityIds: z.array(productPlatformCapabilityIdSchema),
    documentationStatus: platformDocumentationStatusSchema,
    implementationNotes: z.string().min(1).optional(),
    assetIds: z.array(assetReferenceIdSchema).optional(),
  })
  .strict();
