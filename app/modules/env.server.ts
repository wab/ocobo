/**
 * Environment variables configuration and validation
 *
 * This module provides type-safe access to environment variables,
 * separating public (client-side) and private (server-only) configuration.
 */
import invariant from 'tiny-invariant';
import untildify from 'untildify';

import type { PrivateEnvVars, PublicEnvVars } from './types';

/**
 * Get environment variables that are safe to expose to the client
 * These variables can be included in the browser bundle
 */
export function getPublicEnvVars(): PublicEnvVars {
  const env =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';
  return {
    env,
  };
}

// In development, fetch content from local filesystem by default
const DEV_FETCH_FROM = 'locale';

/**
 * Get all environment variables including sensitive server-only values
 * These variables should never be exposed to the client
 */
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
