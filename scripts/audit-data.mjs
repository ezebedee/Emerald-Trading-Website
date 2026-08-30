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
const requiredFamilyMarkets = ["metals", "forex", "futures", "equities"];

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
