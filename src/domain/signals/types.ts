import type {
  AssetReferenceId,
  ContentStatus,
  ISODateTimeString,
  InstrumentSymbol,
  MarketCategory,
  ReadableId,
  Slug,
  TradingPlatform,
  Visibility,
} from "../common/types";

export const SIGNAL_DIRECTIONS = ["buy", "sell", "neutral"] as const;
export type SignalDirection = (typeof SIGNAL_DIRECTIONS)[number];

export type SignalDefinition = Readonly<{
  id: ReadableId;
  slug: Slug;
  title: string;
  status: ContentStatus;
  visibility: Visibility;
  platform?: TradingPlatform;
  market?: MarketCategory;
  instrument?: InstrumentSymbol;
  direction?: SignalDirection;
  generatedAt?: ISODateTimeString;
  expiresAt?: ISODateTimeString;
  relatedSystemId?: ReadableId;
  relatedIndicatorIds?: readonly ReadableId[];
  screenshotAssetId?: AssetReferenceId;
  notes?: string;
}>;
