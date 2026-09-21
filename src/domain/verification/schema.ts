import { z } from "zod";

import {
  accountClassificationSchema,
  assetReferenceIdSchema,
  contentStatusSchema,
  readableIdSchema,
  slugSchema,
  tradingPlatformSchema,
  visibilitySchema,
} from "../common/schema";
import { VERIFICATION_METHODS, VERIFICATION_STATUSES } from "./types";

export const verificationMethodSchema = z.enum(VERIFICATION_METHODS);
export const verificationStatusSchema = z.enum(VERIFICATION_STATUSES);

export const verificationRecordSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    description: z.string().min(1),
    method: verificationMethodSchema,
    status: verificationStatusSchema,
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    assetIds: z.array(assetReferenceIdSchema).optional(),
    primaryAssetId: assetReferenceIdSchema.optional(),
    relatedLedgerEntryIds: z.array(readableIdSchema).optional(),
    relatedSystemIds: z.array(readableIdSchema).optional(),
    accountClassification: accountClassificationSchema.optional(),
    publicAccountNumber: z.string().min(1).optional(),
    brokerName: z.string().min(1).optional(),
    platform: tradingPlatformSchema.optional(),
    externalUrl: z.string().url().optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
