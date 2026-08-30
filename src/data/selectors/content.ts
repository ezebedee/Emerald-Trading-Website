import {
  researchEntries,
  verificationRecords,
  videoEntries,
} from "@/data/content";
import { getPublicLedgerChronologyEntries } from "@/data/selectors/ledger";
import type {
  LedgerMediaContextRecord,
  LedgerVerificationEvidenceRecord,
} from "@/data/selectors/types";

const ledgerVerificationEvidenceRecordIds = [
  "public-demo-reference-account",
  "public-demo-read-only-access",
] as const;

const verificationStatusLabels = {
  available: "Available",
  pending: "Pending",
  unavailable: "Unavailable",
  retired: "Retired",
} as const;

const accountClassificationLabels = {
  "public-demo-reference": "Public Demo Reference Account",
  "private-live": "Private Account",
  backtest: "Backtest",
  simulation: "Simulation",
} as const;

const ledgerVerificationDescriptions = {
  "public-demo-reference-account":
    "Supporting account-reference information identifies the public demo record associated with the Ledger.",
  "public-demo-read-only-access":
    "Read-only review access may be provided separately for review without trading control.",
} as const;

const videoPlatformLabels = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  internal: "Internal",
  other: "Other",
} as const;

const isPublicPublished = <
  T extends { visibility: string; contentStatus: string },
>(
  record: T,
) => record.visibility === "public" && record.contentStatus === "published";

export const getPublicResearchEntries = () =>
  researchEntries.filter(isPublicPublished);

export const getHomepageFeaturedResearch = () =>
  getPublicResearchEntries().find(
    (entry) => entry.id === "emerald-quantitative-trading-technology-program",
  );

export const getPublicVideoEntries = () =>
  videoEntries.filter(isPublicPublished);

export const getHomepageVideoPreviewEntries = () => {
  const publicVideos = getPublicVideoEntries();
  const previewVideoIds = [
    "emerald-ledger-cumulative-two-weeks-video",
    "emerald-ledger-week-01-video",
    "emerald-ledger-day-003-video",
  ] as const;

  return previewVideoIds
    .map((id) => publicVideos.find((entry) => entry.id === id))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
};

const trimLedgerTitle = (title: string) =>
  title.replace(/^Emerald Ledger\s*-\s*/i, "");

const getVideoAvailabilityState = (record: {
  externalUrl?: string;
  externalVideoId?: string;
}) =>
  record.externalUrl || record.externalVideoId
    ? "External video link available"
    : "External video link pending";

export const getLedgerMediaContextRecords = (): LedgerMediaContextRecord[] => {
  const chronologyEntries = getPublicLedgerChronologyEntries();
  const chronologyById = new Map(
    chronologyEntries.map((entry, index) => [entry.id, { entry, index }]),
  );
  const records: Array<{
    record: LedgerMediaContextRecord;
    sortIndex: number;
  }> = [];

  for (const video of getPublicVideoEntries()) {
    const relatedLedgerEntries = (video.relatedLedgerEntryIds ?? [])
      .map((id) => chronologyById.get(id))
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .toSorted((first, second) => first.index - second.index);
    const primaryRelated = relatedLedgerEntries[0];

    if (!primaryRelated) {
      continue;
    }

    const relatedLedgerTitle = trimLedgerTitle(primaryRelated.entry.title);

    records.push({
      record: {
        id: video.id,
        title: trimLedgerTitle(video.title),
        videoPlatform: videoPlatformLabels[video.videoPlatform],
        relatedLedgerEntryId: primaryRelated.entry.id,
        relatedLedgerTitle,
        relatedLedgerPeriodType: primaryRelated.entry.periodType,
        relatedLedgerCoverageLabel: primaryRelated.entry.coverageLabel,
        availabilityState: getVideoAvailabilityState(video),
        description: `Supporting video record associated with the ${relatedLedgerTitle} public Ledger update.`,
      },
      sortIndex: primaryRelated.index,
    });
  }

  return records
    .toSorted(
      (first, second) =>
        first.sortIndex - second.sortIndex ||
        first.record.id.localeCompare(second.record.id),
    )
    .map(({ record }) => record);
};

export const getPublicVerificationRecords = () =>
  verificationRecords.filter(isPublicPublished);

export const getHomepageVerificationRecords = () => {
  const publicRecords = getPublicVerificationRecords();
  const homepageRecordIds = [
    "public-demo-reference-account",
    "public-demo-read-only-access",
  ] as const;

  return homepageRecordIds
    .map((id) => publicRecords.find((record) => record.id === id))
    .filter((record): record is NonNullable<typeof record> => Boolean(record));
};

export const getLedgerVerificationEvidenceRecords =
  (): LedgerVerificationEvidenceRecord[] => {
    const publicRecords = getPublicVerificationRecords();

    return ledgerVerificationEvidenceRecordIds
      .map((id) => publicRecords.find((record) => record.id === id))
      .filter((record): record is NonNullable<typeof record> => Boolean(record))
      .map((record) => ({
        id: record.id,
        title: record.title,
        method:
          record.id === "public-demo-reference-account"
            ? "Account Reference"
            : "Read-Only Review Access",
        status: verificationStatusLabels[record.status],
        accountClassification: record.accountClassification
          ? accountClassificationLabels[record.accountClassification]
          : undefined,
        description:
          record.id === "public-demo-reference-account"
            ? ledgerVerificationDescriptions["public-demo-reference-account"]
            : ledgerVerificationDescriptions["public-demo-read-only-access"],
        relatedLedgerRecordScope: record.relatedLedgerEntryIds?.length
          ? "Associated with the current public Ledger history."
          : undefined,
      }));
  };

export const getResearchEntryById = (id: string) =>
  researchEntries.find((entry) => entry.id === id);

export const getResearchEntryBySlug = (slug: string) =>
  researchEntries.find((entry) => entry.slug === slug);

export const getVideoEntryById = (id: string) =>
  videoEntries.find((entry) => entry.id === id);

export const getVideoEntryBySlug = (slug: string) =>
  videoEntries.find((entry) => entry.slug === slug);

export const getVerificationRecordById = (id: string) =>
  verificationRecords.find((record) => record.id === id);

export const getVerificationRecordBySlug = (slug: string) =>
  verificationRecords.find((record) => record.slug === slug);

export const getVideosForLedgerEntry = (ledgerEntryId: string) =>
  getPublicVideoEntries().filter((entry) =>
    entry.relatedLedgerEntryIds?.includes(ledgerEntryId),
  );

export const getVerificationForLedgerEntry = (ledgerEntryId: string) =>
  getPublicVerificationRecords().filter((record) =>
    record.relatedLedgerEntryIds?.includes(ledgerEntryId),
  );

export const getVerificationForSystem = (systemId: string) =>
  getPublicVerificationRecords().filter((record) =>
    record.relatedSystemIds?.includes(systemId),
  );

export const getResearchForSystem = (systemId: string) =>
  getPublicResearchEntries().filter((entry) =>
    entry.relatedSystemIds?.includes(systemId),
  );

export const getResearchForIndicator = (indicatorId: string) =>
  getPublicResearchEntries().filter((entry) =>
    entry.relatedIndicatorIds?.includes(indicatorId),
  );

export const getResearchForSignal = (signalId: string) =>
  getPublicResearchEntries().filter((entry) =>
    entry.relatedSignalIds?.includes(signalId),
  );
