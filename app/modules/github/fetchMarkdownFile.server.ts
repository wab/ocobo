import Markdoc from '@markdoc/markdoc';
import yaml from 'js-yaml';
import invariant from 'tiny-invariant';

import type { ActionResult, MarkdocFile, TvalidateFrontMatter } from '~/types';

import { config } from '../config';

export enum FetchMarkdownFileResState {
  fileNotFound = 'file_not_found',
  fileFrontmatterMissing = 'file_frontmatter_missing',
  fileIgnored = 'file_ignored',
  internalError = 'internal_error',
  success = 'success',
}

const getContentPath = (url: string, slug: string): string => {
  let fileName = slug;
  if (slug === '') {
    fileName = 'index';
  }
  return `${url}/${fileName}.md`;
};

export async function fetchMarkdownFile<FrontMatter>(
  accessToken: string,
  path: string,
  slug = '',
  hasValidFrontMatter: TvalidateFrontMatter<FrontMatter>,
): Promise<ActionResult<FetchMarkdownFileResState, MarkdocFile<FrontMatter>>> {
  const contentUrl = getContentPath(path, slug);

  // Create headers object directly instead of using Headers class
  const headers = {
    Accept: 'application/vnd.github.v3.raw',
    Authorization: `token ${accessToken}`,
    'User-Agent': 'ocobo-posts',
  };

  // Add timeout handling
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch(contentUrl, {
      headers,
      signal: controller.signal,
      cache: 'force-cache', // Enable caching
    });

    clearTimeout(timeout);

    if (!response.ok || response.status !== 200) {
      console.error(
        `GitHub fetch markdown API request failed: ok: ${response.ok} (${response.status}): ${response.statusText}`,
      );
      return [
        response.status,
        response.status === 404
          ? FetchMarkdownFileResState.fileNotFound
          : FetchMarkdownFileResState.internalError,
        undefined,
      ];
    }

    const markdown = await response.text();
    const ast = Markdoc.parse(markdown);
    const frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};

    if (frontmatter?.ignore) {
      return [404, FetchMarkdownFileResState.fileIgnored, undefined];
    }

    try {
      invariant(
        hasValidFrontMatter(frontmatter),
        `File ${contentUrl} is missing frontmatter attributes`,
      );
    } catch (error: unknown) {
      console.error(error);
      return [500, FetchMarkdownFileResState.fileFrontmatterMissing, undefined];
    }

    const content = Markdoc.transform(ast, config);
    return [
      200,
      FetchMarkdownFileResState.success,
      { slug, frontmatter, content, markdown },
    ];
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      console.error('Request timed out');
      return [408, FetchMarkdownFileResState.internalError, undefined];
    }
    console.error('Fetch error:', error);
    return [500, FetchMarkdownFileResState.internalError, undefined];
  }
}
