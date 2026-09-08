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
    featuredAssetId: "indicator-emerald-legacy-mt4-overview",
    assetIds: [
      "indicator-emerald-legacy-mt4-settings",
      "indicator-emerald-legacy-mt4-overview",
      "indicator-emerald-signal-mt4-01",
      "signal-main-mt4-example",
      "signal-finescalp-mt4-offline-example",
      "signal-scalp-mt4-example",
      "signal-range-mt4-example",
      "signal-harmonizer-mt4-example",
      "signal-harmonizer-safe-mt4-example",
    ],
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
