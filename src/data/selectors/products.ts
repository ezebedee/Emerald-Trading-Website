import { indicators, signalProducts, tradingSystems } from "@/data/products";

import { getAssetById } from "./assets";
import { getLedgerEntryById } from "./ledger";
import type { SystemsPagePrimarySystem } from "./types";

const lifecycleStatusLabels = {
  research: "Research",
  testing: "Testing",
  "public-forward-test": "Public Forward Test",
  "private-production": "Private Production",
  retired: "Retired",
} as const;

const marketCategoryLabels = {
  metals: "Metals",
  forex: "Forex",
  indices: "Indices",
  equities: "Equities",
  options: "Options",
  futures: "Futures",
  cfds: "CFDs",
  crypto: "Crypto",
  other: "Other",
} as const;

const isPublicPublished = <
  T extends { visibility: string; contentStatus: string },
>(
  record: T,
) => record.visibility === "public" && record.contentStatus === "published";

export const getPublicTradingSystems = () =>
  tradingSystems.filter(isPublicPublished);

export const getHomepageFeaturedTradingSystem = () =>
  getPublicTradingSystems().find(
    (system) => system.id === "emerald-quant-system",
  );

export const getSystemsPagePrimarySystem = ():
  SystemsPagePrimarySystem | undefined => {
  const system = getPublicTradingSystems().find(
    (candidate) => candidate.id === "emerald-quant-system",
  );

  if (!system) {
    return undefined;
  }

  const indicator = getPublicIndicatorsForSystem(system.id).find(
    (candidate) => candidate.id === "emerald-signal-indicator",
  );
  const signal = getPublicSignalsForSystem(system.id).find(
    (candidate) => candidate.id === "emerald-directional-signal-stream",
  );

  return {
    id: system.id,
    name: system.name,
    shortName: system.shortName,
    systemType: "Algorithmic Trading System",
    status: lifecycleStatusLabels[system.lifecycleStatus],
    platforms: system.platforms,
    markets: system.marketCategories.map(
      (category) => marketCategoryLabels[category],
    ),
    instruments: system.instruments ?? [],
    relatedIndicator: indicator
      ? {
          id: indicator.id,
          name: indicator.name,
          role: "Chart-based analytical and signal-generation input.",
          href: "/indicators",
        }
      : undefined,
    relatedSignal: signal
      ? {
          id: signal.id,
          name: signal.name,
          role: "Directional signal context for the system layer.",
          href: "/signals",
        }
      : undefined,
    publicRecordLabel: "Emerald Ledger",
  };
};

export const getPublicIndicators = () => indicators.filter(isPublicPublished);

export const getHomepageFeaturedIndicator = () =>
  getPublicIndicators().find(
    (indicator) => indicator.id === "emerald-signal-indicator",
  );

export const getPublicSignalProducts = () =>
  signalProducts.filter(isPublicPublished);

export const getHomepageFeaturedSignalProduct = () =>
  getPublicSignalProducts().find(
    (signalProduct) => signalProduct.id === "emerald-directional-signal-stream",
  );

export const getTradingSystemById = (id: string) =>
  tradingSystems.find((system) => system.id === id);

export const getIndicatorById = (id: string) =>
  indicators.find((indicator) => indicator.id === id);

export const getSignalProductById = (id: string) =>
  signalProducts.find((signalProduct) => signalProduct.id === id);

export const getTradingSystemBySlug = (slug: string) =>
  tradingSystems.find((system) => system.slug === slug);

export const getIndicatorBySlug = (slug: string) =>
  indicators.find((indicator) => indicator.slug === slug);

export const getSignalProductBySlug = (slug: string) =>
  signalProducts.find((signalProduct) => signalProduct.slug === slug);

export const getIndicatorsForSystem = (systemId: string) => {
  const system = getTradingSystemById(systemId);

  return (system?.relatedIndicatorIds ?? [])
    .map(getIndicatorById)
    .filter((indicator): indicator is NonNullable<typeof indicator> =>
      Boolean(indicator),
    );
};

export const getPublicIndicatorsForSystem = (systemId: string) =>
  getIndicatorsForSystem(systemId).filter(isPublicPublished);

export const getSignalsForSystem = (systemId: string) => {
  const system = getTradingSystemById(systemId);

  return (system?.relatedSignalIds ?? [])
    .map(getSignalProductById)
    .filter((signal): signal is NonNullable<typeof signal> => Boolean(signal));
};

export const getPublicSignalsForSystem = (systemId: string) =>
  getSignalsForSystem(systemId).filter(isPublicPublished);

export const getSystemsForIndicator = (indicatorId: string) => {
  const indicator = getIndicatorById(indicatorId);

  return (indicator?.relatedSystemIds ?? [])
    .map(getTradingSystemById)
    .filter((system): system is NonNullable<typeof system> => Boolean(system));
};

export const getPublicSystemsForIndicator = (indicatorId: string) =>
  getSystemsForIndicator(indicatorId).filter(isPublicPublished);

export const getSignalsForIndicator = (indicatorId: string) => {
  const indicator = getIndicatorById(indicatorId);

  return (indicator?.relatedSignalIds ?? [])
    .map(getSignalProductById)
    .filter((signal): signal is NonNullable<typeof signal> => Boolean(signal));
};

export const getPublicSignalsForIndicator = (indicatorId: string) =>
  getSignalsForIndicator(indicatorId).filter(isPublicPublished);

export const getSystemsForSignal = (signalId: string) => {
  const signal = getSignalProductById(signalId);

  return (signal?.relatedSystemIds ?? [])
    .map(getTradingSystemById)
    .filter((system): system is NonNullable<typeof system> => Boolean(system));
};

export const getPublicSystemsForSignal = (signalId: string) =>
  getSystemsForSignal(signalId).filter(isPublicPublished);

export const getIndicatorsForSignal = (signalId: string) => {
  const signal = getSignalProductById(signalId);

  return (signal?.relatedIndicatorIds ?? [])
    .map(getIndicatorById)
    .filter((indicator): indicator is NonNullable<typeof indicator> =>
      Boolean(indicator),
    );
};

export const getPublicIndicatorsForSignal = (signalId: string) =>
  getIndicatorsForSignal(signalId).filter(isPublicPublished);

export const getPerformanceRecordsForSystem = (systemId: string) => {
  const system = getTradingSystemById(systemId);

  return (system?.performanceRecordIds ?? [])
    .map(getLedgerEntryById)
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
};

export const getFeaturedAssetForSystem = (systemId: string) => {
  const system = getTradingSystemById(systemId);

  return system?.featuredAssetId
    ? getAssetById(system.featuredAssetId)
    : undefined;
};

export const getFeaturedAssetForIndicator = (indicatorId: string) => {
  const indicator = getIndicatorById(indicatorId);

  return indicator?.featuredAssetId
    ? getAssetById(indicator.featuredAssetId)
    : undefined;
};

export const getFeaturedAssetForSignal = (signalId: string) => {
  const signal = getSignalProductById(signalId);

  return signal?.featuredAssetId
    ? getAssetById(signal.featuredAssetId)
    : undefined;
};
