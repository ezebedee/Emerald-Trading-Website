import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const domains = [
  {
    name: "Ledger",
    file: "src/data/ledger/entries.ts",
    checkSlugs: true,
  },
  {
    name: "System families",
    file: "src/data/products/system-families.ts",
    checkSlugs: true,
  },
  {
    name: "Systems",
    file: "src/data/products/systems.ts",
    checkSlugs: true,
  },
  {
    name: "Indicators",
    file: "src/data/products/indicators.ts",
    checkSlugs: true,
  },
  {
    name: "Signals",
    file: "src/data/products/signals.ts",
    checkSlugs: true,
  },
  {
    name: "Product catalog",
    file: "src/data/products/product-catalog.ts",
    checkSlugs: true,
  },
  {
    name: "Signal modules",
    file: "src/data/products/signal-modules.ts",
    checkSlugs: true,
  },
  {
    name: "Platforms",
    file: "src/data/products/platforms.ts",
    checkSlugs: true,
  },
  {
    name: "Research",
    file: "src/data/content/research.ts",
    checkSlugs: true,
  },
  {
    name: "Videos",
    file: "src/data/content/videos.ts",
    checkSlugs: true,
  },
  {
    name: "Verification",
    file: "src/data/content/verification.ts",
    checkSlugs: true,
  },
  {
    name: "Assets",
    file: "src/data/assets.ts",
    checkSlugs: false,
  },
];

const productionDataFiles = [
  "src/data/assets.ts",
  "src/data/ledger/account.ts",
  "src/data/ledger/entries.ts",
  "src/data/products/system-families.ts",
  "src/data/products/systems.ts",
  "src/data/products/indicators.ts",
  "src/data/products/signals.ts",
  "src/data/products/product-catalog.ts",
  "src/data/products/signal-modules.ts",
  "src/data/products/platforms.ts",
  "src/data/products/platform-implementations.ts",
  "src/data/content/research.ts",
  "src/data/content/videos.ts",
  "src/data/content/verification.ts",
];

const suspiciousKeyPattern =
  /\b(password|passwd|secret|apiKey|api_key|token|investorPassword|tradingPassword)\s*:/i;

const readProjectFile = (projectPath) =>
  readFileSync(path.join(root, projectPath), "utf8");

const literalValuesForKey = (source, key) =>
  [...source.matchAll(new RegExp(`\\b${key}:\\s*"([^"]+)"`, "g"))].map(
    (match) => match[1],
  );

const literalArrayValuesForKey = (source, key) =>
  [...source.matchAll(new RegExp(`\\b${key}:\\s*\\[([\\s\\S]*?)\\]`, "g"))].map(
    ([, block]) => [...block.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
  );

const literalValueForKeyInBlock = (source, key) =>
  source.match(new RegExp(`\\b${key}:\\s*"([^"]+)"`))?.[1];

const sourceBetween = (source, startMarker, endMarker) => {
  const startIndex = source.indexOf(startMarker);
  const endIndex =
    startIndex >= 0 ? source.indexOf(endMarker, startIndex + 1) : -1;

  if (startIndex < 0 || endIndex < 0) {
    return "";
  }

  return source.slice(startIndex, endIndex);
};

const objectBlocksWithIds = (source) =>
  [...source.matchAll(/\{\s*id:\s*"([^"]+)"([\s\S]*?)\n\s*\},/g)].map(
    ([block, id]) => ({ id, block }),
  );

const findDuplicates = (values) => {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates];
};

const failures = [];

for (const domain of domains) {
  const source = readProjectFile(domain.file);
  const duplicateIds = findDuplicates(literalValuesForKey(source, "id"));

  if (duplicateIds.length) {
    failures.push(`${domain.name} duplicate IDs: ${duplicateIds.join(", ")}`);
  }

  if (domain.checkSlugs) {
    const duplicateSlugs = findDuplicates(literalValuesForKey(source, "slug"));

    if (duplicateSlugs.length) {
      failures.push(
        `${domain.name} duplicate slugs: ${duplicateSlugs.join(", ")}`,
      );
    }
  }
}

for (const projectPath of productionDataFiles) {
  const source = readProjectFile(projectPath);

  if (suspiciousKeyPattern.test(source)) {
    failures.push(`${projectPath} contains a credential-like property key.`);
  }
}

