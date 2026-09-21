import { isDevelopmentEnvironment } from "@/lib/config/env";

export type LogLevel = "info" | "warn" | "error";

export type LogContextPrimitive = string | number | boolean | null;
export type LogContextValue =
  LogContextPrimitive | readonly LogContextPrimitive[];
export type LogContext = Readonly<Record<string, LogContextValue>>;

export type LogEntry = Readonly<{
  level: LogLevel;
  event: string;
  message?: string;
  context?: LogContext;
  timestamp: string;
}>;

export type LoggerTransport = Readonly<{
  write: (entry: LogEntry) => void;
}>;

export const SENSITIVE_LOG_CONTEXT_KEYS = [
  "password",
  "passwd",
  "secret",
  "token",
  "apiKey",
  "api_key",
  "email",
  "phone",
  "message",
  "investorPassword",
  "tradingPassword",
] as const;

const isDevelopment = isDevelopmentEnvironment();

let activeTransport: LoggerTransport | undefined;

export const setLoggerTransport = (transport?: LoggerTransport) => {
  activeTransport = transport;
};

export const normalizeLogEventName = (event: string) =>
  event
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const hasSensitiveContextKeys = (context?: LogContext) => {
  if (!context) {
    return false;
  }

  const contextKeys = Object.keys(context).map((key) => key.toLowerCase());

  return SENSITIVE_LOG_CONTEXT_KEYS.some((sensitiveKey) =>
    contextKeys.includes(sensitiveKey.toLowerCase()),
  );
};

const createLogEntry = ({
  level,
  event,
  message,
  context,
}: Omit<LogEntry, "timestamp">): LogEntry | undefined => {
  if (hasSensitiveContextKeys(context)) {
    if (isDevelopment) {
      console.warn(
        `Structured log "${event}" contains a sensitive context key and was dropped.`,
      );
    }

    return undefined;
  }

  return {
    level,
    event: normalizeLogEventName(event),
    message,
    context,
    timestamp: new Date().toISOString(),
  };
};

const consoleTransport: LoggerTransport = {
  write: (entry) => {
    const writer =
      entry.level === "error"
        ? console.error
        : entry.level === "warn"
          ? console.warn
          : console.info;

    writer(entry);
  },
};

const writeLog = (entryInput: Omit<LogEntry, "timestamp">) => {
  const entry = createLogEntry(entryInput);

  if (!entry) {
    return;
  }

  (activeTransport ?? consoleTransport).write(entry);
};

export const logger = {
  info: (event: string, context?: LogContext, message?: string) => {
    writeLog({ level: "info", event, context, message });
  },
  warn: (event: string, context?: LogContext, message?: string) => {
    writeLog({ level: "warn", event, context, message });
  },
  error: (
    event: string,
    context?: LogContext,
    error?: Error,
    message?: string,
  ) => {
    if (isDevelopment && error) {
      console.error(error);
    }

    writeLog({ level: "error", event, context, message });
  },
};

export const logConfigurationWarning = (
  event: string,
  context?: LogContext,
  message?: string,
) => {
  logger.warn(event, context, message);
};
