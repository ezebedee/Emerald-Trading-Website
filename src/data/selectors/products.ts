import { indicators, signalProducts, tradingSystems } from "@/data/products";

import { getAssetById } from "./assets";
import { getLedgerEntryById } from "./ledger";

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
