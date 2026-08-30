import {
  indicators,
  signalProducts,
  systemFamilies,
  tradingSystems,
} from "@/data/products";

import { getAssetById } from "./assets";
import {
  formatPublicRecordCoverage,
  getEffectiveCumulativeMetrics,
  getLedgerEntryById,
} from "./ledger";
import type {
  SystemsPageCapability,
  SystemsPageConfigurationArchitecture,
  SystemsPagePerformanceContext,
  SystemsPagePrimarySystem,
} from "./types";

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

const performanceClassificationLabels = {
  "forward-performance": "Forward Performance",
  backtest: "Backtest",
  simulation: "Simulation",
  "private-live-performance": "Private Performance",
} as const;

const capabilityPresentation: Record<
  string,
  Omit<SystemsPageCapability, "id">
> = {
  "signal interpretation": {
    label: "Signal Interpretation",
    description:
      "Processes signal-generation inputs within the broader system rule set.",
    category: "Input Processing",
  },
  "automated trade execution": {
    label: "Automated Trade Execution",
    description:
      "Applies system rules to automated trade implementation on the supported execution platform.",
    category: "Execution",
  },
  "risk-management logic": {
    label: "Risk-Management Logic",
    description:
      "Applies defined risk-management logic as part of system-level trade handling.",
    category: "System Control",
  },
  "position management": {
    label: "Position Management",
    description:
      "Manages open-position handling within the system's defined rule framework.",
    category: "Trade Management",
  },
  "trade lifecycle management": {
    label: "Trade Lifecycle Management",
    description:
      "Coordinates trade handling across system-defined stages from initiation through closure.",
    category: "Lifecycle Coordination",
  },
};

const titleCaseCapability = (capability: string) =>
  capability
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

const toSystemsPageCapability = (capability: string): SystemsPageCapability => {
  const presentation = capabilityPresentation[capability] ?? {
    label: titleCaseCapability(capability),
    description: "Canonical system capability.",
    category: "System Capability",
  };

  return {
    id: capability,
    ...presentation,
  };
};

const isPublicPublished = <
  T extends { visibility: string; contentStatus: string },
>(
  record: T,
) => record.visibility === "public" && record.contentStatus === "published";

const isPublicForwardPerformance = (entry: {
  visibility: string;
  performanceClassification: string;
}) =>
  entry.visibility === "public" &&
  entry.performanceClassification === "forward-performance";

const latestByEndDateThenId = <T extends { endDate: string; id: string }>(
  entries: readonly T[],
) =>
  entries.reduce<T | undefined>((latest, entry) => {
    if (!latest) {
      return entry;
    }

    const dateSort = entry.endDate.localeCompare(latest.endDate);

    if (dateSort > 0) {
      return entry;
    }

    if (dateSort === 0 && entry.id.localeCompare(latest.id) > 0) {
      return entry;
    }

    return latest;
  }, undefined);

export const getPublicTradingSystems = () =>
  tradingSystems.filter(isPublicPublished);

export const getPublicSystemFamilies = () =>
  systemFamilies.filter(isPublicPublished);

export const getSystemFamilyById = (id: string) =>
  systemFamilies.find((family) => family.id === id);

export const getPrimaryPublicSystemFamily = () =>
  getPublicSystemFamilies().find(
    (family) => family.id === "emerald-quant-system-family",
  );

export const getPublicConfigurationsForFamily = (familyId: string) =>
  getPublicTradingSystems().filter((system) => system.familyId === familyId);

export const getSystemsPageConfigurationArchitecture = ():
  SystemsPageConfigurationArchitecture | undefined => {
  const family = getPrimaryPublicSystemFamily();

  if (!family) {
    return undefined;
  }

  const publicConfigurationsById = new Map(
    getPublicConfigurationsForFamily(family.id).map((system) => [
      system.id,
      system,
    ]),
  );
  const configurations = family.configurationIds
    .map((id) => publicConfigurationsById.get(id))
    .filter((system): system is NonNullable<typeof system> => Boolean(system))
    .map((system) => {
      const publicPerformanceRecords = getPublicPerformanceRecordsForSystem(
        system.id,
      );

      return {
        id: system.id,
        configurationName: system.configurationName,
        markets: system.marketCategories.map(
          (category) => marketCategoryLabels[category],
        ),
        instruments: system.instruments ?? [],
        platforms: system.platforms,
        lifecycleStatus: lifecycleStatusLabels[system.lifecycleStatus],
        publicRecordLabel: publicPerformanceRecords.length
          ? "Emerald Ledger"
          : undefined,
      };
    });

  return {
    familyId: family.id,
    familyName: family.name,
    familyMarketCoverage: family.marketCategories.map(
      (category) => marketCategoryLabels[category],
    ),
    configurations,
  };
};

