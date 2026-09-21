import { researchItemSchema, type ResearchItem } from "@/domain";

const rawResearchEntries = [
  {
    id: "emerald-quantitative-trading-technology-program",
    slug: "emerald-quantitative-trading-technology-program",
    title: "Emerald Quantitative Trading Technology Program",
    shortTitle: "Emerald Research Program",
    summary:
      "Internal research-program record for the Emerald Legacy Systems quantitative trading technology, covering system design, indicator logic, signal architecture, and public forward-performance analysis.",
    researchType: "research-note",
    publicationStatus: "draft",
    contentStatus: "published",
    visibility: "public",
    relatedSystemIds: ["emerald-quant-system"],
    relatedIndicatorIds: ["emerald-signal-indicator"],
    relatedSignalIds: ["emerald-directional-signal-stream"],
    tags: ["quantitative-trading", "research-program", "systems"],
    notes:
      "No journal, DOI, authorship, publisher, or publication date is recorded until authoritative publication metadata is supplied.",
  },
] as const;

export const researchEntries = researchItemSchema
  .array()
  .parse(rawResearchEntries) as readonly ResearchItem[];

export const emeraldQuantitativeTradingTechnologyProgram = researchEntries[0];
