import { tradingSystemFamilySchema, type TradingSystemFamily } from "@/domain";

const rawSystemFamilies = [
  {
    id: "emerald-quant-system-family",
    slug: "emerald-quant-system",
    name: "Emerald Quant System",
    shortName: "Emerald Quant",
    description:
      "Quantitative trading-system family developed by Emerald Legacy Systems for systematic market analysis, signal interpretation, risk logic, and automated trade execution across supported asset classes.",
    contentStatus: "published",
    visibility: "public",
    marketCategories: ["metals", "forex", "futures", "equities"],
    configurationIds: ["emerald-quant-system"],
    tags: ["quantitative", "algorithmic", "system-family"],
    notes:
      "Family-level market coverage describes system development scope. Public Forward Performance remains scoped to concrete configuration records.",
  },
] as const;

export const systemFamilies = tradingSystemFamilySchema
  .array()
  .parse(rawSystemFamilies) as readonly TradingSystemFamily[];

export const emeraldQuantSystemFamily = systemFamilies[0];
