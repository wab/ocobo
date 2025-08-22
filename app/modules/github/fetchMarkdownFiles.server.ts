/**
 * GitHub API multiple markdown files fetching utilities
 *
 * This module provides functions to fetch and parse multiple markdown files
 * from a GitHub repository directory with batch processing for performance.
 */
import type { ActionResult, MarkdocFile, TvalidateFrontMatter } from '~/types';

import {
  FetchFileItemsResState,
  fetchFileItems,
} from './fetchFileItems.server';
import {
  FetchMarkdownFileResState,
  fetchMarkdownFile,
} from './fetchMarkdownFile.server';

/**
 * Possible states when fetching multiple markdown files from GitHub
 */
export enum FetchMarkdownFilesResState {
  directoryNotFound = 'directory_not_found',
  internalError = 'internal_error',
  success = 'success',
}

/**
 * Fetches and parses all markdown files from a GitHub repository directory
 *
 * Uses batch processing to avoid overwhelming the GitHub API with too many
 * concurrent requests. Processes files in batches of 10.
 *
 * @param accessToken - GitHub personal access token
 * @param directoryUrl - Full GitHub API URL for the directory
 * @param hasValidFrontMatter - Function to validate frontmatter structure
 * @returns Array of parsed markdown files with frontmatter and content
 */
export async function fetchMarkdownFiles<FrontMatter>(
  accessToken: string,
  directoryUrl: string,
  hasValidFrontMatter: TvalidateFrontMatter<FrontMatter>,
): Promise<
  ActionResult<FetchMarkdownFilesResState, MarkdocFile<FrontMatter>[]>
> {
  console.log(
    `🔥 GitHub API CALL: fetchMarkdownFiles for directory: ${directoryUrl}`,
  );
  const [status, state, items] = await fetchFileItems(
    accessToken,
    directoryUrl,
  );
  if (status !== 200 || !items) {
    return [
      status,
      state === FetchFileItemsResState.directoryNotFound
        ? FetchMarkdownFilesResState.directoryNotFound
        : FetchMarkdownFilesResState.internalError,
      undefined,
    ];
  }

  // Process files in batches to respect GitHub API rate limits
  const batchSize = 10;
  const mdFiles: MarkdocFile<FrontMatter>[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchPromises = batch.map((item) =>
      fetchMarkdownFile(
        accessToken,
        directoryUrl,
        item.slug,
        hasValidFrontMatter,
      ),
    );

    const batchResults = await Promise.all(batchPromises);

    for (const [fetchStatus, fetchState, file] of batchResults) {
      if (fetchStatus !== 200 || !file) {
        if (fetchState === FetchMarkdownFileResState.fileIgnored) {
          continue;
        }
        console.error(
          `FetchMarkdownFiles failed with [${fetchStatus}] ${fetchState}.`,
        );
        return [
          fetchStatus,
          FetchMarkdownFilesResState.internalError,
          undefined,
        ];
      }
      mdFiles.push(file);
    }
  }

  return [200, FetchMarkdownFilesResState.success, mdFiles];
}
