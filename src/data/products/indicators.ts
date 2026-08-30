import { indicatorDefinitionSchema, type IndicatorDefinition } from "@/domain";

const rawIndicators = [
  {
    id: "emerald-signal-indicator",
    slug: "emerald-signal-indicator",
    name: "Emerald Signal Indicator",
    description:
      "Signal-generating trading indicator developed by Emerald Legacy Systems for chart-based market analysis and directional trade-signal visualization.",
    contentStatus: "published",
    visibility: "public",
    platforms: ["MT4", "MT5", "TradingView"],
    marketCategories: ["metals"],
    instruments: ["XAUUSD"],
    capabilities: [
      "directional signal markers",
      "chart-based signal visualization",
      "pip annotations",
      "trade setup visualization",
    ],
    featuredAssetId: "indicator-emerald-signal-mt4-01",
    assetIds: ["indicator-emerald-signal-mt4-01"],
    relatedSystemIds: ["emerald-quant-system"],
    relatedSignalIds: ["emerald-directional-signal-stream"],
    tags: ["signals", "indicator", "chart-analysis", "xauusd"],
    notes:
      "Public indicator catalog record. Ledger performance attribution remains attached to the system and account records, not to the indicator alone.",
  },
] as const;

export const indicators = indicatorDefinitionSchema
  .array()
  .parse(rawIndicators) as readonly IndicatorDefinition[];

export const emeraldSignalIndicator = indicators[0];
