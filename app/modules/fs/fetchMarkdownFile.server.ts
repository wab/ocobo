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
import {
  FileSystemError,
  FrontmatterValidationError,
  toContentError,
} from '../errors';

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
  const filePath = getContentPath(path, slug);

  try {
    const file = await fs.readFile(filePath, 'utf8');
    if (!file) {
      return [404, FetchMarkdownFileResState.fileNotFound, undefined];
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
      const validationError = new FrontmatterValidationError(
        filePath,
        ['Invalid frontmatter structure'],
        { originalError: error, slug },
      );
      console.error(validationError.message);
      return [422, FetchMarkdownFileResState.internalError, undefined];
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
  } catch (error: unknown) {
    if (error instanceof FrontmatterValidationError) {
      return [422, FetchMarkdownFileResState.internalError, undefined];
    }

    // Handle filesystem errors
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [404, FetchMarkdownFileResState.fileNotFound, undefined];
    }

    const fsError = new FileSystemError(
      `Failed to read file: ${filePath}`,
      'read',
      filePath,
      { originalError: error, slug },
    );
    console.error(fsError.message);
    return [500, FetchMarkdownFileResState.internalError, undefined];
  }
}
