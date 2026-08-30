import type {
  AccountReference,
  AssetReferenceId,
  ContentStatus,
  ISODateString,
  ReadableId,
  Slug,
  Visibility,
} from "../common/types";

export const VERIFICATION_RECORD_TYPES = [
  "account-reference",
  "statement",
  "trade-history",
  "methodology",
] as const;
export type VerificationRecordType = (typeof VERIFICATION_RECORD_TYPES)[number];

export type VerificationRecord = Readonly<{
  id: ReadableId;
  slug: Slug;
  title: string;
  type: VerificationRecordType;
  status: ContentStatus;
  visibility: Visibility;
  account?: AccountReference;
  effectiveDate?: ISODateString;
  evidenceAssetIds?: readonly AssetReferenceId[];
  notes?: string;
}>;
