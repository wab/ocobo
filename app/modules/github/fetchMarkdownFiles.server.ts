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
  // console.debug('fetchMarkdownFiles called');

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

  const mdFiles: MarkdocFile<FrontMatter>[] = [];
  for (const item of items) {
    const [fetchStatus, fetchState, file] = await fetchMarkdownFile(
      accessToken,
      directoryUrl,
      item.slug,
      hasValidFrontMatter,
    );
    if (fetchStatus !== 200 || !file) {
      if (fetchState === FetchMarkdownFileResState.fileIgnored) {
        continue;
      }
      console.error(
        `FetchMarkdownFiles failed for ${directoryUrl}/${item.slug} with [${fetchStatus}] ${fetchState}.`,
      );
      return [fetchStatus, FetchMarkdownFilesResState.internalError, undefined];
    }
    mdFiles.push(file);
  }
  return [200, FetchMarkdownFilesResState.success, mdFiles];
}
