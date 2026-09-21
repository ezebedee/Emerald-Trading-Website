export type RuntimeEnvironment =
  "development" | "production" | "test" | "unknown";

export const getRuntimeEnvironment = (
  environment = process.env.NODE_ENV,
): RuntimeEnvironment => {
  if (
    environment === "development" ||
    environment === "production" ||
    environment === "test"
  ) {
    return environment;
  }

  return "unknown";
};

export const isDevelopmentEnvironment = () =>
  getRuntimeEnvironment() === "development";

export const parseBooleanEnv = (
  value: string | undefined,
  fallback = false,
) => {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return fallback;
};
