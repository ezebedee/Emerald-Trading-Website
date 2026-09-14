import { getLedgerVerificationEvidenceRecords } from "./content";
import {
  getDefaultPublicLedgerConfiguration,
  getLatestPublicCumulativeLedgerRecordForConfiguration,
  getPublicLedgerEntriesForConfiguration,
} from "./products";

export const notDocumented = "Not documented";

export function formatEvidenceMetric(
  value: number | undefined,
  kind: "percentage" | "count",
) {
  if (value === undefined || !Number.isFinite(value)) return notDocumented;
  return kind === "percentage"
    ? `${value.toFixed(2)}%`
    : new Intl.NumberFormat("en-US").format(value);
}

// Only expose presentation fields from records owned by the selected public configuration.
export function getPublicPerformanceEvidence() {
  const configuration = getDefaultPublicLedgerConfiguration();
  const entries = configuration
    ? getPublicLedgerEntriesForConfiguration(configuration.id)
    : [];
  const snapshot = configuration
    ? getLatestPublicCumulativeLedgerRecordForConfiguration(configuration.id)
    : undefined;
  const source = entries.find((entry) => entry.id === snapshot?.recordId);

  return {
    system: configuration?.name ?? notDocumented,
    configuration: configuration?.configurationName ?? notDocumented,
    instruments: configuration?.instruments?.join(" / ") || notDocumented,
    platforms: configuration?.platforms.join(" / ") || notDocumented,
    snapshot:
      snapshot && source
        ? {
            id: source.id,
            title: snapshot.title,
            period: snapshot.coverageLabel,
            endDate: source.endDate,
            returnPct: snapshot.returnPct,
            maxDrawdownPct: snapshot.maxDrawdownPct,
            totalTrades: snapshot.totalTrades,
          }
        : undefined,
    documentation: configuration
      ? getLedgerVerificationEvidenceRecords({
          systemId: configuration.id,
          ledgerEntryIds: entries.map((entry) => entry.id),
        })
      : [],
  };
}
