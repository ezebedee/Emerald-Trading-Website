import {
  EvidenceLayout,
  EvidenceNotes,
  EvidenceSection,
} from "./evidence-layout";

export function ForwardBacktestGuide() {
  return (
    <EvidenceLayout
      path="/performance/live-vs-backtest"
      label="Evaluation methods"
      title="Forward Performance vs Backtest Performance"
      introduction="Backtesting asks how configured rules behave in a historical simulation. Forward observation asks how an implementation behaves after configuration. They answer related, but different, questions."
    >
      <EvidenceSection title="Backtest: examine the model and its assumptions">
        <EvidenceNotes
          items={[
            {
              title: "Historical data quality",
              text: "Missing ticks, inconsistent prices or incomplete sessions can change signal timing and modeled fills. A backtest needs a disclosed data source, resolution and evaluation period.",
            },
            {
              title: "Spread, slippage and execution modeling",
              text: "Modeled transaction costs, order timing and fill rules affect algorithmic results. A simulation that assumes ideal fills does not establish achievable execution.",
            },
            {
              title: "Parameter sensitivity and overfitting",
              text: "Rules selected to fit one historical window may not generalize. Sensitivity checks and separate evaluation periods help expose dependence on a narrow parameter choice.",
            },
            {
              title: "Regime dependence",
              text: "A trend, range or volatility regime can favor particular rules. Historical profitability in one regime does not establish robustness in another.",
            },
          ]}
        />
      </EvidenceSection>
      <EvidenceSection title="Forward / Demo Reference: observe the configured implementation">
        <EvidenceNotes
          items={[
            {
              title: "Observation after configuration",
              text: "The Forward Performance Record documents system behavior during an observed period after the strategy has been configured, rather than reconstructing that period as a simulation.",
            },
            {
              title: "Broker and demo execution conditions",
              text: "The Public Demo Reference Account is not a real-money account. Demo fills, spreads, order handling and liquidity representation can differ from real-money execution.",
            },
            {
              title: "Implementation behavior",
              text: "Forward observation can expose signal processing, order handling and position-management behavior. It remains specific to the stated system, instrument and platform configuration.",
            },
            {
              title: "A record, not a forecast",
              text: "A forward period does not eliminate model risk, operational failures or changing market conditions. Observed outcomes do not guarantee that later periods will resemble them.",
            },
          ]}
        />
      </EvidenceSection>
      <EvidenceSection title="Use both without treating them as equivalent">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Backtesting can investigate rules across historical conditions;
          forward observation can examine the configured implementation over a
          subsequent period. Neither alone guarantees future results. The
          current public dataset contains a static Quant forward/demo record,
          not a published matched backtest series. A forward record can be
          stored as historical documentation without becoming a backtest.
        </p>
      </EvidenceSection>
    </EvidenceLayout>
  );
}
