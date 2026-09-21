import type {
  AssetReferenceId,
  ContentStatus,
  InstrumentSymbol,
  MarketCategory,
  ReadableId,
  RuntimeStatus,
  Slug,
  SystemLifecycleStatus,
  TradingPlatform,
  Visibility,
} from "../common/types";

export type TradingSystem = Readonly<{
  id: ReadableId;
  familyId: ReadableId;
  configurationKey: Slug;
  configurationName: string;
  slug: Slug;
  name: string;
  shortName?: string;
  description: string;
  contentStatus: ContentStatus;
  lifecycleStatus: SystemLifecycleStatus;
  runtimeStatus?: RuntimeStatus;
  visibility: Visibility;
  platforms: readonly TradingPlatform[];
  marketCategories: readonly MarketCategory[];
  instruments?: readonly InstrumentSymbol[];
  capabilities?: readonly string[];
  featuredAssetId?: AssetReferenceId;
  assetIds?: readonly AssetReferenceId[];
  relatedIndicatorIds?: readonly ReadableId[];
  relatedSignalIds?: readonly ReadableId[];
  performanceRecordIds?: readonly ReadableId[];
  tags?: readonly string[];
  notes?: string;
}>;
