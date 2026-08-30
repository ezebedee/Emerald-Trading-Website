import { videoRecordSchema, type VideoRecord } from "@/domain";

const externalVideoReferenceNote =
  "External video reference not yet registered.";

const rawVideoEntries = [
  {
    id: "emerald-ledger-day-001-video",
    slug: "emerald-ledger-day-001-video",
    title: "Emerald Ledger - Day 001 Performance Update",
    description:
      "Metadata record for the Day 001 Emerald Ledger performance-update video associated with the public demo reference account.",
    contentStatus: "published",
    visibility: "public",
    videoPlatform: "youtube",
    thumbnailAssetId: "ledger-day-001-2026-08-17-thumbnail",
    relatedLedgerEntryIds: ["day-001"],
    relatedSystemIds: ["emerald-quant-system"],
    tags: ["ledger", "performance-update", "day-001"],
    notes: externalVideoReferenceNote,
  },
  {
    id: "emerald-ledger-day-002-video",
    slug: "emerald-ledger-day-002-video",
    title: "Emerald Ledger - Day 002 Performance Update",
    description:
      "Metadata record for the Day 002 Emerald Ledger performance-update video associated with the public demo reference account.",
    contentStatus: "published",
    visibility: "public",
    videoPlatform: "youtube",
    thumbnailAssetId: "ledger-day-002-2026-08-18-thumbnail",
    relatedLedgerEntryIds: ["day-002"],
    relatedSystemIds: ["emerald-quant-system"],
    tags: ["ledger", "performance-update", "day-002"],
    notes: externalVideoReferenceNote,
  },
  {
    id: "emerald-ledger-day-003-video",
    slug: "emerald-ledger-day-003-video",
    title: "Emerald Ledger - Day 003 Performance Update",
    description:
      "Metadata record for the Day 003 Emerald Ledger performance-update video associated with the public demo reference account.",
    contentStatus: "published",
    visibility: "public",
    videoPlatform: "youtube",
    thumbnailAssetId: "ledger-day-003-2026-08-19-thumbnail",
    relatedLedgerEntryIds: ["day-003"],
    relatedSystemIds: ["emerald-quant-system"],
    tags: ["ledger", "performance-update", "day-003"],
    notes: externalVideoReferenceNote,
  },
  {
    id: "emerald-ledger-week-01-video",
    slug: "emerald-ledger-week-01-video",
    title: "Emerald Ledger - Week 01 Performance Update",
    description:
      "Metadata record for the Week 01 Emerald Ledger performance-update video associated with the public demo reference account.",
    contentStatus: "published",
    visibility: "public",
    videoPlatform: "youtube",
    thumbnailAssetId: "ledger-week-01-2026-08-17-2026-08-21-thumbnail",
    relatedLedgerEntryIds: ["week-01"],
    relatedSystemIds: ["emerald-quant-system"],
    tags: ["ledger", "performance-update", "week-01"],
    notes: externalVideoReferenceNote,
  },
  {
    id: "emerald-ledger-cumulative-two-weeks-video",
    slug: "emerald-ledger-cumulative-two-weeks-video",
    title: "Emerald Ledger - First Two Weeks Performance Update",
    description:
      "Metadata record for the first-two-weeks cumulative Emerald Ledger performance-update video associated with the public demo reference account.",
    contentStatus: "published",
    visibility: "public",
    videoPlatform: "youtube",
    thumbnailAssetId:
      "ledger-cumulative-2-weeks-2026-08-17-2026-08-28-thumbnail",
    relatedLedgerEntryIds: ["cumulative-2-weeks"],
    relatedSystemIds: ["emerald-quant-system"],
    tags: ["ledger", "performance-update", "cumulative"],
    notes: externalVideoReferenceNote,
  },
] as const;

export const videoEntries = videoRecordSchema
  .array()
  .parse(rawVideoEntries) as readonly VideoRecord[];

export const emeraldLedgerDay001Video = videoEntries[0];
export const emeraldLedgerDay002Video = videoEntries[1];
export const emeraldLedgerDay003Video = videoEntries[2];
export const emeraldLedgerWeek01Video = videoEntries[3];
export const emeraldLedgerCumulativeTwoWeeksVideo = videoEntries[4];
