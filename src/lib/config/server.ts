export type ServerConfig = Readonly<{
  commitSha?: string;
}>;

const getShortCommitSha = () => {
  const commitSha =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    process.env.COMMIT_SHA;

  return commitSha?.slice(0, 12);
};

export const getServerConfig = (): ServerConfig => ({
  commitSha: getShortCommitSha(),
});
