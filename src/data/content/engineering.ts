export const technologyResponsibilities = [
  {
    title: "Signal-generation logic",
    context: "Information",
    text: "The multi-signal framework separates trend, high-resolution, scalp, range and synthesis roles. Signal context is information for interpretation, not an instruction to place an immediate trade.",
    href: "/signals",
    link: "Explore the signal library",
  },
  {
    title: "Indicator presentation",
    context: "Information",
    productId: "emerald-legacy-system",
    text: "Emerald Legacy System presents the unified multi-signal framework on supported trading platforms. Chart presentation and signal meaning are separate from order execution.",
    href: "/indicators",
    link: "Explore the indicator product",
  },
  {
    title: "Scanner aggregation",
    context: "Monitoring",
    productId: "emerald-signal-scanner",
    text: "Emerald Signal Scanner monitors configured symbols and signal modules. Its filters, signal-age context and chart-view workflow support review; monitoring is not automated strategy execution.",
    href: "/signal-scanner",
    link: "Explore Scanner workflows",
  },
  {
    title: "Automated trading logic",
    context: "Execution",
    productId: "emerald-quant-system-product",
    text: "Emerald Quant System is the automated strategy implementation. Signal interpretation sits alongside trade execution, risk-management logic, position management and trade lifecycle management.",
    href: "/systems/quant",
    link: "Explore Quant architecture",
  },
  {
    title: "Recovery and trade management",
    context: "Assisted execution",
    productId: "emerald-recovery-expert",
    text: "Emerald Recovery Expert is a separate, semi-automated product. The trader opens the first trade; subsequent management follows the configured recovery workflow. Recovery actions can add exposure and do not ensure recovery or profit.",
    href: "/recovery-expert",
    link: "Explore Recovery Expert",
  },
  {
    title: "Platform adapters",
    context: "Implementation boundary",
    text: "The platform layer concerns how a product fits its host environment. Chart workflows, settings and execution constraints can differ; one platform's implementation is not a specification for another.",
  },
  {
    title: "Licensing and entitlement runtime",
    context: "Access boundary",
    text: "Product and platform access is a separate concern from signal generation or trade decisions. The catalog distinguishes public-subscription products from private-investor Quant access; an access model does not describe an execution mechanism.",
  },
  {
    title: "Performance documentation",
    context: "Evidence boundary",
    text: "Emerald Ledger connects documented results to a specific configuration and coverage period. This public documentation layer is separate from trading execution and does not certify other products' results.",
    href: "/performance",
    link: "Understand performance evidence",
  },
] as const;

export const researchStages = [
  {
    title: "Hypothesis / trading concept",
    text: "Define the behavior to investigate, the market context and what would contradict the concept before interpreting results.",
  },
  {
    title: "Signal or execution design",
    text: "Separate informational outputs from entry, position-management and exit responsibilities. Keep the intended product role and configuration explicit.",
  },
  {
    title: "Historical testing",
    text: "Document the dataset, period, spread/slippage assumptions and execution model. Treat a simulation as a model, not an observed account record.",
  },
  {
    title: "Sensitivity and robustness analysis",
    text: "Examine dependence on parameters and market regimes, and consider overfitting. A favorable historical window is not evidence that nearby settings or future conditions will behave similarly.",
  },
  {
    title: "Implementation validation",
    text: "Compare intended logic with platform behavior: signal timing, chart context, order handling and position state where applicable. Account for the host platform's constraints.",
  },
  {
    title: "Forward / demo reference observation",
    text: "Observe implementation behavior after configuration. Identify the account classification, instrument, platform and observation period rather than treating every forward record as equivalent.",
  },
  {
    title: "Documented results",
    text: "Retain record identity, coverage dates, configuration context and evidence labels. Keep missing evidence explicit and simulations distinct from observed records.",
  },
  {
    title: "Revision / iteration",
    text: "Use findings to revisit the hypothesis, implementation or evaluation. Disclose material corrections and distinguish a revision date from the period covered by a result.",
  },
] as const;
