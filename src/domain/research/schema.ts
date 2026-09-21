import { z } from "zod";

import {
  assetReferenceIdSchema,
  contentStatusSchema,
  readableIdSchema,
  slugSchema,
  visibilitySchema,
} from "../common/schema";
import { RESEARCH_PUBLICATION_STATUSES, RESEARCH_TYPES } from "./types";

export const researchPublicationStatusSchema = z.enum(
  RESEARCH_PUBLICATION_STATUSES,
);

export const researchTypeSchema = z.enum(RESEARCH_TYPES);

export const researchItemSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    shortTitle: z.string().min(1).optional(),
    summary: z.string().min(1),
    researchType: researchTypeSchema,
    publicationStatus: researchPublicationStatusSchema,
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    authors: z.array(z.string().min(1)).optional(),
    venue: z.string().min(1).optional(),
    publicationYear: z.number().int().min(1900).max(2100).optional(),
    doi: z.string().url().optional(),
    publisherUrl: z.string().url().optional(),
    externalUrl: z.string().url().optional(),
    documentAssetId: assetReferenceIdSchema.optional(),
    thumbnailAssetId: assetReferenceIdSchema.optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    relatedIndicatorIds: z.array(readableIdSchema).optional(),
    relatedSignalIds: z.array(readableIdSchema).optional(),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
