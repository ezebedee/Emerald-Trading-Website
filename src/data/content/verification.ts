import { verificationRecordSchema, type VerificationRecord } from "@/domain";
import { publicLedgerAccount } from "@/data/ledger";

const rawVerificationRecords = [
  {
    id: "public-demo-reference-account",
    slug: "public-demo-reference-account",
    title: "Public Demo Reference Account",
    description:
      "Reference-account information supporting identification of the public Emerald Ledger demo account.",
    method: "account-reference",
    status: "available",
    contentStatus: "published",
    visibility: "public",
    primaryAssetId: "public-demo-reference-account-info",
    assetIds: ["public-demo-reference-account-info"],
    relatedLedgerEntryIds: [
      "day-001",
      "day-002",
      "day-003",
      "week-01",
      "week-02",
      "cumulative-2-weeks",
    ],
    relatedSystemIds: ["emerald-quant-system"],
    accountClassification: publicLedgerAccount.accountClassification,
    publicAccountNumber: publicLedgerAccount.publicAccountNumber,
    brokerName: publicLedgerAccount.brokerName,
    platform: publicLedgerAccount.platform,
    notes:
      "Public reference-account evidence only. No passwords, investor credentials, API keys, or third-party verification claims are stored.",
  },
  {
    id: "public-demo-read-only-access",
    slug: "public-demo-read-only-access",
    title: "Public Demo Read-Only Access",
    description:
      "Read-only verification access availability for reviewing the public Emerald Ledger demo account through separately provided credentials.",
    method: "read-only-access",
    status: "available",
    contentStatus: "published",
    visibility: "public",
    relatedLedgerEntryIds: [
      "day-001",
      "day-002",
      "day-003",
      "week-01",
      "week-02",
      "cumulative-2-weeks",
    ],
    relatedSystemIds: ["emerald-quant-system"],
    accountClassification: publicLedgerAccount.accountClassification,
    publicAccountNumber: publicLedgerAccount.publicAccountNumber,
    brokerName: publicLedgerAccount.brokerName,
    platform: publicLedgerAccount.platform,
    notes: "Read-only verification access may be provided separately.",
  },
] as const;

export const verificationRecords = verificationRecordSchema
  .array()
  .parse(rawVerificationRecords) as readonly VerificationRecord[];

export const publicDemoReferenceAccountVerification = verificationRecords[0];
export const publicDemoReadOnlyAccessVerification = verificationRecords[1];
