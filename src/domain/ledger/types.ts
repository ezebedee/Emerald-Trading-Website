import type {
  AssetReferenceId,
  InstrumentSymbol,
  TradingPlatform,
  VideoReferenceId,
} from "../common/types";
import type { PerformanceRecord } from "../performance/types";

export const LEDGER_ENTRY_KINDS = [
  "daily-entry",
  "weekly-summary",
  "monthly-summary",
  "cumulative-summary",
] as const;
export type LedgerEntryKind = (typeof LEDGER_ENTRY_KINDS)[number];

export type LedgerEntry = PerformanceRecord &
  Readonly<{
    kind: LedgerEntryKind;
    instruments?: readonly InstrumentSymbol[];
    platform?: TradingPlatform;
    videoReferenceId?: VideoReferenceId;
    mediaAssetIds?: readonly AssetReferenceId[];
  }>;
