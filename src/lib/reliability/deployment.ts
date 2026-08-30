import packageJson from "../../../package.json";

export type DeploymentEnvironment =
  "development" | "production" | "test" | "unknown";

export type DeploymentMetadata = Readonly<{
  serviceName: string;
  appVersion: string;
  environment: DeploymentEnvironment;
  commitSha?: string;
}>;

const serviceName = packageJson.name;
const appVersion = packageJson.version;

export const normalizeDeploymentEnvironment = (
  environment = process.env.NODE_ENV,
): DeploymentEnvironment => {
  if (
    environment === "development" ||
    environment === "production" ||
    environment === "test"
  ) {
    return environment;
  }

  return "unknown";
};

const getShortCommitSha = () => {
  const commitSha =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    process.env.COMMIT_SHA;

  return commitSha?.slice(0, 12);
};

export const getDeploymentMetadata = (): DeploymentMetadata => ({
  serviceName,
  appVersion,
  environment: normalizeDeploymentEnvironment(),
  commitSha: getShortCommitSha(),
});

export const getPublicHealthMetadata = () => {
  const metadata = getDeploymentMetadata();

  return {
    service: metadata.serviceName,
    version: metadata.appVersion,
    environment: metadata.environment,
  };
};