export const getHomepageFeaturedTradingSystem = () =>
  getPublicTradingSystems().find(
    (system) => system.id === "emerald-quant-system",
  );

export const getSystemsPagePrimarySystem = ():
  SystemsPagePrimarySystem | undefined => {
  const system = getPublicTradingSystems().find(
    (candidate) => candidate.id === "emerald-quant-system",
  );
  const family = system ? getSystemFamilyById(system.familyId) : undefined;

  if (!system || !family || !isPublicPublished(family)) {
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
    family: {
      id: family.id,
      name: family.name,
      marketCoverage: family.marketCategories.map(
        (category) => marketCategoryLabels[category],
      ),
    },
    configurationKey: system.configurationKey,
    configurationName: system.configurationName,
    name: system.name,
    shortName: system.shortName,
    systemType: "Algorithmic Trading System",
    status: lifecycleStatusLabels[system.lifecycleStatus],
    platforms: system.platforms,
    markets: system.marketCategories.map(
      (category) => marketCategoryLabels[category],
    ),
    instruments: system.instruments ?? [],
    capabilities: (system.capabilities ?? []).map(toSystemsPageCapability),
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

export const getPublicPerformanceRecordsForSystem = (systemId: string) =>
  getPerformanceRecordsForSystem(systemId).filter(isPublicForwardPerformance);

export const getSystemsPagePerformanceContext = (
  systemId: string,
): SystemsPagePerformanceContext | undefined => {
  const system = getPublicTradingSystems().find(
    (candidate) => candidate.id === systemId,
  );
  const family = system ? getSystemFamilyById(system.familyId) : undefined;

  if (!system || !family || !isPublicPublished(family)) {
    return undefined;
  }

  const publicRecords = getPublicPerformanceRecordsForSystem(system.id);
  const latestCumulativeRecord = latestByEndDateThenId(
    publicRecords.filter((entry) => entry.periodType === "cumulative"),
  );
  const metrics = latestCumulativeRecord
    ? getEffectiveCumulativeMetrics(latestCumulativeRecord)
    : undefined;

  return {
    systemId: system.id,
    familyId: family.id,
    familyName: family.name,
    familyMarketCoverage: family.marketCategories.map(
      (category) => marketCategoryLabels[category],
    ),
    configurationName: system.configurationName,
    configurationMarkets: system.marketCategories.map(
      (category) => marketCategoryLabels[category],
    ),
    configurationInstruments: system.instruments ?? [],
    platforms: system.platforms,
    lifecycleStatus: lifecycleStatusLabels[system.lifecycleStatus],
    performanceClassification:
      performanceClassificationLabels["forward-performance"],
    latestCumulativeRecord:
      latestCumulativeRecord && metrics
        ? {
            id: latestCumulativeRecord.id,
            title: latestCumulativeRecord.title,
            coverageLabel: formatPublicRecordCoverage(
              latestCumulativeRecord.startDate,
              latestCumulativeRecord.endDate,
            ),
            metrics: [
              {
                label: "Cumulative Net Profit",
                value: metrics.netProfit,
                kind: "currency",
              },
              {
                label: "Cumulative Return",
                value: metrics.returnPct,
                kind: "percentage",
              },
              {
                label: "Total Trades",
                value: metrics.totalTrades,
                kind: "count",
              },
              {
                label: "Win Rate",
                value: metrics.winRatePct,
                kind: "percentage",
              },
              {
                label: "Maximum Drawdown",
                value: metrics.maxDrawdownPct,
                kind: "percentage",
              },
            ],
          }
        : undefined,
    publicRecordCount: publicRecords.length,
  };
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
