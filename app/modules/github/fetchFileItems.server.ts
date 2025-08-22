/**
 * GitHub API file metadata fetching utilities
 *
 * This module provides functions to fetch file metadata (without content)
 * from a GitHub repository directory via the GitHub API.
 */
import type { ActionResult } from '~/types';

/**
 * Possible states when fetching file metadata from GitHub
 */
export enum FetchFileItemsResState {
  directoryNotFound = 'directory_not_found',
  internalError = 'internal_error',
  success = 'success',
}

/**
 * GitHub API file object structure
 */
type GitHubFileObject = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
};

/**
 * Simplified file metadata for internal use
 */
type FileItem = {
  slug: string;
  path: string;
};

/**
 * GitHub API response structure for directory contents
 */
type GithubContentResponse = GitHubFileObject & {
  entries: GitHubFileObject[];
};

/**
 * Fetches metadata about files (without content) from a GitHub directory
 *
 * @param accessToken - GitHub personal access token
 * @param directoryUrl - Full GitHub API URL for the directory
 * @returns Array of file metadata objects with slug and path
 */
export async function fetchFileItems(
  accessToken: string,
  directoryUrl: string,
): Promise<ActionResult<FetchFileItemsResState, FileItem[]>> {
  // Setup GitHub API request headers

  const headers = new Headers();
  headers.set('Accept', 'application/vnd.github.v3.object');
  // don't confuse with OAuth auth token flow, this requires a private accessToken of the GitHub account
  headers.set('Authorization', `token ${accessToken}`);
  headers.set('User-Agent', 'ocobo-posts');

  const response = await fetch(directoryUrl, { headers });
  if (!response.ok || response.status !== 200) {
    console.error(
      `GitHub fetch markdown API request failed: ok: ${response.ok} (${response.status}): ${response.statusText}`,
    );
    if (response.status === 404) {
      return [
        response.status,
        FetchFileItemsResState.directoryNotFound,
        undefined,
      ];
    }
    return [response.status, FetchFileItemsResState.internalError, undefined];
  }

  const content: GithubContentResponse = await response.json();
  const files: FileItem[] = content.entries.map((entry) => ({
    slug: entry.name.replace('.md', '').replace('index', ''),
    path: entry.path.replace('.md', '').replace('index', ''),
  }));

  return [200, FetchFileItemsResState.success, files];
}
