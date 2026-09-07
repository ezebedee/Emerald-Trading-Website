import { z } from "zod";

import { contentStatusSchema, slugSchema, visibilitySchema } from "../common";
import { PLATFORM_IDS } from "./types";

export const platformIdSchema = z.enum(PLATFORM_IDS);

export const platformDefinitionSchema = z
  .object({
    id: platformIdSchema,
    slug: slugSchema,
    label: z.enum(["MT4", "MT5", "TradingView", "NinjaTrader"]),
    name: z.string().min(1),
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
