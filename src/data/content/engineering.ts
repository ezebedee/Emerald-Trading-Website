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
    text: "Identify a market behavior and a question that can be tested.",
  },
  {
    title: "Signal or execution design",
    text: "Define the logic and how to judge whether the idea holds up.",
  },
  {
    title: "Historical testing",
    text: "Test against historical data, noting data quality and execution assumptions.",
  },
  {
    title: "Sensitivity and robustness analysis",
    text: "Explore nearby settings and changing market conditions, not just the best result.",
  },
  {
    title: "Implementation validation",
    text: "Check that the platform implementation behaves as intended.",
  },
  {
    title: "Forward / demo reference observation",
    text: "Observe behavior in a forward or demo setting where appropriate.",
  },
  {
    title: "Documented results",
    text: "Record findings, assumptions and limitations so they can be reviewed.",
  },
  {
    title: "Revision / iteration",
    text: "Use what is learned to refine the idea and repeat the process.",
  },
] as const;
