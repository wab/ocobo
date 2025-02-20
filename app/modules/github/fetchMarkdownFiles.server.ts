import type { ActionResult, MarkdocFile, TvalidateFrontMatter } from '~/types';

import {
  FetchFileItemsResState,
  fetchFileItems,
} from './fetchFileItems.server';
import {
  FetchMarkdownFileResState,
  fetchMarkdownFile,
} from './fetchMarkdownFile.server';

export enum FetchMarkdownFilesResState {
  directoryNotFound = 'directory_not_found',
  internalError = 'internal_error',
  success = 'success',
}

export async function fetchMarkdownFiles<FrontMatter>(
  accessToken: string,
  directoryUrl: string,
  hasValidFrontMatter: TvalidateFrontMatter<FrontMatter>,
): Promise<
  ActionResult<FetchMarkdownFilesResState, MarkdocFile<FrontMatter>[]>
> {
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

  // Process files in batches of 10 to avoid overwhelming the API
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
