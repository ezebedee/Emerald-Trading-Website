import { indicatorDefinitionSchema, type IndicatorDefinition } from "@/domain";

const rawIndicators = [
  {
    id: "emerald-signal-indicator",
    slug: "emerald-signal-indicator",
    name: "Emerald Legacy System",
    shortName: "Unified Multi-Signal Indicator",
    description:
      "Unified multi-signal indicator product developed by Emerald Legacy Systems for chart-based signal analysis and directional signal visualization across supported platforms.",
    contentStatus: "published",
    visibility: "public",
    platforms: ["MT4", "MT5", "TradingView", "NinjaTrader"],
    instrumentScope: "multi-instrument",
    capabilities: [
      "multi-signal framework",
      "directional signal markers",
      "chart-based signal visualization",
      "FineScalp high-resolution signal support",
      "primary and auxiliary signal modules",
    ],
    featuredAssetId: "indicator-emerald-signal-mt4-01",
    assetIds: ["indicator-emerald-signal-mt4-01"],
    relatedSystemIds: ["emerald-quant-system"],
    relatedSignalIds: ["emerald-directional-signal-stream"],
    tags: ["signals", "indicator", "chart-analysis", "multi-instrument"],
    notes:
      "Stable legacy ID preserved for backward compatibility. Ledger performance attribution remains attached to the Quant System configuration and account records, not to the indicator product.",
  },
] as const;

export const indicators = indicatorDefinitionSchema
  .array()
  .parse(rawIndicators) as readonly IndicatorDefinition[];

export const emeraldSignalIndicator = indicators[0];
