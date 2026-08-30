import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const analyticsRoot = path.join(root, "src", "lib", "analytics");
const publicConfigPath = path.join(root, "src", "lib", "config", "public.ts");
const packageJsonPath = path.join(root, "package.json");

const requiredAnalyticsFiles = [
  "types.ts",
  "events.ts",
  "analytics.ts",
  "index.ts",
];
const vendorTokens = [
  "gtag",
  "Google" + "Analytics",
  "G" + "-",
  "UA" + "-",
  "googletagmanager",
  "fbq",
  "facebook pixel",
  "Meta Pixel",
  "hotjar",
  "clarity",
];
const trackingStorageTokens = [
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "navigator.userAgent",
];
const disallowedAnalyticsMetricFields = [
  "netProfit",
  "returnPct",
  "winRatePct",
  "drawdown",
];

const readIfExists = (filePath) =>
  existsSync(filePath) ? readFileSync(filePath, "utf8") : "";

const findFiles = (directory) => {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...findFiles(entryPath));
      continue;
    }

    files.push(entryPath);
  }

  return files;
};

const failures = [];

if (!existsSync(analyticsRoot)) {
  failures.push("src/lib/analytics directory is missing.");
}

for (const fileName of requiredAnalyticsFiles) {
  if (!existsSync(path.join(analyticsRoot, fileName))) {
    failures.push(`src/lib/analytics/${fileName} is missing.`);
  }
}

const analyticsSource = existsSync(analyticsRoot)
  ? requiredAnalyticsFiles
      .map((fileName) => readIfExists(path.join(analyticsRoot, fileName)))
      .join("\n")
  : "";
const publicConfigSource = readIfExists(publicConfigPath);

if (!analyticsSource.includes("AnalyticsProvider")) {
  failures.push("AnalyticsProvider interface is missing.");
}

if (!analyticsSource.includes("trackAnalyticsEvent")) {
  failures.push("trackAnalyticsEvent API is missing.");
}

if (!analyticsSource.includes("trackPageView")) {
  failures.push("trackPageView API is missing.");
}

if (!analyticsSource.includes("normalizeAnalyticsPath")) {
  failures.push("normalizeAnalyticsPath helper is missing.");
}

if (!analyticsSource.includes("publicConfig.analyticsEnabled")) {
  failures.push("Analytics module must use centralized public config.");
}

if (!publicConfigSource.includes("process.env.NEXT_PUBLIC_ANALYTICS_ENABLED")) {
  failures.push("Public config must centralize NEXT_PUBLIC_ANALYTICS_ENABLED.");
}

if (!publicConfigSource.includes("parseBooleanEnv")) {
  failures.push("Public config must parse analytics booleans safely.");
}

if (!analyticsSource.includes("SENSITIVE_ANALYTICS_PROPERTY_KEYS")) {
  failures.push("Sensitive analytics property key guard is missing.");
}

if (!analyticsSource.includes("if (!hasSensitivePropertyKeys(event))")) {
  failures.push(
    "Sensitive analytics property guard must check for safe events before environment checks.",
  );
}

if (!analyticsSource.includes("return false;")) {
  failures.push("Sensitive analytics property guard must block unsafe events.");
}

if (analyticsSource.includes("!isDevelopment || !hasSensitivePropertyKeys")) {
  failures.push(
    "Sensitive analytics property guard must not be development-only.",
  );
}

for (const eventName of [
  "page_view",
  "cta_click",
  "ledger_entry_view",
  "ledger_media_open",
  "system_view",
  "indicator_view",
  "signal_view",
  "verification_view",
  "video_open",
  "private_access_request",
  "outbound_link_click",
  "client_error",
  "resource_error",
  "reliability_event",
]) {
  if (!analyticsSource.includes(`"${eventName}"`)) {
    failures.push(`Analytics event name is missing: ${eventName}`);
  }
}

for (const field of disallowedAnalyticsMetricFields) {
  if (analyticsSource.includes(field)) {
    failures.push(
      `Performance metric field found in analytics module: ${field}`,
    );
  }
}

const sourceFiles = findFiles(path.join(root, "src")).filter((filePath) =>
  /\.(ts|tsx|js|jsx)$/.test(filePath),
);
const sourceToScan = sourceFiles
  .map((filePath) => readFileSync(filePath, "utf8"))
  .join("\n");

for (const token of vendorTokens) {
  if (sourceToScan.includes(token)) {
    failures.push(`Analytics vendor code token found in source: ${token}`);
  }
}

for (const token of trackingStorageTokens) {
  if (sourceToScan.includes(token)) {
    failures.push(`Tracking storage or fingerprinting token found: ${token}`);
  }
}

const packageJsonSource = readIfExists(packageJsonPath);

if (!packageJsonSource.includes('"analytics:audit"')) {
  failures.push("package.json is missing analytics:audit script.");
}

console.log("Analytics architecture audit");
console.log(
  `Analytics module files: ${requiredAnalyticsFiles.filter((fileName) => existsSync(path.join(analyticsRoot, fileName))).length}/${requiredAnalyticsFiles.length}`,
);
console.log("Provider integration: none");
console.log("External analytics cookies/storage: none");

if (failures.length) {
  console.error("");
  console.error("Failures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    "Analytics architecture is provider-agnostic, privacy-safe by default, and free of vendor tracking code.",
  );
}
