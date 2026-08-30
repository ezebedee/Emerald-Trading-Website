import type {
  AccountClassification,
  AssetReferenceId,
  ContentStatus,
  ReadableId,
  Slug,
  TradingPlatform,
  Visibility,
} from "../common/types";

export const VERIFICATION_METHODS = [
  "account-reference",
  "platform-screenshot",
  "trade-history",
  "broker-statement",
  "read-only-access",
  "third-party",
  "manual-review",
  "other",
] as const;
export type VerificationMethod = (typeof VERIFICATION_METHODS)[number];

export const VERIFICATION_STATUSES = [
  "available",
  "pending",
  "unavailable",
  "retired",
] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export type VerificationRecord = Readonly<{
  id: ReadableId;
  slug: Slug;
  title: string;
  description: string;
  method: VerificationMethod;
  status: VerificationStatus;
  contentStatus: ContentStatus;
  visibility: Visibility;
  assetIds?: readonly AssetReferenceId[];
  primaryAssetId?: AssetReferenceId;
  relatedLedgerEntryIds?: readonly ReadableId[];
  relatedSystemIds?: readonly ReadableId[];
  accountClassification?: AccountClassification;
  publicAccountNumber?: string;
  brokerName?: string;
  platform?: TradingPlatform;
  externalUrl?: string;
  notes?: string;
}>;
