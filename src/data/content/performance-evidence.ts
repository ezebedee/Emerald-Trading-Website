export const performanceEvidenceTypes = [
  {
    label: "Backtest",
    dimension: "Historical simulation",
    description:
      "A strategy applied to historical data under specified modeling assumptions. It is not an observed account record.",
    availability:
      "Comparable numerical results are not documented in the current public dataset.",
  },
  {
    label: "Forward / Demo Reference",
    dimension: "Observation and account context",
    description:
      "A Forward Performance Record observes a configured system over time. The current record uses a Public Demo Reference Account, not a real-money account.",
    availability:
      "Documented for the current Emerald Quant System configuration only.",
  },
  {
    label: "Documented Historical Record",
    dimension: "Record date and preservation",
    description:
      "A dated record retained for inspection. Historical means the period has ended; it does not by itself mean the result is a backtest.",
    availability:
      "The Ledger retains dated daily, weekly and cumulative forward records.",
  },
  {
    label: "Internal Documentation",
    dimension: "Evidence provenance",
    description:
      "Publisher-maintained source entries, contextual notes and labeled media. Reviewable documentation is not an independent audit.",
    availability:
      "The current public record is maintained by Emerald Legacy Systems.",
  },
  {
    label: "Independent Third-Party Verification",
    dimension: "External review, where available",
    description:
      "A separate evidence class requiring an identifiable independent reviewer, scope and report. Account access or a screenshot alone does not establish it.",
    availability: "Not available in the current published evidence set.",
  },
] as const;

export const performanceLinks = [
  { href: "/performance", label: "Performance overview" },
  { href: "/performance/compare", label: "Evidence comparison" },
  { href: "/performance/live-vs-backtest", label: "Forward vs backtest" },
  { href: "/verification", label: "Verification methodology" },
  { href: "/ledger", label: "Emerald Ledger" },
  { href: "/systems/quant", label: "Emerald Quant System" },
] as const;
