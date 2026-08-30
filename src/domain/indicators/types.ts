import type {
  AssetReferenceId,
  ContentStatus,
  InstrumentSymbol,
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
  shortName?: string;
  description: string;
  contentStatus: ContentStatus;
  visibility: Visibility;
  platforms: readonly TradingPlatform[];
  marketCategories: readonly MarketCategory[];
  instruments?: readonly InstrumentSymbol[];
  capabilities?: readonly string[];
  featuredAssetId?: AssetReferenceId;
  assetIds?: readonly AssetReferenceId[];
  relatedSystemIds?: readonly ReadableId[];
  relatedSignalIds?: readonly ReadableId[];
  tags?: readonly string[];
  notes?: string;
}>;
