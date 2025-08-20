/**
 * Local filesystem markdown file fetching utilities
 *
 * This module provides functions to read and parse markdown files
 * from the local filesystem during development.
 */
import fs from 'fs/promises';

import Markdoc from '@markdoc/markdoc';
import yaml from 'js-yaml';
import invariant from 'tiny-invariant';

import type { ActionResult, MarkdocFile, TvalidateFrontMatter } from '~/types';

import { config } from '../config';

/**
 * Possible states when fetching a markdown file from filesystem
 */
export enum FetchMarkdownFileResState {
  fileNotFound = 'file_not_found',
  internalError = 'internal_error',
  success = 'success',
}

/**
 * Constructs the full file path for a markdown file
 * Handles empty slug by using 'index.md' as default
 */
const getContentPath = (url: string, slug: string): string => {
  let fileName = slug;
  if (slug === '') {
    fileName = 'index';
  }
  return `${url}/${fileName}.md`;
};

/**
 * Fetches and parses a markdown file from the local filesystem
 *
 * @param path - Base directory path containing markdown files
 * @param slug - File identifier (without .md extension)
 * @param hasValidFrontMatter - Function to validate frontmatter structure
 * @returns Parsed markdown file with frontmatter and transformed content
 */
export async function fetchMarkdownFileFs<FrontMatter>(
  path: string,
  slug: string,
  hasValidFrontMatter: TvalidateFrontMatter<FrontMatter>,
): Promise<ActionResult<FetchMarkdownFileResState, MarkdocFile<FrontMatter>>> {
  const file = await fs.readFile(getContentPath(path, slug), 'utf8');
  if (!file) {
    return [500, FetchMarkdownFileResState.fileNotFound, undefined];
  }
  const markdown = file.toString();
  const ast = Markdoc.parse(markdown);
  const frontmatter = ast.attributes.frontmatter
    ? yaml.load(ast.attributes.frontmatter)
    : {};
  try {
    invariant(
      hasValidFrontMatter(frontmatter),
      `File ${slug} is missing frontmatter information`,
    );
  } catch (error: unknown) {
    console.error(error);
    return [500, FetchMarkdownFileResState.internalError, undefined];
  }

  const content = Markdoc.transform(ast, config);
  return [
    200,
    FetchMarkdownFileResState.success,
    {
      slug,
      frontmatter,
      content,
      markdown,
    },
  ];
}
