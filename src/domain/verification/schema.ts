import { z } from "zod";

import {
  accountReferenceSchema,
  assetReferenceIdSchema,
  contentStatusSchema,
  isoDateStringSchema,
  readableIdSchema,
  slugSchema,
  visibilitySchema,
} from "../common/schema";
import { VERIFICATION_RECORD_TYPES } from "./types";

export const verificationRecordTypeSchema = z.enum(VERIFICATION_RECORD_TYPES);

export const verificationRecordSchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    title: z.string().min(1),
    type: verificationRecordTypeSchema,
    status: contentStatusSchema,
    visibility: visibilitySchema,
    account: accountReferenceSchema.optional(),
    effectiveDate: isoDateStringSchema.optional(),
    evidenceAssetIds: z.array(assetReferenceIdSchema).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
