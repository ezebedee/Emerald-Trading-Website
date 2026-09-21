import type {
  ContentStatus,
  MarketCategory,
  ReadableId,
  Slug,
  Visibility,
} from "../common/types";
import type { tradingSystemFamilySchema } from "./family-schema";
import type { z } from "zod";

export type TradingSystemFamilyInput = z.input<
  typeof tradingSystemFamilySchema
>;

export type TradingSystemFamily = Readonly<{
  id: ReadableId;
  slug: Slug;
  name: string;
  shortName?: string;
  description: string;
  contentStatus: ContentStatus;
  visibility: Visibility;
  marketCategories: readonly MarketCategory[];
  configurationIds: readonly ReadableId[];
  tags?: readonly string[];
  notes?: string;
}>;
