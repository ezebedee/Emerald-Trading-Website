import { z } from "zod";

import {
  assetReferenceIdSchema,
  instrumentSymbolSchema,
  tradingPlatformSchema,
  videoReferenceIdSchema,
} from "../common/schema";
import { performanceRecordSchema } from "../performance/schema";
import { LEDGER_ENTRY_KINDS } from "./types";

export const ledgerEntryKindSchema = z.enum(LEDGER_ENTRY_KINDS);

export const ledgerEntrySchema = performanceRecordSchema
  .extend({
    kind: ledgerEntryKindSchema,
    instruments: z.array(instrumentSymbolSchema).optional(),
    platform: tradingPlatformSchema.optional(),
    videoReferenceId: videoReferenceIdSchema.optional(),
    mediaAssetIds: z.array(assetReferenceIdSchema).optional(),
  })
  .strict();
