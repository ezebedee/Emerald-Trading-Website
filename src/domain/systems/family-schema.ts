import { z } from "zod";

import {
  contentStatusSchema,
  marketCategorySchema,
  readableIdSchema,
  slugSchema,
  visibilitySchema,
} from "../common/schema";

export const tradingSystemFamilySchema = z
  .object({
    id: readableIdSchema,
    slug: slugSchema,
    name: z.string().min(1),
    shortName: z.string().min(1).optional(),
    description: z.string().min(1),
    contentStatus: contentStatusSchema,
    visibility: visibilitySchema,
    marketCategories: z.array(marketCategorySchema).min(1),
    configurationIds: z.array(readableIdSchema).min(1),
    tags: z.array(z.string().min(1)).optional(),
    notes: z.string().min(1).optional(),
  })
  .strict();
