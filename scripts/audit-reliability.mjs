import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const siteErrorPath = path.join(root, "src", "app", "(site)", "error.tsx");
const globalErrorPath = path.join(root, "src", "app", "global-error.tsx");
const notFoundPath = path.join(root, "src", "app", "not-found.tsx");
const envExamplePath = path.join(root, ".env.example");
const gitignorePath = path.join(root, ".gitignore");
const healthRoutePath = path.join(
  root,
  "src",
  "app",
  "api",
  "health",
  "route.ts",
);
const recoveryStatePath = path.join(
  root,
  "src",
  "components",
  "reliability",
  "recovery-state.tsx",
);
const reliabilityRoot = path.join(root, "src", "lib", "reliability");
const configRoot = path.join(root, "src", "lib", "config");
const configEnvPath = path.join(configRoot, "env.ts");
const publicConfigPath = path.join(configRoot, "public.ts");
const serverConfigPath = path.join(configRoot, "server.ts");
const configIndexPath = path.join(configRoot, "index.ts");
const deploymentPath = path.join(reliabilityRoot, "deployment.ts");
const loggerPath = path.join(reliabilityRoot, "logger.ts");
const reliabilityIndexPath = path.join(reliabilityRoot, "index.ts");
const analyticsPath = path.join(
  root,
  "src",
  "lib",
  "analytics",
  "analytics.ts",
);
const packageJsonPath = path.join(root, "package.json");

