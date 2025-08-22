/**
 * Type definitions for environment variables
 *
 * This module defines the structure of environment configuration
 * with clear separation between public and private variables.
 */

/**
 * Environment variables that can be safely exposed to the client
 */
export type PublicEnvVars = {
  /** Current application environment */
  env: 'development' | 'production';
};

/**
 * Complete environment configuration including server-only variables
 */
export type PrivateEnvVars = PublicEnvVars & {
  /** Source for content fetching: local filesystem or GitHub API */
  readContentFrom: 'locale' | 'github';
  /** GitHub personal access token for API requests */
  githubAccessToken: string;
  /** Base URL for GitHub repository API */
  githubRepoAPIUrl: string;
  /** Local path to repository for development */
  localeRepoAPIUrl: string;
};
