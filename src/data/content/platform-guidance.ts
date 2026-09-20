export const platformGuides = {
  mt4: {
    title: "MetaTrader 4",
    summary:
      "Chart-based indicators and Expert Advisor workflows, with product-specific setup and authorized access.",
    context:
      "MT4 brings analysis and Expert Advisor workflows into a chart-based environment. An indicator supplies analysis; an Expert Advisor can manage or execute trades under additional rules. Attaching an Emerald indicator does not turn its signals into automatic orders.",
    workflow:
      "For Legacy System and Scanner, the approved implementation model includes FineScalp custom high-resolution tick and seconds chart workflows. Use the supplied MT4 product guidance for the chart configuration; a standard chart alone does not establish that workflow.",
    access:
      "Use an authorized Emerald account with valid product access. Follow the supplied platform-specific activation instructions where required. Product access and chart configuration are separate steps.",
    steps: [
      "Confirm that the supplied product files and instructions are for MetaTrader 4.",
      "Install the supplied files in the appropriate platform locations, then refresh or restart the platform.",
      "Attach the appropriate indicator or Expert Advisor to the intended chart and review its inputs.",
      "Complete required activation and confirm the configured workflow before enabling any trade-management or execution component.",
    ],
    limit:
      "The current documented Quant performance record belongs to Metals / XAUUSD on MT4. It is not evidence for every MT4 product, account or configuration.",
  },
  mt5: {
    title: "MetaTrader 5",
    summary:
      "A separate platform implementation: select MT5-compatible tools and confirm their configuration before use.",
    context:
      "MT5 supports indicator and Expert Advisor workflows, but its Emerald implementation must be treated separately from MT4. Product availability is documented; identical settings, packages and execution behavior are not. Do not treat MT4 instructions as an MT5 installation specification.",
    workflow:
      "Legacy System and Scanner can support FineScalp custom high-resolution tick and seconds chart workflows on MetaTrader. The approved data does not specify an identical chart-building procedure for MT4 and MT5. Follow the instructions supplied for the MT5 implementation.",
    access:
      "Confirm your entitlement covers the intended product and platform. Use an authorized Emerald account and the MT5-specific activation guidance where required; availability is not a promise of automatic access transfer from another platform.",
    steps: [
      "Select the supplied MT5-compatible product package and check its accompanying requirements.",
      "Install in the appropriate MT5 platform locations and refresh or restart the platform.",
      "Open the intended chart, attach the supported indicator or Expert Advisor, and configure the MT5 inputs.",
      "Confirm valid product access and review the platform-specific operating instructions before enabling execution or recovery tooling.",
    ],
    limit:
      "The MT4 Metals / XAUUSD public record is not an MT5 performance record. No MT5 results are inferred from product availability.",
  },
  tradingview: {
    title: "TradingView",
    summary:
      "Visual analysis and managed-access delivery in a browser/cloud charting environment.",
    context:
      "TradingView guidance centers on indicators and visual analysis. Managed TradingView access, including invite-based availability where applicable, is distinct from MetaTrader runtime activation. A product listing does not establish EA-style execution on TradingView.",
    workflow:
      "For Legacy System and Scanner, the approved model allows native FineScalp high-resolution workflows where available. This does not imply MetaTrader offline or custom-chart mechanics. Exact chart capabilities and product controls depend on the supported implementation.",
    access:
      "Use the authorized Emerald account associated with your valid product access and follow the managed-access instructions. Where an invitation is required, wait for access confirmation before adding the available indicator to a chart. This page does not promise immediate invitations or automated execution.",
    steps: [
      "Confirm the TradingView product and managed-access arrangement through your Emerald account.",
      "Follow the supplied invitation or access instructions where applicable.",
      "Add the available indicator to a chart and configure its supported inputs.",
      "Review the product-specific workflow and limitations; indicator access alone does not establish trade execution.",
    ],
    limit:
      "TradingView availability is not evidence of MetaTrader-style execution or of TradingView performance. The documented Quant record remains scoped to Metals / XAUUSD on MT4.",
  },
  ninjatrader: {
    title: "NinjaTrader",
    summary:
      "Desktop integration through supported product packages and platform-specific components.",
    context:
      "NinjaTrader uses a desktop platform workflow. Follow the supported Emerald package guidance for indicators or add-on components where supplied. Product availability does not establish an implementation identical to MetaTrader or a particular component packaging format.",
    workflow:
      "Legacy System and Scanner may use native FineScalp high-resolution capabilities where available. No MetaTrader offline/custom-chart mechanism is implied. Confirm the chart context and enabled components against the supplied NinjaTrader instructions.",
    access:
      "Use valid product access through an authorized Emerald account and complete the platform-specific activation steps where required. Installation of a package and authorization to use its product are separate considerations.",
    steps: [
      "Confirm the supported NinjaTrader package and its accompanying compatibility instructions.",
      "Import or install the supplied package using its platform-specific guidance.",
      "Enable the supported components and configure the intended chart or workspace.",
      "Validate authorized access and review component behavior before using execution or trade-management features.",
    ],
    limit:
      "No NinjaTrader performance is inferred from the public Metals / XAUUSD MT4 record. Platform availability is not an execution-parity claim.",
  },
} as const;

export type PlatformGuideId = keyof typeof platformGuides;

export const productGuidanceLinks: Record<string, string> = {
  "emerald-legacy-system": "/indicators",
  "emerald-signal-scanner": "/signal-scanner",
  "emerald-recovery-expert": "/recovery-expert",
  "emerald-quant-system-product": "/systems/quant",
};
