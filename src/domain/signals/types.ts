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

export const SIGNAL_CATEGORIES = [
  "directional",
  "entry",
  "exit",
  "trend",
  "momentum",
  "reversal",
  "risk",
  "other",
] as const;
export type SignalCategory = (typeof SIGNAL_CATEGORIES)[number];

export const SIGNAL_DELIVERY_METHODS = [
  "chart",
  "dashboard",
  "notification",
  "manual",
] as const;
export type SignalDeliveryMethod = (typeof SIGNAL_DELIVERY_METHODS)[number];

export type SignalProduct = Readonly<{
  id: ReadableId;
  slug: Slug;
  name: string;
  shortName?: string;
  description: string;
  contentStatus: ContentStatus;
  visibility: Visibility;
  signalCategory: SignalCategory;
  deliveryMethods?: readonly SignalDeliveryMethod[];
  platforms: readonly TradingPlatform[];
  marketCategories: readonly MarketCategory[];
  instruments?: readonly InstrumentSymbol[];
  capabilities?: readonly string[];
  featuredAssetId?: AssetReferenceId;
  assetIds?: readonly AssetReferenceId[];
  relatedSystemIds?: readonly ReadableId[];
  relatedIndicatorIds?: readonly ReadableId[];
  tags?: readonly string[];
  notes?: string;
}>;
