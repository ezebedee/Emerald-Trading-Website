import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const siteErrorPath = path.join(root, "src", "app", "(site)", "error.tsx");
const globalErrorPath = path.join(root, "src", "app", "global-error.tsx");
const notFoundPath = path.join(root, "src", "app", "not-found.tsx");
const recoveryStatePath = path.join(
  root,
  "src",
  "components",
  "reliability",
  "recovery-state.tsx",
);
const packageJsonPath = path.join(root, "package.json");

const requiredFiles = [
  siteErrorPath,
  globalErrorPath,
  notFoundPath,
  recoveryStatePath,
];
const rawErrorRenderingTokens = [
  "error.message",
  "error.stack",
  "error.digest",
  "String(error)",
  "{error}",
];
const monitoringVendorTokens = [
  "Sentry",
  "Datadog",
  "New Relic",
  "Rollbar",
  "Bugsnag",
];
const credentialTokens = [
  "password",
  "passwd",
  "secret",
  "token",
  "apiKey",
  "broker",
  "credential",
];

const readIfExists = (filePath) =>
  existsSync(filePath) ? readFileSync(filePath, "utf8") : "";

const failures = [];

for (const filePath of requiredFiles) {
  if (!existsSync(filePath)) {
    failures.push(`${path.relative(root, filePath)} is missing.`);
  }
}

const siteErrorSource = readIfExists(siteErrorPath);
const globalErrorSource = readIfExists(globalErrorPath);
const notFoundSource = readIfExists(notFoundPath);
const recoveryStateSource = readIfExists(recoveryStatePath);
const errorBoundarySource = [siteErrorSource, globalErrorSource].join("\n");
const reliabilityUiSource = [
  siteErrorSource,
  globalErrorSource,
  notFoundSource,
  recoveryStateSource,
].join("\n");

if (!siteErrorSource.includes('"use client"')) {
  failures.push("Site route error boundary must be a Client Component.");
}

if (!globalErrorSource.includes('"use client"')) {
  failures.push("Global error boundary must be a Client Component.");
}

if (
  !globalErrorSource.includes("<html") ||
  !globalErrorSource.includes("<body")
) {
  failures.push("Global error boundary must render html and body elements.");
}

if (!errorBoundarySource.includes("reset();")) {
  failures.push("Error boundary retry must call reset().");
}

if (
  !notFoundSource.includes("index: false") ||
  !notFoundSource.includes("follow: false")
) {
  failures.push("Not-found metadata must be noindex/nofollow.");
}

if (
  !notFoundSource.includes("HomeAction") ||
  !notFoundSource.includes("LedgerAction") ||
  !recoveryStateSource.includes('href="/"') ||
  !recoveryStateSource.includes('href="/ledger"')
) {
  failures.push("Not-found page must link to Home and Emerald Ledger.");
}

if (!errorBoundarySource.includes("ANALYTICS_EVENTS.CLIENT_ERROR")) {
  failures.push("Error boundaries should emit safe client_error events.");
}

if (!errorBoundarySource.includes("ANALYTICS_EVENTS.RELIABILITY_EVENT")) {
  failures.push("Retry actions should emit safe reliability_event events.");
}

for (const token of rawErrorRenderingTokens) {
  if (reliabilityUiSource.includes(token)) {
    failures.push(`Raw error rendering token found: ${token}`);
  }
}

for (const token of monitoringVendorTokens) {
  if (reliabilityUiSource.includes(token)) {
    failures.push(`External monitoring vendor token found: ${token}`);
  }
}

for (const token of credentialTokens) {
  if (reliabilityUiSource.toLowerCase().includes(token.toLowerCase())) {
    failures.push(`Sensitive credential term found in error UI: ${token}`);
  }
}

if (!readIfExists(packageJsonPath).includes('"reliability:audit"')) {
  failures.push("package.json is missing reliability:audit script.");
}

console.log("Reliability recovery audit");
console.log(
  `Required recovery files: ${requiredFiles.filter((filePath) => existsSync(filePath)).length}/${requiredFiles.length}`,
);
console.log("External monitoring provider: none");
console.log("Raw error rendering: none detected");

if (failures.length) {
  console.error("");
  console.error("Failures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    "Error boundaries, not-found handling, and recovery UI are present without raw error exposure.",
  );
}
