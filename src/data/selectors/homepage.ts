import type { LedgerEntry } from "@/domain";

import {
  getLedgerMediaContextRecords,
  getLedgerVerificationEvidenceRecords,
} from "./content";
import {
  getEffectiveCumulativeMetrics,
  formatPublicRecordCoverage,
  getLatestPublicPerformanceSummaryFromRecords,
} from "./ledger";
import {
  getHomepageFeaturedIndicator,
  getHomepageFeaturedSignalProduct,
  getPrimaryPublicSystemFamily,
  getPublicLedgerEntriesForConfiguration,
  getPublicTradingSystems,
} from "./products";
import type {
  HomepageFeaturedSystemContext,
  LedgerMediaContextRecord,
  LedgerVerificationEvidenceRecord,
  PerformanceSummary,
} from "./types";

export const homepageFeaturedConfigurationId = "emerald-quant-system";

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

const latestByEndDate = <T extends { endDate: string; id: string }>(
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

export const getHomepageFeaturedConfiguration = () => {
  const family = getPrimaryPublicSystemFamily();

  if (
    !family ||
    !family.configurationIds.includes(homepageFeaturedConfigurationId)
  ) {
    return undefined;
  }

  return getPublicTradingSystems().find(
    (system) =>
      system.id === homepageFeaturedConfigurationId &&
      system.familyId === family.id,
  );
};

export const getHomepageFeaturedSystemContext = ():
  HomepageFeaturedSystemContext | undefined => {
  const family = getPrimaryPublicSystemFamily();
  const configuration = getHomepageFeaturedConfiguration();

  if (!family || !configuration) {
    return undefined;
  }

  const indicator = getHomepageFeaturedIndicator();
  const signal = getHomepageFeaturedSignalProduct();

  return {
    family: {
      id: family.id,
      name: family.name,
      marketCoverage: family.marketCategories.map(
        (category) => marketCategoryLabels[category],
      ),
    },
    configuration: {
      id: configuration.id,
      configurationKey: configuration.configurationKey,
      configurationName: configuration.configurationName,
      name: configuration.name,
      shortName: configuration.shortName,
      systemType: "Algorithmic Trading System",
      status: lifecycleStatusLabels[configuration.lifecycleStatus],
      platforms: configuration.platforms,
      markets: configuration.marketCategories.map(
        (category) => marketCategoryLabels[category],
      ),
      instruments: configuration.instruments ?? [],
      capabilities: configuration.capabilities ?? [],
    },
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

export const getHomepagePerformanceSnapshotForConfiguration = (
  configurationId: string,
): PerformanceSummary | undefined =>
  getLatestPublicPerformanceSummaryFromRecords(
    getPublicLedgerEntriesForConfiguration(configurationId),
  );

export const getHomepageLedgerTeaserEntriesForConfiguration = (
  configurationId: string,
) => {
  const records = getPublicLedgerEntriesForConfiguration(configurationId);
  const selectedEntries: LedgerEntry[] = [];
  const selectedEndDates = new Set<string>();

  const addLatestNonDuplicateEntry = (
    periodType: LedgerEntry["periodType"],
  ) => {
    const entry = latestByEndDate(
      records.filter(
        (candidate) =>
          candidate.periodType === periodType &&
          !selectedEndDates.has(candidate.endDate) &&
          (periodType !== "cumulative" ||
            Boolean(getEffectiveCumulativeMetrics(candidate))),
      ),
    );

    if (entry) {
      selectedEntries.push(entry);
      selectedEndDates.add(entry.endDate);
    }
  };

  addLatestNonDuplicateEntry("cumulative");
  addLatestNonDuplicateEntry("weekly");
  addLatestNonDuplicateEntry("daily");

  return selectedEntries;
};

export const getHomepageVerificationRecordsForConfiguration = (
  configurationId: string,
): readonly LedgerVerificationEvidenceRecord[] => {
  const records = getPublicLedgerEntriesForConfiguration(configurationId);

  return getLedgerVerificationEvidenceRecords({
    ledgerEntryIds: records.map((record) => record.id),
    systemId: configurationId,
  });
};

export const getHomepageVideoPreviewEntriesForConfiguration = (
  configurationId: string,
): readonly LedgerMediaContextRecord[] => {
  const teaserEntries =
    getHomepageLedgerTeaserEntriesForConfiguration(configurationId);

  return getLedgerMediaContextRecords({
    chronologyEntries: teaserEntries.map((entry) => ({
      id: entry.id,
      title: entry.title,
      periodType:
        entry.periodType === "cumulative"
          ? "Cumulative"
          : entry.periodType === "weekly"
            ? "Weekly"
            : "Daily",
      startDate: entry.startDate,
      endDate: entry.endDate,
      coverageLabel: formatPublicRecordCoverage(entry.startDate, entry.endDate),
      accountClassification: "Public Demo Reference Account",
      performanceClassification: "Forward Performance",
      period: {
        netProfit: entry.periodMetrics.netProfit,
        returnPct: entry.periodMetrics.returnPct,
        totalTrades: entry.periodMetrics.totalTrades,
        winRatePct: entry.periodMetrics.winRatePct,
      },
      cumulative: entry.cumulativeMetrics
        ? {
            netProfit: entry.cumulativeMetrics.netProfit,
            returnPct: entry.cumulativeMetrics.returnPct,
          }
        : undefined,
    })),
    systemId: configurationId,
  });
};
