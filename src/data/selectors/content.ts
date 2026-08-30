import {
  researchEntries,
  verificationRecords,
  videoEntries,
} from "@/data/content";

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
