import packageJson from "../../../package.json";
import {
  getRuntimeEnvironment,
  type RuntimeEnvironment,
} from "@/lib/config/env";
import { getServerConfig } from "@/lib/config/server";

export type DeploymentMetadata = Readonly<{
  serviceName: string;
  appVersion: string;
  environment: RuntimeEnvironment;
  commitSha?: string;
}>;

const serviceName = packageJson.name;
const appVersion = packageJson.version;

export const getDeploymentMetadata = (): DeploymentMetadata => ({
  serviceName,
  appVersion,
  environment: getRuntimeEnvironment(),
  commitSha: getServerConfig().commitSha,
});

export const getPublicHealthMetadata = () => {
  const metadata = getDeploymentMetadata();

  return {
    service: metadata.serviceName,
    version: metadata.appVersion,
    environment: metadata.environment,
  };
};
