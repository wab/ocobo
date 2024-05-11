import invariant from 'tiny-invariant';
import untildify from 'untildify';

import type { PrivateEnvVars, PublicEnvVars } from './types';

export function getPublicEnvVars(): PublicEnvVars {
  const env =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';
  return {
    env,
  };
}

const DEV_FETCH_FROM = 'locale';

export function getPrivateEnvVars(): PrivateEnvVars {
  const githubRepoAPIUrl = `https://api.github.com/repos/${process.env.GITHUB_ACCOUNT}/${process.env.GITHUB_REPO}/contents`;
  const localeRepoAPIUrl = untildify(`~/projects/${process.env.GITHUB_REPO}`);

  const readContentFrom =
    process.env.NODE_ENV === 'production' ? 'github' : DEV_FETCH_FROM;

  const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

  invariant(
    githubAccessToken && typeof githubAccessToken === 'string',
    'Github access token is not defined',
  );
  return {
    ...getPublicEnvVars(),
    githubAccessToken,
    githubRepoAPIUrl,
    readContentFrom,
    localeRepoAPIUrl,
  };
}
