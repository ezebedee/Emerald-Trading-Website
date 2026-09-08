import type { SignalModule } from "@/domain";

type SignalModulePresentation = Readonly<{
  anchorLabel: string;
  roleLabel: string;
  categoryLabel: string;
  purpose: string;
  distinction: string;
  concept: string;
  caption: string;
}>;

export const signalModulePresentation: Record<
  string,
  SignalModulePresentation
> = {
  "emerald-main-signal": {
    anchorLabel: "Main",
    roleLabel: "Trend-Oriented Primary Signal",
    categoryLabel: "Trend Context",
    purpose:
      "Designed for swing and trend-following trading contexts where broader market direction matters more than rapid signal cadence.",
    distinction:
      "Lower-frequency orientation relative to scalp-focused modules.",
    concept:
      "Used as broader analytical context inside the Emerald Legacy System signal framework.",
    caption: "Main Signal - MT4 example",
  },
  "emerald-finescalp": {
    anchorLabel: "FineScalp",
    roleLabel: "High-Resolution Primary Signal",
    categoryLabel: "Tick / Seconds Context",
    purpose:
      "Designed for tick and seconds-chart analysis in short-horizon, sub-minute analytical contexts.",
    distinction:
      "Highest-resolution signal module in the current Emerald signal library.",
    concept:
      "On MT4 and MT5, Emerald can generate custom high-resolution charts from the underlying market instrument before FineScalp is plotted.",
    caption: "FineScalp - MT4 custom/offline chart example",
  },
  "emerald-scalp-signal": {
    anchorLabel: "Scalp",
    roleLabel: "Short-Horizon Primary Signal",
    categoryLabel: "Scalp Context",
    purpose:
      "Designed for quicker scalp-style opportunities and tighter chart context.",
    distinction:
      "Can produce shorter-horizon signal opportunities more frequently than the broader Main Signal without implying better results.",
    concept:
      "Used as short-horizon analytical context inside the Emerald Legacy System framework.",
    caption: "Scalp Signal - MT4 example",
  },
  "emerald-range-signal": {
    anchorLabel: "Range",
    roleLabel: "Range-Oriented Primary Signal",
    categoryLabel: "Range Context",
    purpose:
      "Designed for range-oriented market context where the current structure is better interpreted through bounded movement.",
    distinction:
      "Provides a different analytical lens from trend and scalp-oriented modules.",
    concept:
      "Used conceptually as range-oriented signal context without disclosing or implying proprietary detection formulas.",
    caption: "Range Signal - MT4 example",
  },
  "emerald-harmonizer": {
    anchorLabel: "Harmonizer",
    roleLabel: "Primary Signal-Synthesis Module",
    categoryLabel: "Synthesis Context",
    purpose:
      "Combines Scalp Signal and Range Signal context into one harmonized signal view.",
    distinction:
      "Represents a synthesis layer, not a disclosed weighting, voting, or probability model.",
    concept:
      "Used to view Scalp and Range context together inside the Emerald signal framework.",
    caption: "Harmonizer - MT4 example",
  },
  "emerald-harmonizer-safe": {
    anchorLabel: "SAFE",
    roleLabel: "Auxiliary Defensive Layer",
    categoryLabel: "Defensive / Reversal Context",
    purpose:
      "Optional auxiliary defensive and reversal context that can help a trader evaluate whether an opposing position may need attention.",
    distinction:
      "Supports a preferred primary signal without being presented as a sixth equivalent primary module.",
    concept:
      "Provides signal context only; execution and trade-management decisions remain separate.",
    caption: "Harmonizer + SAFE - MT4 example",
  },
};

export const getSignalModulePresentation = (module: SignalModule) =>
  signalModulePresentation[module.id] ?? {
    anchorLabel: module.name,
    roleLabel:
      module.role === "auxiliary"
        ? "Auxiliary Signal Module"
        : "Primary Signal Module",
    categoryLabel: module.category
      .split("-")
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(" "),
    purpose: module.description,
    distinction:
      "Part of the public Emerald signal framework without disclosed proprietary formulas.",
    concept:
      "Used as signal context inside the Emerald Legacy System framework.",
    caption: `${module.name} - MT4 example`,
  };
