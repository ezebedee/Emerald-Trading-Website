export type CompanyLegalPage = {
  label: string;
  title: string;
  introduction: string;
  sections: readonly {
    title: string;
    paragraphs: readonly string[];
    link?: { href: string; label: string };
  }[];
};

export const companyLegalPages = {
  about: {
    label: "Company / Technology",
    title: "Emerald Legacy Systems",
    introduction:
      "Quantitative trading technology: signals, software, automation and documented performance, with product roles and evidence kept in context.",
    sections: [
      {
        title: "The company and the product are distinct",
        paragraphs: [
          "Emerald Legacy Systems is the company/brand behind the technology presented on this website. Emerald Legacy System, without the final s, is the unified multi-signal indicator product. The company name should not be read as the name of a single strategy or a performance record.",
        ],
        link: { href: "/indicators", label: "Explore Emerald Legacy System" },
      },
      {
        title: "A family of tools with different responsibilities",
        paragraphs: [
          "Emerald Legacy System provides signal analysis. Emerald Signal Scanner monitors configured signals and symbols. Emerald Recovery Expert supports semi-automated trade management after the trader opens the first trade. Emerald Quant System is the automated system offering with private investor access.",
          "An indicator signal is not itself an instruction to execute a trade. Monitoring, assisted management and automated execution have different responsibilities and risks.",
        ],
        link: { href: "/systems", label: "Review the product family" },
      },
      {
        title: "Research and implementation",
        paragraphs: [
          "The research approach separates hypotheses, historical testing, implementation checks and forward observation. Documentation makes assumptions and configuration boundaries explicit. An evaluation framework does not establish that every product has completed every stage or that a strategy will be profitable.",
        ],
        link: { href: "/research", label: "Read the research approach" },
      },
      {
        title: "Platform-aware software",
        paragraphs: [
          "The product catalog covers MT4, MT5, TradingView and NinjaTrader. Availability is separate from execution behavior, delivery and activation. A platform listing does not establish identical capabilities or results across environments.",
        ],
        link: { href: "/platforms", label: "Compare platform guidance" },
      },
      {
        title: "Documentation with clear limits",
        paragraphs: [
          "Documented Results should identify their source, period and configuration. The current Quant Forward Performance Record uses a Public Demo Reference Account for Metals / XAUUSD / MT4. It is not real-money performance and is not attributed to every Emerald product.",
          "Reviewable documentation does not imply independent audit or third-party certification. Missing evidence should remain visible rather than being treated as assurance.",
        ],
        link: {
          href: "/verification",
          label: "Understand the evidence boundary",
        },
      },
      {
        title: "Technology, not personalized advice",
        paragraphs: [
          "This website presents software, research and information, not individualized investment advice. Product descriptions do not establish suitability for a particular person, trading account or objective.",
        ],
        link: {
          href: "/risk-disclosure",
          label: "Read the trading risk disclosure",
        },
      },
    ],
  },
  professional: {
    label: "Professional evaluation",
    title: "A disciplined basis for technology evaluation",
    introduction:
      "For professional and sophisticated users assessing trading software: examine the product role, implementation assumptions and evidence before considering use.",
    sections: [
      {
        title: "Start with responsibilities",
        paragraphs: [
          "Separate signal analysis, monitoring, assisted trade management and automated execution. Determine which decisions remain with the user and which are governed by product logic. A professional audience does not make a product suitable for every workflow.",
        ],
        link: {
          href: "/technology",
          label: "Review the technology architecture",
        },
      },
      {
        title: "Evaluate methodology, not only a headline result",
        paragraphs: [
          "Consider data quality, testing assumptions, parameter sensitivity and differences between modeled and observed execution. Review the configuration and period attached to a result. The research framework describes evaluation steps; it is not a completion certificate or a promise of future performance.",
        ],
        link: { href: "/research", label: "Examine the research framework" },
      },
      {
        title: "Keep implementation platform-specific",
        paragraphs: [
          "Chart context, settings, delivery and execution constraints can differ between platforms. Assess the supplied product instructions against the intended environment. Catalog availability alone is not an operational compatibility guarantee.",
        ],
        link: {
          href: "/platforms",
          label: "Review platform-specific guidance",
        },
      },
      {
        title: "Use documentation within its scope",
        paragraphs: [
          "The current public Quant evidence concerns Metals / XAUUSD / MT4 on a Public Demo Reference Account. Documented Performance supports inspection of that record, not an inference about other configurations, real-money outcomes or independent certification.",
          "Operational transparency includes stating what is documented and what remains unestablished. It does not remove execution risk or replace the user's own evaluation.",
        ],
        link: {
          href: "/performance",
          label: "Review performance classifications",
        },
      },
      {
        title: "Professional use still carries risk",
        paragraphs: [
          "Potential evaluation contexts include signal research, workflow assessment and review of documented system behavior. These are technology use cases, not an offer of account management or individualized investment advice. Users remain responsible for assessing risk and any requirements applicable to their own activity.",
          "Recovery tooling can add exposure; automated execution and risk-management logic can fail or behave differently from expectations. Neither ensures a loss limit or a profitable outcome.",
        ],
        link: {
          href: "/risk-disclosure",
          label: "Review material trading risks",
        },
      },
    ],
  },
  privacy: {
    label: "Website notice",
    title: "Privacy notice",
    introduction:
      "This notice describes the current public website. The separate Emerald portal and external destinations have their own access and data-handling context.",
    sections: [
      {
        title: "Browsing this website",
        paragraphs: [
          "The public site provides informational pages and links. It currently has no data-submission forms or public-site account sign-in. Following a link to another service takes you outside this site's browsing context.",
          "Website delivery necessarily involves technical requests. The serving infrastructure may generate technical logs, such as request times, requested paths, network information and error information, to operate and troubleshoot the service. This notice does not assert a specific hosting log configuration or retention period.",
        ],
      },
      {
        title: "Analytics and browser storage",
        paragraphs: [
          "The current public website has analytics scaffolding but no configured analytics provider or active page-view tracking integration. Google Analytics or another analytics service is not activated by this implementation.",
          "The public-site application does not currently set tracking cookies or use local or session storage for tracking. This is not a statement about cookies or storage used by the separate portal, external destinations or future hosting configuration. Browser caching for page delivery is distinct from analytics tracking.",
        ],
      },
      {
        title: "Contact links",
        paragraphs: [
          "The footer offers an email contact link rather than a website contact form. If you choose to send a message, your email service sends the address and content you provide to the recipient. Share only what is needed for your inquiry; do not send sensitive account access information.",
        ],
      },
      {
        title: "The portal and external services",
        paragraphs: [
          "Links to the Emerald portal lead to a separate service. Review the notices presented there before signing in or supplying information. This public-site notice does not describe portal authentication, account records or licensing processes.",
          "External destinations and infrastructure services may process technical information under their own arrangements. No named processor, storage location or fixed retention schedule is represented here unless it has been established for the service.",
        ],
        link: {
          href: "https://portal.emeraldforexsystem.com/login",
          label: "Go to the separate Emerald portal",
        },
      },
      {
        title: "Questions and updates",
        paragraphs: [
          "For questions about this website notice, use the contact link in the footer. The notice may be updated as website functionality or data handling changes. Review it again before using newly introduced features.",
        ],
        link: { href: "/terms", label: "Read the website terms" },
      },
    ],
  },
  terms: {
    label: "Website terms",
    title: "Terms of use",
    introduction:
      "These terms concern the public Emerald Legacy Systems website and its informational content. They do not replace product-specific access arrangements or the terms presented by a separate service.",
    sections: [
      {
        title: "Information and reliance",
        paragraphs: [
          "The website presents trading technology, product descriptions, research context and documentation. It does not provide individualized investment advice. You should assess the information in relation to your own circumstances rather than treating a page or signal illustration as a recommendation to trade.",
          "Content may contain omissions, errors or outdated information. Accuracy, completeness and uninterrupted availability are not guaranteed. Verify important details before relying on them or using a product.",
        ],
      },
      {
        title: "Performance is not a promise",
        paragraphs: [
          "Documented Performance and Documented Results relate to their stated source and period. Historical testing does not establish future results. The current Forward Performance Record uses a Public Demo Reference Account; it is not a real-money account record.",
          "No future performance or trading outcome is promised. Read the evidence context and risk disclosure rather than relying on results in isolation.",
        ],
        link: { href: "/risk-disclosure", label: "Read the risk disclosure" },
      },
      {
        title: "Content and intellectual property",
        paragraphs: [
          "Respect applicable rights in the site's branding, software/product names, documentation, text, screenshots and media. Access to a page does not itself grant permission to redistribute software or reuse protected material. Seek permission where required before reproducing or distributing it.",
          "Third-party platform names and trademarks, including MetaTrader 4, MetaTrader 5, TradingView and NinjaTrader, belong to their respective owners. References identify platform context and do not imply endorsement or affiliation.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Do not misuse the website, attempt unauthorized access, interfere with its operation or use its content to misrepresent Emerald products or performance. Do not present altered or out-of-context records as an accurate representation of the published evidence.",
        ],
      },
      {
        title: "External links and separate products",
        paragraphs: [
          "Links may lead to the separate Emerald portal or third-party services. Their availability and content are not guaranteed by this website. Review the relevant service terms before providing information or obtaining access.",
          "A public product description is not a product access grant, an execution instruction or a promise that a tool fits every platform configuration.",
        ],
        link: {
          href: "/privacy",
          label: "Review the public-site privacy notice",
        },
      },
      {
        title: "Changes and interpretation",
        paragraphs: [
          "Website content and these terms may change as the site develops. Review the current terms when returning to the website. These terms do not specify a governing-law jurisdiction or claim to resolve every legal requirement that may apply to a user's activity.",
        ],
      },
    ],
  },
  "risk-disclosure": {
    label: "Trading risk",
    title: "Risk disclosure",
    introduction:
      "Trading involves substantial risk. Losses are possible, and software, signals or favorable past results do not remove that risk.",
    sections: [
      {
        title: "Market exposure and leverage",
        paragraphs: [
          "Market prices can move against a position. Leverage can magnify both gains and losses, and adverse moves can occur quickly. Understand the exposure, margin requirements and potential losses of the instrument and account you use.",
        ],
      },
      {
        title: "Historical and demo evidence",
        paragraphs: [
          "Historical and backtest results depend on data, assumptions and the period examined; they do not guarantee future results. Simulated execution may not reproduce the conditions of actual trading.",
          "The current Emerald Quant System Forward Performance Record is a Public Demo Reference Account for Metals / XAUUSD / MT4. This demo record is not real-money performance. Documented Results from that configuration should not be projected onto other products, accounts or platforms.",
        ],
        link: {
          href: "/performance",
          label: "Understand the performance evidence",
        },
      },
      {
        title: "Execution and market conditions",
        paragraphs: [
          "Execution can differ by broker, platform and market conditions. Spreads, slippage, liquidity and price gaps can affect fills and outcomes. Connectivity problems, outages and interruptions can delay or prevent expected actions. A chart or simulated fill does not establish the price available to a particular account.",
        ],
      },
      {
        title: "Automation and recovery tooling",
        paragraphs: [
          "Automated systems can fail, be configured incorrectly or behave differently from expectations. Risk-management logic does not ensure that a loss limit will hold under every condition. Users need to understand the configured behavior and its limitations.",
          "Emerald Recovery Expert begins with a trader-initiated first trade and supports subsequent semi-automated management. Recovery actions can add exposure and losses; the product name does not promise recovery or profit. Indicators and Scanner provide analysis and monitoring, not a guarantee of a favorable trade.",
        ],
      },
      {
        title: "Responsibility and independent judgment",
        paragraphs: [
          "Understand the risks before using trading software or entering a position. Evaluate the product, platform, account conditions and your ability to bear losses. This website supplies technology information, not individualized investment advice or an assurance of suitability.",
          "Reviewable documentation does not imply independent audit or third-party certification. Evaluate the scope and limitations of evidence before relying on it.",
        ],
        link: {
          href: "/verification",
          label: "Review documentation and verification limits",
        },
      },
    ],
  },
} as const satisfies Record<string, CompanyLegalPage>;
