import {
  formatEvidenceMetric,
  getPublicPerformanceEvidence,
  notDocumented,
} from "@/data/selectors/performance-evidence";
import {
  EvidenceLayout,
  EvidenceNotes,
  EvidenceSection,
} from "./evidence-layout";

export function PerformanceComparison() {
  const evidence = getPublicPerformanceEvidence();
  const record = evidence.snapshot;
  const rows = [
    ["System under consideration", evidence.system, evidence.system],
    ["Evidence method", "Forward Performance Record", "Historical simulation"],
    [
      "Account context",
      "Public Demo Reference Account",
      "Not applicable: simulation",
    ],
    ["Documented configuration", evidence.configuration, notDocumented],
    ["Instrument", evidence.instruments, notDocumented],
    ["Platform context", evidence.platforms, notDocumented],
    ["Evaluation period", record?.period ?? notDocumented, notDocumented],
    [
      "Cumulative return",
      formatEvidenceMetric(record?.returnPct, "percentage"),
      notDocumented,
    ],
    [
      "Maximum drawdown",
      formatEvidenceMetric(record?.maxDrawdownPct, "percentage"),
      notDocumented,
    ],
    [
      "Trade count",
      formatEvidenceMetric(record?.totalTrades, "count"),
      notDocumented,
    ],
    [
      "Latest cumulative record ends",
      record?.endDate ?? notDocumented,
      notDocumented,
    ],
    ["Source record", record?.id ?? notDocumented, notDocumented],
    [
      "Documentation",
      record ? "Static, internally documented Ledger record" : notDocumented,
      notDocumented,
    ],
    ["Independent third-party verification", "Not available", "Not available"],
  ];
  return (
    <EvidenceLayout
      path="/performance/compare"
      label="Evidence comparison"
      title="Compare the evidence, not just the return."
      introduction="Only the current Quant configuration has a published numerical forward record in this dataset. The backtest column makes the missing comparison explicit; it is not evidence that a comparable backtest has been published."
    >
      <EvidenceSection title="Emerald Quant System: forward record and backtest availability">
        <div
          role="region"
          aria-label="Quant evidence comparison table"
          tabIndex={0}
          className="focus-emerald overflow-x-auto rounded-lg border border-[var(--border)]"
        >
          <table className="w-full min-w-[660px] border-collapse text-left text-sm">
            <caption className="text-muted-foreground border-b border-[var(--border)] p-5 text-left leading-relaxed">
              Current configuration only: {evidence.configuration} /{" "}
              {evidence.platforms}. Values trace to the latest cumulative Ledger
              record. Percentages use human percentage units and are rounded to
              two decimal places. Missing values are not zero.
            </caption>
            <thead className="bg-surface text-foreground">
              <tr>
                <th scope="col" className="w-1/3 p-4">
                  Comparison field
                </th>
                <th scope="col" className="w-1/3 p-4">
                  Forward / Demo Reference
                </th>
                <th scope="col" className="w-1/3 p-4">
                  Backtest evidence
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, forward, backtest]) => (
                <tr key={label} className="border-t border-[var(--border)]">
                  <th scope="row" className="p-4 align-top font-medium">
                    {label}
                  </th>
                  <td className="p-4 align-top tabular-nums">{forward}</td>
                  <td className="text-muted-foreground p-4 align-top">
                    {backtest}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EvidenceSection>
      <EvidenceSection title="What this comparison does not establish">
        <EvidenceNotes
          items={[
            {
              title: "No cross-product return ranking",
              text: "Scanner observations, Recovery Expert trade management and indicator signal examples are not equivalent to Quant strategy returns. Comparable numerical performance is not documented here for those products.",
            },
            {
              title: "No cross-platform extrapolation",
              text: "Availability on MT4, MT5, TradingView and NinjaTrader does not establish performance on each platform. The documented configuration here is Metals / XAUUSD on MT4.",
            },
            {
              title: "No reconstructed missing metrics",
              text: "Not documented means the approved source does not supply a value. It does not mean zero performance, no trades or an unsuccessful test.",
            },
            {
              title: "No universal ranking from one period",
              text: "Comparable evaluation would require disclosed periods, instruments, execution assumptions and risk context. A single static cumulative record does not establish future profitability.",
            },
          ]}
        />
      </EvidenceSection>
    </EvidenceLayout>
  );
}
