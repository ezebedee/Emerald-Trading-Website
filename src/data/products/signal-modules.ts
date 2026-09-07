import { signalModuleSchema, type SignalModule } from "@/domain/signals";

const rawSignalModules = [
  {
    id: "emerald-main-signal",
    slug: "main",
    name: "Main Signal",
    description:
      "Trend-oriented signal module within the Emerald Legacy System signal framework.",
    contentStatus: "published",
    visibility: "public",
    category: "trend",
    role: "primary",
    instrumentScope: "multi-instrument",
    generatedByProductId: "emerald-legacy-system",
    consumedByProductIds: ["emerald-signal-scanner"],
    tags: ["signal-module", "trend"],
    notes:
      "Generation logic, entry conditions, exit conditions, and timeframe guidance have not yet been supplied.",
  },
  {
    id: "emerald-finescalp",
    slug: "finescalp",
    name: "FineScalp",
    description:
      "High-resolution tick / seconds-chart signal module within the Emerald Legacy System signal framework.",
    contentStatus: "published",
    visibility: "public",
    category: "high-resolution",
    role: "primary",
    instrumentScope: "multi-instrument",
    generatedByProductId: "emerald-legacy-system",
    consumedByProductIds: ["emerald-signal-scanner"],
    capabilityIds: ["finescalp-high-resolution-chart-builder"],
    tags: ["signal-module", "high-resolution"],
    notes:
      "FineScalp signal-generation logic has not yet been supplied. MT4/MT5 high-resolution chart support is modeled at the product-platform implementation layer.",
  },
  {
    id: "emerald-scalp-signal",
    slug: "scalp",
    name: "Scalp Signal",
    description:
      "Short-horizon scalping-oriented signal module within the Emerald Legacy System signal framework.",
    contentStatus: "published",
    visibility: "public",
    category: "scalp",
    role: "primary",
    instrumentScope: "multi-instrument",
    generatedByProductId: "emerald-legacy-system",
    consumedByProductIds: ["emerald-signal-scanner"],
    tags: ["signal-module", "scalp"],
    notes:
      "Scalp Signal generation methodology and platform-specific settings have not yet been supplied.",
  },
  {
    id: "emerald-range-signal",
    slug: "range",
    name: "Range Signal",
    description:
      "Range-oriented signal module within the Emerald Legacy System signal framework.",
    contentStatus: "published",
    visibility: "public",
    category: "range",
    role: "primary",
    instrumentScope: "multi-instrument",
    generatedByProductId: "emerald-legacy-system",
    consumedByProductIds: ["emerald-signal-scanner"],
    tags: ["signal-module", "range"],
    notes:
      "Range logic, support/resistance logic, oscillator logic, and mean-reversion logic have not yet been supplied.",
  },
  {
    id: "emerald-harmonizer",
    slug: "harmonizer",
    name: "Harmonizer",
    description:
      "Signal-synthesis module that combines Scalp Signal and Range Signal outputs inside the Emerald signal framework.",
    contentStatus: "published",
    visibility: "public",
    category: "synthesis",
    role: "primary",
    instrumentScope: "multi-instrument",
    generatedByProductId: "emerald-legacy-system",
    consumedByProductIds: ["emerald-signal-scanner"],
    relatedSignalModuleIds: ["emerald-scalp-signal", "emerald-range-signal"],
    tags: ["signal-module", "synthesis"],
    notes:
      "Combination logic has not yet been supplied; no weighting, voting, agreement, sequential, or probabilistic behavior is implied.",
  },
  {
    id: "emerald-harmonizer-safe",
    slug: "harmonizer-safe",
    name: "Harmonizer SAFE",
    description:
      "Auxiliary defensive helper signal module that may be enabled alongside a preferred primary signal.",
    contentStatus: "published",
    visibility: "public",
    category: "defensive-helper",
    role: "auxiliary",
    instrumentScope: "multi-instrument",
    generatedByProductId: "emerald-legacy-system",
    consumedByProductIds: ["emerald-signal-scanner"],
    relatedSignalModuleIds: ["emerald-harmonizer"],
    tags: ["signal-module", "defensive-helper"],
    notes:
      "Harmonizer SAFE can support defensive or exit-style context but does not guarantee loss prevention or recovery.",
  },
] as const;

export const signalModules = signalModuleSchema
  .array()
  .parse(rawSignalModules) as readonly SignalModule[];
