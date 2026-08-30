import type {
  AssetReferenceId,
  ContentStatus,
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
  slug: Slug;
  name: string;
  summary: string;
  status: ContentStatus;
  lifecycleStatus: SystemLifecycleStatus;
  runtimeStatus?: RuntimeStatus;
  visibility: Visibility;
  platforms: readonly TradingPlatform[];
  markets: readonly MarketCategory[];
  primaryAssetId?: AssetReferenceId;
  relatedIndicatorIds?: readonly ReadableId[];
  notes?: string;
}>;