const requiredFiles = [
  siteErrorPath,
  globalErrorPath,
  notFoundPath,
  recoveryStatePath,
  healthRoutePath,
  deploymentPath,
  loggerPath,
  reliabilityIndexPath,
  configEnvPath,
  publicConfigPath,
  serverConfigPath,
  configIndexPath,
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
const sensitiveHealthTokens = [
  "process.env",
  "password",
  "passwd",
  "secret",
  "token",
  "account",
  "credential",
  "email",
  "phone",
];
const suspiciousEnvExamplePatterns = [
  /password\s*=\s*.+/i,
  /secret\s*=\s*.+/i,
  /token\s*=\s*.+/i,
  /api[_-]?key\s*=\s*.+/i,
  /credential\s*=\s*.+/i,
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
const healthRouteSource = readIfExists(healthRoutePath);
const envExampleSource = readIfExists(envExamplePath);
const gitignoreSource = readIfExists(gitignorePath);
const recoveryStateSource = readIfExists(recoveryStatePath);
const configEnvSource = readIfExists(configEnvPath);
const publicConfigSource = readIfExists(publicConfigPath);
const serverConfigSource = readIfExists(serverConfigPath);
const deploymentSource = readIfExists(deploymentPath);
const loggerSource = readIfExists(loggerPath);
const analyticsSource = readIfExists(analyticsPath);
const errorBoundarySource = [siteErrorSource, globalErrorSource].join("\n");
const reliabilityUiSource = [
  siteErrorSource,
  globalErrorSource,
  notFoundSource,
  recoveryStateSource,
].join("\n");
const operationalSource = [
  healthRouteSource,
  deploymentSource,
  loggerSource,
  configEnvSource,
  publicConfigSource,
  serverConfigSource,
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

if (!existsSync(envExamplePath)) {
  failures.push(".env.example is missing.");
}

if (
  !gitignoreSource.includes(".env*") ||
  !gitignoreSource.includes("!.env.example")
) {
  failures.push(
    "Local env files must be ignored while .env.example remains trackable.",
  );
}

for (const pattern of suspiciousEnvExamplePatterns) {
  if (pattern.test(envExampleSource)) {
    failures.push(".env.example appears to contain a secret-like value.");
  }
}

if (!envExampleSource.includes("NEXT_PUBLIC_ANALYTICS_ENABLED=false")) {
  failures.push(
    ".env.example must document NEXT_PUBLIC_ANALYTICS_ENABLED=false.",
  );
}

if (!envExampleSource.includes("NEXT_PUBLIC_ANALYTICS_DEBUG=false")) {
  failures.push(
    ".env.example must document NEXT_PUBLIC_ANALYTICS_DEBUG=false.",
  );
}

if (!configEnvSource.includes("parseBooleanEnv")) {
  failures.push("Config env module must expose parseBooleanEnv.");
}

if (
  !configEnvSource.includes('value === "true"') ||
  !configEnvSource.includes('value === "false"')
) {
  failures.push("Boolean env parsing must handle true and false explicitly.");
}

if (!publicConfigSource.includes("NEXT_PUBLIC_ANALYTICS_ENABLED")) {
  failures.push("Public config must centralize analytics enabled flag.");
}

if (!publicConfigSource.includes("NEXT_PUBLIC_ANALYTICS_DEBUG")) {
  failures.push("Public config must centralize analytics debug flag.");
}

for (const serverOnlyKey of [
  "VERCEL_GIT_COMMIT_SHA",
  "GITHUB_SHA",
  "COMMIT_SHA",
]) {
  if (publicConfigSource.includes(serverOnlyKey)) {
    failures.push(
      `Public config must not include server-only key: ${serverOnlyKey}`,
    );
  }
}

if (
  !serverConfigSource.includes("VERCEL_GIT_COMMIT_SHA") ||
  !serverConfigSource.includes("GITHUB_SHA") ||
  !serverConfigSource.includes("COMMIT_SHA")
) {
  failures.push("Server config must centralize optional commit SHA keys.");
}

if (analyticsSource.includes("process.env.NEXT_PUBLIC_ANALYTICS")) {
  failures.push(
    "Analytics module must not directly read NEXT_PUBLIC env vars.",
  );
}

if (!healthRouteSource.includes("NextResponse.json")) {
  failures.push("Health route must return JSON.");
}

if (!healthRouteSource.includes('"Cache-Control": "no-store"')) {
  failures.push("Health route must set Cache-Control: no-store.");
}

if (!healthRouteSource.includes('dynamic = "force-dynamic"')) {
  failures.push("Health route must be force-dynamic.");
}

if (!healthRouteSource.includes('status: "ok"')) {
  failures.push("Health route must return status ok.");
}

if (healthRouteSource.includes("commitSha")) {
  failures.push("Health route must not expose commit SHA.");
}

for (const token of sensitiveHealthTokens) {
  if (healthRouteSource.toLowerCase().includes(token.toLowerCase())) {
    failures.push(`Sensitive health-route token found: ${token}`);
  }
}

if (!deploymentSource.includes("packageJson.version")) {
  failures.push("Deployment metadata must centralize the package version.");
}

if (!deploymentSource.includes("getRuntimeEnvironment")) {
  failures.push("Deployment metadata must normalize environment values.");
}

if (!loggerSource.includes("LogLevel =") || !loggerSource.includes('"info"')) {
  failures.push("Structured logger must define a small log level set.");
}

if (!loggerSource.includes("normalizeLogEventName")) {
  failures.push("Structured logger must normalize event names.");
}

if (!loggerSource.includes("SENSITIVE_LOG_CONTEXT_KEYS")) {
  failures.push("Structured logger must define sensitive context keys.");
}

if (!loggerSource.includes("return undefined;")) {
  failures.push("Structured logger must drop unsafe context entries.");
}

if (loggerSource.includes("JSON.stringify(error)")) {
  failures.push("Structured logger must not serialize raw Error objects.");
}

if (
  loggerSource.includes("error.stack") ||
  loggerSource.includes("error.message")
) {
  failures.push("Structured logger must not emit raw error details.");
}

if (
  operationalSource.includes("console.log(process.env)") ||
  operationalSource.includes("JSON.stringify(process.env)") ||
  operationalSource.includes("Object.entries(process.env)")
) {
  failures.push("Operational diagnostics must not dump process.env.");
}

console.log("Reliability recovery audit");
console.log(
  `Required recovery files: ${requiredFiles.filter((filePath) => existsSync(filePath)).length}/${requiredFiles.length}`,
);
console.log("External monitoring provider: none");
console.log("Raw error rendering: none detected");
console.log("Health endpoint: present");
console.log("Structured logger: present");
console.log("Environment config: present");

if (failures.length) {
  console.error("");
  console.error("Failures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    "Error boundaries, health diagnostics, structured logging, and recovery UI are present without raw error exposure.",
  );
}
