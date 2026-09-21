import type { AccountReference } from "@/domain";

export const LEDGER_STARTING_BALANCE = 1_000_000;

export const publicLedgerAccount = {
  accountClassification: "public-demo-reference",
  brokerName: "Exness",
  serverName: "Exness-Trial10",
  publicAccountNumber: "71891005",
  currency: "USD",
  platform: "MT4",
  notes:
    "Emerald Legacy Systems public demo/reference account used for the public Emerald Ledger performance record.",
} as const satisfies AccountReference;
