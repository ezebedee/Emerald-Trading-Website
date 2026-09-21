import type { ContentStatus, Slug, Visibility } from "../common";

export const PLATFORM_IDS = [
  "mt4",
  "mt5",
  "tradingview",
  "ninjatrader",
] as const;
export type PlatformId = (typeof PLATFORM_IDS)[number];

export type PlatformDefinition = Readonly<{
  id: PlatformId;
  slug: Slug;
  label: "MT4" | "MT5" | "TradingView" | "NinjaTrader";
  name: string;
  contentStatus: ContentStatus;
  visibility: Visibility;
  tags?: readonly string[];
  notes?: string;
}>;
