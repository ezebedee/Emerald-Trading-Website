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
  "multi-signal",
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

export const SIGNAL_MODULE_CATEGORIES = [
  "trend",
  "high-resolution",
  "scalp",
  "range",
  "synthesis",
  "defensive-helper",
] as const;
export type SignalModuleCategory = (typeof SIGNAL_MODULE_CATEGORIES)[number];

export const SIGNAL_MODULE_ROLES = ["primary", "auxiliary"] as const;
export type SignalModuleRole = (typeof SIGNAL_MODULE_ROLES)[number];

export type SignalModule = Readonly<{
  id: ReadableId;
  slug: Slug;
  name: string;
  shortName?: string;
  description: string;
  contentStatus: ContentStatus;
  visibility: Visibility;
  category: SignalModuleCategory;
  role: SignalModuleRole;
  instrumentScope: "multi-instrument";
  generatedByProductId: ReadableId;
  consumedByProductIds?: readonly ReadableId[];
  relatedSignalModuleIds?: readonly ReadableId[];
  capabilityIds?: readonly ReadableId[];
  researchStatus?: ContentStatus;
  tags?: readonly string[];
  notes?: string;
}>;

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
  marketCategories?: readonly MarketCategory[];
  instruments?: readonly InstrumentSymbol[];
  instrumentScope?: "single-instrument" | "multi-instrument";
  signalModuleIds?: readonly ReadableId[];
  capabilities?: readonly string[];
  featuredAssetId?: AssetReferenceId;
  assetIds?: readonly AssetReferenceId[];
  relatedSystemIds?: readonly ReadableId[];
  relatedIndicatorIds?: readonly ReadableId[];
  tags?: readonly string[];
  notes?: string;
}>;