const systemsSource = readProjectFile("src/data/products/systems.ts");
const systemFamiliesSource = readProjectFile(
  "src/data/products/system-families.ts",
);
const ledgerSource = readProjectFile("src/data/ledger/entries.ts");
const productsSelectorSource = readProjectFile(
  "src/data/selectors/products.ts",
);
const indicatorsSource = readProjectFile("src/data/products/indicators.ts");
const signalsSource = readProjectFile("src/data/products/signals.ts");
const productCatalogSource = readProjectFile(
  "src/data/products/product-catalog.ts",
);
const signalModulesSource = readProjectFile(
  "src/data/products/signal-modules.ts",
);
const platformsSource = readProjectFile("src/data/products/platforms.ts");
const platformImplementationsSource = readProjectFile(
  "src/data/products/platform-implementations.ts",
);
const homepageSelectorSource = readProjectFile(
  "src/data/selectors/homepage.ts",
);
const homepagePageSource = readProjectFile("src/app/(site)/page.tsx");
const homepagePerformanceSource = readProjectFile(
  "src/components/home/home-performance-snapshot.tsx",
);
const homepageLedgerTeaserSource = readProjectFile(
  "src/components/home/home-ledger-teaser.tsx",
);
const homepageIndicatorsSignalsSource = readProjectFile(
  "src/components/home/home-indicators-signals-showcase.tsx",
);
const systemsCatalogPageSource = readProjectFile(
  "src/app/(site)/systems/page.tsx",
);
const quantSystemPageSource = readProjectFile(
  "src/app/(site)/systems/quant/page.tsx",
);
const systemsCatalogHeroSource = readProjectFile(
  "src/components/systems/systems-catalog-hero.tsx",
);
const systemCapabilityValues = [
  ...new Set(
    [...systemsSource.matchAll(/capabilities:\s*\[([\s\S]*?)\]/g)].flatMap(
      ([, capabilityBlock]) =>
        [...capabilityBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    ),
  ),
];
const unmappedSystemCapabilities = systemCapabilityValues.filter(
  (capability) => !productsSelectorSource.includes(`"${capability}"`),
);

if (unmappedSystemCapabilities.length) {
  failures.push(
    `Systems capabilities missing selector presentation mapping: ${unmappedSystemCapabilities.join(", ")}`,
  );
}

const systemIds = literalValuesForKey(systemsSource, "id");
const familyIds = literalValuesForKey(systemFamiliesSource, "id");
const currentFamilyId = "emerald-quant-system-family";
const currentSystemId = "emerald-quant-system";
const requiredProductIds = [
  "emerald-legacy-system",
  "emerald-signal-scanner",
  "emerald-recovery-expert",
  "emerald-quant-system-product",
];
const requiredPlatformIds = ["mt4", "mt5", "tradingview", "ninjatrader"];
const requiredSignalModuleIds = [
  "emerald-main-signal",
  "emerald-finescalp",
  "emerald-scalp-signal",
  "emerald-range-signal",
  "emerald-harmonizer",
  "emerald-harmonizer-safe",
];
const currentPublicLedgerIds = [
  "day-001",
  "day-002",
  "day-003",
  "week-01",
  "week-02",
  "cumulative-2-weeks",
];
const currentFamilyIndex = familyIds.indexOf(currentFamilyId);
const currentSystemIndex = systemIds.indexOf(currentSystemId);
const familyConfigurationIds =
  literalArrayValuesForKey(systemFamiliesSource, "configurationIds")[
    currentFamilyIndex
  ] ?? [];
const familyMarketCategories =
  literalArrayValuesForKey(systemFamiliesSource, "marketCategories")[
    currentFamilyIndex
  ] ?? [];
const systemFamilyIds = literalValuesForKey(systemsSource, "familyId");
const systemConfigurationKeys = literalValuesForKey(
  systemsSource,
  "configurationKey",
);
const systemConfigurationNames = literalValuesForKey(
  systemsSource,
  "configurationName",
);
const systemMarketCategories =
  literalArrayValuesForKey(systemsSource, "marketCategories")[
    currentSystemIndex
  ] ?? [];
const systemInstruments =
  literalArrayValuesForKey(systemsSource, "instruments")[currentSystemIndex] ??
  [];
const systemPlatforms =
  literalArrayValuesForKey(systemsSource, "platforms")[currentSystemIndex] ??
  [];
const systemPerformanceRecordIds =
  literalArrayValuesForKey(systemsSource, "performanceRecordIds")[
    currentSystemIndex
  ] ?? currentPublicLedgerIds;
const ledgerEntryIds = literalValuesForKey(ledgerSource, "id");
const ledgerSharedAccountClassification = literalValueForKeyInBlock(
  ledgerSource.match(
    /const sharedLedgerFields = \{([\s\S]*?)\} as const;/,
  )?.[1] ?? "",
  "accountClassification",
);
const ledgerSharedPerformanceClassification = literalValueForKeyInBlock(
  ledgerSource.match(
    /const sharedLedgerFields = \{([\s\S]*?)\} as const;/,
  )?.[1] ?? "",
  "performanceClassification",
);
const ledgerSharedVisibility = literalValueForKeyInBlock(
  ledgerSource.match(
    /const sharedLedgerFields = \{([\s\S]*?)\} as const;/,
  )?.[1] ?? "",
  "visibility",
);
const ledgerEntryMetadataById = new Map(
  objectBlocksWithIds(ledgerSource).map(({ id, block }) => [
    id,
    {
      accountClassification:
        literalValueForKeyInBlock(block, "accountClassification") ??
        ledgerSharedAccountClassification,
      performanceClassification:
        literalValueForKeyInBlock(block, "performanceClassification") ??
        ledgerSharedPerformanceClassification,
      visibility:
        literalValueForKeyInBlock(block, "visibility") ??
        ledgerSharedVisibility,
    },
  ]),
);
const requiredFamilyMarkets = ["metals", "forex", "futures", "equities"];

const productDefinitionBlocks = objectBlocksWithIds(
  productCatalogSource,
).filter(({ block }) => block.includes("productLayer:"));
const signalModuleBlocks = objectBlocksWithIds(signalModulesSource).filter(
  ({ block }) => block.includes("instrumentScope:"),
);
const platformDefinitionBlocks = objectBlocksWithIds(platformsSource).filter(
  ({ block }) => block.includes("label:"),
);
const productCatalogIds = productDefinitionBlocks.map(({ id }) => id);
const productCatalogSlugs = productDefinitionBlocks
  .map(({ block }) => literalValueForKeyInBlock(block, "slug"))
  .filter(Boolean);
const platformDefinitionIds = platformDefinitionBlocks.map(({ id }) => id);
const signalModuleIds = signalModuleBlocks.map(({ id }) => id);

if (productCatalogIds.length !== 4) {
  failures.push("Product ecosystem catalog must contain exactly 4 products.");
}

if (signalModuleIds.length !== 6) {
  failures.push("Signal framework must contain exactly 6 signal modules.");
}

if (platformDefinitionIds.length !== 4) {
  failures.push("Platform catalog must contain exactly 4 platforms.");
}

for (const productId of requiredProductIds) {
  if (!productCatalogIds.includes(productId)) {
    failures.push(`Product catalog is missing "${productId}".`);
  }
}

for (const platformId of requiredPlatformIds) {
  if (!platformDefinitionIds.includes(platformId)) {
    failures.push(`Platform catalog is missing "${platformId}".`);
  }

  if (!productCatalogSource.includes(`"${platformId}"`)) {
    failures.push(`Product platform matrix is missing "${platformId}".`);
  }
}

for (const signalModuleId of requiredSignalModuleIds) {
  if (!signalModuleIds.includes(signalModuleId)) {
    failures.push(`Signal framework is missing "${signalModuleId}".`);
  }
}

const duplicateProductCatalogIds = findDuplicates(productCatalogIds);
const duplicateProductCatalogSlugs = findDuplicates(productCatalogSlugs);
const duplicateSignalModuleIds = findDuplicates(signalModuleIds);

if (duplicateProductCatalogIds.length) {
  failures.push(
    `Product catalog duplicate IDs: ${duplicateProductCatalogIds.join(", ")}`,
  );
}

if (duplicateProductCatalogSlugs.length) {
  failures.push(
    `Product catalog duplicate slugs: ${duplicateProductCatalogSlugs.join(", ")}`,
  );
}

if (duplicateSignalModuleIds.length) {
  failures.push(
    `Signal module duplicate IDs: ${duplicateSignalModuleIds.join(", ")}`,
  );
}

const productExpectations = new Map([
  [
    "emerald-legacy-system",
    {
      accessModel: "public-subscription",
      productLayer: "analysis-signal",
    },
  ],
  [
    "emerald-signal-scanner",
    {
      accessModel: "public-subscription",
      productLayer: "monitoring-scanning",
    },
  ],
  [
    "emerald-recovery-expert",
    {
      accessModel: "public-subscription",
      productLayer: "assisted-execution",
    },
  ],
  [
    "emerald-quant-system-product",
    {
      accessModel: "private-investor",
      productLayer: "automated-execution",
    },
  ],
]);

for (const { id, block } of productDefinitionBlocks) {
  const expectation = productExpectations.get(id);

  if (!expectation) {
    continue;
  }

  for (const [key, value] of Object.entries(expectation)) {
    if (literalValueForKeyInBlock(block, key) !== value) {
      failures.push(`${id} must use ${key}: "${value}".`);
    }
  }

  if (!block.includes("supportedPlatformIds: allPlatformIds")) {
    failures.push(`${id} must use the canonical all-platform matrix.`);
  }

  if (block.includes("performanceRecordIds")) {
    failures.push(
      `${id} must not own Ledger performanceRecordIds in the product catalog.`,
    );
  }
}

const signalModuleExpectations = new Map([
  ["emerald-main-signal", { role: "primary", category: "trend", slug: "main" }],
  [
    "emerald-finescalp",
    { role: "primary", category: "high-resolution", slug: "finescalp" },
  ],
  [
    "emerald-scalp-signal",
    { role: "primary", category: "scalp", slug: "scalp" },
  ],
  [
    "emerald-range-signal",
    { role: "primary", category: "range", slug: "range" },
  ],
  [
    "emerald-harmonizer",
    { role: "primary", category: "synthesis", slug: "harmonizer" },
  ],
  [
    "emerald-harmonizer-safe",
    {
      role: "auxiliary",
      category: "defensive-helper",
      slug: "harmonizer-safe",
    },
  ],
]);

let primarySignalModuleCount = 0;
let auxiliarySignalModuleCount = 0;

for (const { id, block } of signalModuleBlocks) {
  const expectation = signalModuleExpectations.get(id);

  if (literalValueForKeyInBlock(block, "role") === "primary") {
    primarySignalModuleCount += 1;
  }

  if (literalValueForKeyInBlock(block, "role") === "auxiliary") {
    auxiliarySignalModuleCount += 1;
  }

  if (!block.includes('instrumentScope: "multi-instrument"')) {
    failures.push(`${id} must remain multi-instrument scoped.`);
  }

  if (!block.includes('generatedByProductId: "emerald-legacy-system"')) {
    failures.push(`${id} must be generated by Emerald Legacy System.`);
  }

  if (!expectation) {
    continue;
  }

  for (const [key, value] of Object.entries(expectation)) {
    if (literalValueForKeyInBlock(block, key) !== value) {
      failures.push(`${id} must use ${key}: "${value}".`);
    }
  }
}

if (primarySignalModuleCount !== 5) {
  failures.push("Signal framework must contain exactly 5 primary modules.");
}

if (auxiliarySignalModuleCount !== 1) {
  failures.push("Signal framework must contain exactly 1 auxiliary module.");
}

const harmonizerBlock =
  signalModuleBlocks.find(({ id }) => id === "emerald-harmonizer")?.block ?? "";
const harmonizerSources = literalArrayValuesForKey(
  harmonizerBlock,
  "relatedSignalModuleIds",
)[0];

for (const requiredSource of ["emerald-scalp-signal", "emerald-range-signal"]) {
  if (!harmonizerSources?.includes(requiredSource)) {
    failures.push(`Harmonizer must reference ${requiredSource}.`);
  }
}

if (
  !indicatorsSource.includes('name: "Emerald Legacy System"') ||
  !indicatorsSource.includes('shortName: "Unified Multi-Signal Indicator"')
) {
  failures.push(
    "Stable indicator record must present Emerald Legacy System as the unified multi-signal indicator.",
  );
}

if (!indicatorsSource.includes('"NinjaTrader"')) {
  failures.push("Indicator platform scope must include NinjaTrader.");
}

if (!signalsSource.includes('"NinjaTrader"')) {
  failures.push("Signal framework platform scope must include NinjaTrader.");
}

if (!signalsSource.includes('signalCategory: "multi-signal"')) {
  failures.push(
    'Umbrella Emerald Signal Framework must use signalCategory: "multi-signal".',
  );
}

if (!signalsSource.includes("signalModuleIds")) {
  failures.push("Signal product record must link to signal modules.");
}

if (
  !homepageIndicatorsSignalsSource.includes(
    '"multi-signal": "Multi-Signal Framework"',
  ) ||
  homepageIndicatorsSignalsSource.includes("Directional Signal Stream") ||
  homepageIndicatorsSignalsSource.includes("Directional Signals")
) {
  failures.push(
    "Homepage signal showcase must present the umbrella as Multi-Signal Framework, not a Directional Signal Stream.",
  );
}

if (
  !platformImplementationsSource.includes(
    '"custom-high-resolution-chart-builder"',
  ) ||
  !platformImplementationsSource.includes(
    '"native-high-resolution-chart-workflow"',
  ) ||
  !platformImplementationsSource.includes(
    '"scanner-finescalp-high-resolution-support"',
  )
) {
  failures.push(
    "Platform implementation matrix must model FineScalp high-resolution support.",
  );
}

const legacyImplementationNotesSource = sourceBetween(
  platformImplementationsSource,
  "Emerald Legacy System implementation",
  "Emerald Signal Scanner implementation",
);
const scannerImplementationNotesSource = sourceBetween(
  platformImplementationsSource,
  "Emerald Signal Scanner implementation",
  "Emerald Recovery Expert implementation",
);
const recoveryImplementationNotesSource = sourceBetween(
  platformImplementationsSource,
  "Emerald Recovery Expert implementation",
  "Emerald Quant System product-level",
);
const quantImplementationNotesSource = sourceBetween(
  platformImplementationsSource,
  "Emerald Quant System product-level",
  "};\n\nconst rawPlatformImplementations",
);

if (
  !legacyImplementationNotesSource.includes(
    "FineScalp custom high-resolution tick and seconds chart workflows",
  ) ||
  !legacyImplementationNotesSource.includes(
    "native FineScalp high-resolution chart capability",
  )
) {
  failures.push(
    "Emerald Legacy System platform notes must distinguish MetaTrader custom FineScalp workflows from native high-resolution platform capability.",
  );
}

if (
  !scannerImplementationNotesSource.includes(
    "monitor FineScalp custom high-resolution workflows",
  ) ||
  !scannerImplementationNotesSource.includes(
    "native FineScalp high-resolution workflows",
  )
) {
  failures.push(
    "Emerald Signal Scanner platform notes must distinguish MetaTrader custom FineScalp workflows from native high-resolution workflows.",
  );
}

if (
  !recoveryImplementationNotesSource.includes("trader-first-entry") ||
  /FineScalp|high-resolution/i.test(recoveryImplementationNotesSource)
) {
  failures.push(
    "Emerald Recovery Expert platform notes must preserve trader-first-entry workflow without FineScalp or high-resolution charting language.",
  );
}

if (
  !quantImplementationNotesSource.includes(
    "product-level platform availability",
  ) ||
  !quantImplementationNotesSource.includes(
    "current public Metals / XAUUSD MT4 performance configuration",
  ) ||
  /FineScalp|high-resolution/i.test(quantImplementationNotesSource)
) {
  failures.push(
    "Emerald Quant System platform notes must preserve product/platform availability without FineScalp or high-resolution charting language.",
  );
}

if (
  !platformImplementationsSource.includes(
    '"trader-first-entry-recovery-workflow"',
  )
) {
  failures.push(
    "Recovery Expert platform model must preserve trader-first-entry workflow.",
  );
}

for (const selectorName of [
  "getPublicTradingProducts",
  "getTradingProductById",
  "getTradingProductBySlug",
  "getSystemsCatalogPageContext",
  "getPublicSignalModules",
  "getSignalModuleById",
  "getSignalModulesForProduct",
  "getPrimarySignalModules",
  "getAuxiliarySignalModules",
  "getPublicPlatformDefinitions",
  "getProductPlatformImplementation",
  "getProductsForPlatform",
]) {
  if (!productsSelectorSource.includes(selectorName)) {
    failures.push(`Missing product ecosystem selector "${selectorName}".`);
  }
}

const expectedProductRoutes = [
  ['"emerald-legacy-system": "/indicators"', "Emerald Legacy System"],
  ['"emerald-signal-scanner": "/signal-scanner"', "Emerald Signal Scanner"],
  ['"emerald-recovery-expert": "/recovery-expert"', "Emerald Recovery Expert"],
  ['"emerald-quant-system-product": "/systems/quant"', "Emerald Quant System"],
];

for (const [routeMapping, productName] of expectedProductRoutes) {
  if (!productsSelectorSource.includes(routeMapping)) {
    failures.push(`${productName} catalog route mapping is missing or stale.`);
  }
}

if (!systemsCatalogHeroSource.includes('href="#product-catalog"')) {
  failures.push("/systems must render the master product catalog hero CTA.");
}

if (
  !systemsCatalogPageSource.includes("redirect(") ||
  !systemsCatalogPageSource.includes("/systems/quant?configuration=")
) {
  failures.push(
    "/systems must redirect legacy configuration query links to /systems/quant.",
  );
}

if (
  systemsCatalogPageSource.includes("SystemPerformanceContext") ||
  systemsCatalogPageSource.includes("getSystemsPagePrimarySystem")
) {
  failures.push(
    "/systems must not render Quant detail selectors or performance context.",
  );
}

if (
  !quantSystemPageSource.includes("SystemPerformanceContext") ||
  !quantSystemPageSource.includes("getSystemsPageSelectedConfiguration") ||
  !quantSystemPageSource.includes('routeSeoMetadata["/systems/quant"]')
) {
  failures.push(
    "/systems/quant must preserve the Quant configuration-aware detail page.",
  );
}

for (const configurationId of familyConfigurationIds) {
  if (!systemIds.includes(configurationId)) {
    failures.push(
      `${currentFamilyId} references unknown system configuration "${configurationId}".`,
    );
  }
}

for (const familyId of systemFamilyIds) {
  if (!familyIds.includes(familyId)) {
    failures.push(
      `System configuration references unknown family "${familyId}".`,
    );
  }
}

if (!familyConfigurationIds.includes(currentSystemId)) {
  failures.push(`${currentFamilyId} must include ${currentSystemId}.`);
}

if (systemFamilyIds[currentSystemIndex] !== currentFamilyId) {
  failures.push(`${currentSystemId} must reference ${currentFamilyId}.`);
}

for (const market of requiredFamilyMarkets) {
  if (!familyMarketCategories.includes(market)) {
    failures.push(`${currentFamilyId} is missing market coverage "${market}".`);
  }
}

const unsupportedCurrentMarkets = systemMarketCategories.filter((market) =>
  ["forex", "futures", "equities"].includes(market),
);

if (
  systemMarketCategories.length !== 1 ||
  systemMarketCategories[0] !== "metals" ||
  unsupportedCurrentMarkets.length
) {
  failures.push(`${currentSystemId} must remain scoped only to metals.`);
}

if (systemInstruments.length !== 1 || systemInstruments[0] !== "XAUUSD") {
  failures.push(`${currentSystemId} must remain scoped to XAUUSD.`);
}

if (systemPlatforms.length !== 1 || systemPlatforms[0] !== "MT4") {
  failures.push(`${currentSystemId} must remain scoped to MT4.`);
}

if (
  systemConfigurationKeys[currentSystemIndex] !== "metals-xauusd" ||
  systemConfigurationNames[currentSystemIndex] !== "Metals / XAUUSD"
) {
  failures.push(
    `${currentSystemId} must keep the Metals / XAUUSD configuration identity.`,
  );
}

const configurationKeysByFamily = new Map();

for (const [index, familyId] of systemFamilyIds.entries()) {
  const configurationKey = systemConfigurationKeys[index];
  const existingKeys = configurationKeysByFamily.get(familyId) ?? new Set();

  if (existingKeys.has(configurationKey)) {
    failures.push(
      `Duplicate configurationKey "${configurationKey}" within family "${familyId}".`,
    );
  }

  existingKeys.add(configurationKey);
  configurationKeysByFamily.set(familyId, existingKeys);
}

if (/performanceRecordIds\s*:/.test(systemFamiliesSource)) {
  failures.push("System family records must not contain performanceRecordIds.");
}

if (
  !/performanceRecordIds\s*:\s*ledgerPerformanceRecordIds/.test(systemsSource)
) {
  failures.push(
    `${currentSystemId} must retain configuration-specific Ledger performance relationships.`,
  );
}

for (const ledgerId of currentPublicLedgerIds) {
  if (!ledgerEntryIds.includes(ledgerId)) {
    failures.push(`Expected public Ledger entry "${ledgerId}" is missing.`);
  }
}

if (
  !systemsSource.includes(
    "const ledgerPerformanceRecordIds = ledgerEntries.map",
  )
) {
  failures.push(
    `${currentSystemId} must derive performanceRecordIds from canonical Ledger entries.`,
  );
}

if (!productsSelectorSource.includes("getPublicPerformanceRecordsForSystem")) {
  failures.push("Missing public-safe system performance selector.");
}

if (!productsSelectorSource.includes("getSystemsPagePerformanceContext")) {
  failures.push("Missing Systems page performance context selector.");
}

if (!productsSelectorSource.includes('entry.periodType === "cumulative"')) {
  failures.push(
    "Systems performance context must select a cumulative Ledger record.",
  );
}

if (
  !productsSelectorSource.includes("getPerformanceRecordsForSystem(systemId)")
) {
  failures.push(
    "Public performance selector must resolve records from configuration performanceRecordIds.",
  );
}

if (!ledgerEntryIds.includes("cumulative-2-weeks")) {
  failures.push(
    `${currentSystemId} latest cumulative public performance record must remain cumulative-2-weeks.`,
  );
}

if (!productsSelectorSource.includes("family.configurationIds")) {
  failures.push(
    "Systems configuration options must source availability from the public family.",
  );
}

if (!productsSelectorSource.includes("getSystemsPageConfigurationOptions")) {
  failures.push("Missing Systems page configuration options selector.");
}

if (!productsSelectorSource.includes("getSystemsPageSelectedConfiguration")) {
  failures.push("Missing Systems page selected configuration resolver.");
}

if (
  !productsSelectorSource.includes("getDefaultPublicConfigurationForFamily")
) {
  failures.push(
    "Missing explicit Systems page default configuration selector.",
  );
}

if (
  !productsSelectorSource.includes(
    'const defaultSystemsPageConfigurationId = "emerald-quant-system"',
  )
) {
  failures.push(
    `${currentSystemId} must remain the explicit default Systems page configuration.`,
  );
}

if (familyMarketCategories.length !== 4) {
  failures.push(
    `${currentFamilyId} must currently expose exactly four family market categories.`,
  );
}

if (familyConfigurationIds.length !== 1) {
  failures.push(
    `${currentFamilyId} must currently expose exactly one public canonical configuration.`,
  );
}

const performanceOwners = new Map();

for (const [index, systemId] of systemIds.entries()) {
  const ownedRecordIds =
    literalArrayValuesForKey(systemsSource, "performanceRecordIds")[index] ??
    (systemId === currentSystemId ? currentPublicLedgerIds : []);

  for (const recordId of ownedRecordIds) {
    const owners = performanceOwners.get(recordId) ?? [];

    owners.push(systemId);
    performanceOwners.set(recordId, owners);
  }
}

for (const [recordId, owners] of performanceOwners.entries()) {
  if (owners.length > 1) {
    failures.push(
      `Ledger performance record "${recordId}" is owned by multiple configurations: ${owners.join(", ")}.`,
    );
  }
}

for (const [index, systemId] of systemIds.entries()) {
  const ownedRecordIds =
    literalArrayValuesForKey(systemsSource, "performanceRecordIds")[index] ??
    (systemId === currentSystemId ? currentPublicLedgerIds : []);
  const publicForwardOwnedRecords = ownedRecordIds
    .map((recordId) => ({
      id: recordId,
      metadata: ledgerEntryMetadataById.get(recordId),
    }))
    .filter(
      ({ metadata }) =>
        metadata?.visibility === "public" &&
        metadata.performanceClassification === "forward-performance",
    );
  const classifications = new Map();

  for (const { id, metadata } of publicForwardOwnedRecords) {
    const classification = metadata?.accountClassification ?? "undefined";
    const recordIds = classifications.get(classification) ?? [];

    recordIds.push(id);
    classifications.set(classification, recordIds);
  }

  if (classifications.size > 1) {
    failures.push(
      `Configuration "${systemId}" mixes public Forward Performance account classifications: ${[
        ...classifications.entries(),
      ]
        .map(
          ([classification, recordIds]) =>
            `${classification} (${recordIds.join(", ")})`,
        )
        .join("; ")}.`,
    );
  }
}

for (const recordId of systemPerformanceRecordIds) {
  if (!ledgerEntryIds.includes(recordId)) {
    failures.push(
      `${currentSystemId} references unknown Ledger performance record "${recordId}".`,
    );
  }
}

if (
  currentPublicLedgerIds.some(
    (recordId) => !systemPerformanceRecordIds.includes(recordId),
  )
) {
  failures.push(
    `${currentSystemId} must own all current public Ledger performance records.`,
  );
}

const requiredLedgerSelectorNames = [
  "getPublicLedgerEntriesForConfiguration",
  "getDefaultPublicLedgerConfiguration",
  "getSelectedPublicLedgerConfiguration",
  "getLedgerConfigurationOptions",
  "getLatestPublicCumulativeLedgerRecordForConfiguration",
  "getPublicLedgerSummaryForConfiguration",
  "getPublicLedgerChronologyForConfiguration",
  "getPublicLedgerProgressionForConfiguration",
  "getLedgerPageContext",
];

for (const selectorName of requiredLedgerSelectorNames) {
  if (!productsSelectorSource.includes(selectorName)) {
    failures.push(
      `Missing Ledger configuration-scoped selector "${selectorName}".`,
    );
  }
}

if (
  !productsSelectorSource.includes(
    "getListedPublicConfigurationsForFamily(family.id)",
  )
) {
  failures.push(
    "Ledger configuration selection must require public, published, family-listed configurations.",
  );
}

if (
  !productsSelectorSource.includes("getPublicLedgerEntriesForConfiguration")
) {
  failures.push(
    "Ledger page context must resolve records through configuration performanceRecordIds.",
  );
}

if (
  !homepageSelectorSource.includes(
    'homepageFeaturedConfigurationId = "emerald-quant-system"',
  )
) {
  failures.push(
    "Homepage featured configuration must remain an explicit editorial policy.",
  );
}

for (const selectorName of [
  "getHomepageFeaturedConfiguration",
  "getHomepageFeaturedSystemContext",
  "getHomepagePerformanceSnapshotForConfiguration",
  "getHomepageLedgerTeaserEntriesForConfiguration",
  "getHomepageVerificationRecordsForConfiguration",
  "getHomepageVideoPreviewEntriesForConfiguration",
]) {
  if (!homepageSelectorSource.includes(selectorName)) {
    failures.push(
      `Missing Homepage configuration-scoped selector "${selectorName}".`,
    );
  }
}

if (!homepageSelectorSource.includes("family.configurationIds.includes")) {
  failures.push(
    "Homepage featured configuration must require a family-listed configuration.",
  );
}

if (
  !homepageSelectorSource.includes("getPublicLedgerEntriesForConfiguration")
) {
  failures.push(
    "Homepage scoped selectors must resolve Ledger records through configuration ownership.",
  );
}

if (homepagePerformanceSource.includes("getLatestPublicPerformanceSummary")) {
  failures.push(
    "Homepage Performance Snapshot must not use the global latest performance selector.",
  );
}

if (homepageLedgerTeaserSource.includes("getHomepageLedgerTeaserEntries")) {
  failures.push(
    "Homepage Ledger Teaser must not use the global teaser selector.",
  );
}

for (const selectorName of [
  "getHomepageFeaturedConfiguration",
  "getHomepagePerformanceSnapshotForConfiguration",
  "getHomepageLedgerTeaserEntriesForConfiguration",
]) {
  if (!homepagePageSource.includes(selectorName)) {
    failures.push(`Homepage root page must use "${selectorName}".`);
  }
}

console.log("Data source text audit");
console.log(`Domains checked: ${domains.length}`);
console.log(`Production data files scanned: ${productionDataFiles.length}`);
console.log(
  `System capability mappings checked: ${systemCapabilityValues.length}`,
);
console.log(
  `System family configuration links checked: ${familyConfigurationIds.length}`,
);
console.log(
  `Configuration performance ownership checked: ${currentPublicLedgerIds.length}`,
);
console.log("Homepage featured configuration checked: emerald-quant-system");

if (failures.length) {
  console.error("");
  console.error("Failures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    "No duplicate domain IDs, duplicate route slugs, or credential-like production data keys found.",
  );
}
