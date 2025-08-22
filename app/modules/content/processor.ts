/**
 * Generic content processing pipeline
 *
 * This module provides the core markdown processing logic that's shared
 * across all content sources and file types.
 */

import Markdoc from '@markdoc/markdoc';
import yaml from 'js-yaml';
import invariant from 'tiny-invariant';

import type { MarkdocFile } from '~/types';
import { ContentValidationError } from '../errors';

import type {
  ContentProcessingOptions,
  ContentValidator,
  ProcessingResult,
} from './types';

/**
 * Processes raw markdown content into a structured MarkdocFile
 */
export function processMarkdownContent<T>(
  markdown: string,
  slug: string,
  validator: ContentValidator<T>,
  markdocConfig: any,
  options: ContentProcessingOptions = {},
): ProcessingResult<T> {
  try {
    // Parse markdown with Markdoc
    const ast = Markdoc.parse(markdown);

    // Extract and parse frontmatter
    const frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter, { schema: yaml.CORE_SCHEMA })
      : {};

    // Check for ignore flag
    if (
      options.respectIgnoreFlag &&
      frontmatter &&
      typeof frontmatter === 'object' &&
      'ignore' in frontmatter &&
      frontmatter.ignore
    ) {
      return {
        success: true,
        ignored: true,
      };
    }

    // Validate frontmatter
    try {
      invariant(
        validator.isValid(frontmatter),
        `Invalid frontmatter for ${validator.typeName}`,
      );
    } catch (error: unknown) {
      // Use Zod for detailed error reporting
      const validationResult = validator.schema.safeParse(frontmatter);
      if (!validationResult.success) {
        const issues = validationResult.error.issues.map((issue) => {
          const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
          const contextStr = options.context ? `[${options.context}] ` : '';
          return `${contextStr}${path}: ${issue.message}`;
        });

        throw new ContentValidationError(
          `Invalid ${validator.typeName} frontmatter`,
          validator.typeName,
          issues,
          {
            frontmatter,
            zodError: validationResult.error,
            slug,
            context: options.context,
          },
        );
      }

      // Re-throw original error if not a validation issue
      throw error;
    }

    // Transform content
    const content = Markdoc.transform(ast, markdocConfig);

    return {
      success: true,
      data: {
        slug: normalizeSlug(slug),
        frontmatter: frontmatter as T,
        content,
        markdown,
      },
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Normalizes a slug by removing .md extension and handling index files
 */
export function normalizeSlug(slug: string): string {
  return slug.replace('.md', '').replace('index', '');
}

/**
 * Constructs a file path from base path and slug
 */
export function constructFilePath(basePath: string, slug: string): string {
  let fileName = slug;
  if (slug === '' || slug === 'index') {
    fileName = 'index';
  }
  return `${basePath}/${fileName}.md`;
}

/**
 * Maps HTTP status codes to content fetch states
 */
export function mapStatusToState(
  status: number,
): 'success' | 'not_found' | 'source_error' {
  switch (status) {
    case 200:
      return 'success';
    case 404:
      return 'not_found';
    default:
      return 'source_error';
  }
}

/**
 * Creates a content validator from a Zod schema
 */
export function createValidator<T>(
  schema: any,
  typeName: string,
): ContentValidator<T> {
  return {
    isValid: (data: unknown): data is T => schema.safeParse(data).success,
    schema,
    typeName,
  };
}
