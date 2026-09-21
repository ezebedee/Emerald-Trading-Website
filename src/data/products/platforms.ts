import {
  platformDefinitionSchema,
  type PlatformDefinition,
} from "@/domain/platforms";

const rawPlatformDefinitions = [
  {
    id: "mt4",
    slug: "mt4",
    label: "MT4",
    name: "MT4",
    contentStatus: "published",
    visibility: "public",
    tags: ["metatrader", "platform"],
  },
  {
    id: "mt5",
    slug: "mt5",
    label: "MT5",
    name: "MT5",
    contentStatus: "published",
    visibility: "public",
    tags: ["metatrader", "platform"],
  },
  {
    id: "tradingview",
    slug: "tradingview",
    label: "TradingView",
    name: "TradingView",
    contentStatus: "published",
    visibility: "public",
    tags: ["charting", "platform"],
  },
  {
    id: "ninjatrader",
    slug: "ninjatrader",
    label: "NinjaTrader",
    name: "NinjaTrader",
    contentStatus: "published",
    visibility: "public",
    tags: ["platform"],
  },
] as const;

export const platformDefinitions = platformDefinitionSchema
  .array()
  .parse(rawPlatformDefinitions) as readonly PlatformDefinition[];
