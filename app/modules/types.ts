export type PublicEnvVars = {
  env: 'development' | 'production';
};

export type PrivateEnvVars = PublicEnvVars & {
  readContentFrom: 'locale' | 'github';
  githubAccessToken: string;
  githubRepoAPIUrl: string;
  localeRepoAPIUrl: string;
};
