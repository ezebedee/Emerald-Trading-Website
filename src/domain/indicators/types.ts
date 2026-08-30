import type {
  AssetReferenceId,
  ContentStatus,
  MarketCategory,
  ReadableId,
  Slug,
  TradingPlatform,
  Visibility,
} from "../common/types";

export type IndicatorDefinition = Readonly<{
  id: ReadableId;
  slug: Slug;
  name: string;
  summary: string;
  status: ContentStatus;
  visibility: Visibility;
  platforms: readonly TradingPlatform[];
  markets?: readonly MarketCategory[];
  screenshotAssetId?: AssetReferenceId;
  relatedSystemIds?: readonly ReadableId[];
  notes?: string;
}>;
