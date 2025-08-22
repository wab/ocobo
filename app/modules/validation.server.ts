/**
 * Content validation utilities powered by Zod
 *
 * This module provides robust type-safe validation for markdown frontmatter
 * with detailed error reporting and proper type inference.
 */

import { ContentValidationError } from './errors';
import {
  type BlogpostFrontmatter,
  BlogpostFrontmatterSchema,
  type PageFrontmatter,
  PageFrontmatterSchema,
  type StoryFrontmatter,
  StoryFrontmatterSchema,
  validateWithSchema,
} from './schemas';

/**
 * Validates story frontmatter and throws detailed errors on failure
 */
export function validateStoryFrontMatter(
  attributes: unknown,
): attributes is StoryFrontmatter {
  const result = validateWithSchema(
    StoryFrontmatterSchema,
    attributes,
    'Story',
  );

  if (!result.success) {
    throw new ContentValidationError(
      'Invalid story frontmatter',
      'story',
      result.issues,
      { attributes, zodError: result.error },
    );
  }

  return true;
}

/**
 * Validates blog post frontmatter and throws detailed errors on failure
 */
export function validateBlogpostFrontMatter(
  attributes: unknown,
): attributes is BlogpostFrontmatter {
  const result = validateWithSchema(
    BlogpostFrontmatterSchema,
    attributes,
    'Blogpost',
  );

  if (!result.success) {
    throw new ContentValidationError(
      'Invalid blog post frontmatter',
      'blogpost',
      result.issues,
      { attributes, zodError: result.error },
    );
  }

  return true;
}

/**
 * Validates page frontmatter and throws detailed errors on failure
 */
export function validatePageFrontMatter(
  attributes: unknown,
): attributes is PageFrontmatter {
  const result = validateWithSchema(PageFrontmatterSchema, attributes, 'Page');

  if (!result.success) {
    throw new ContentValidationError(
      'Invalid page frontmatter',
      'page',
      result.issues,
      { attributes, zodError: result.error },
    );
  }

  return true;
}

/**
 * Safe validation functions that return validation results instead of throwing
 */
export const SafeValidators = {
  /**
   * Safely validate story frontmatter without throwing
   */
  story: (attributes: unknown) =>
    validateWithSchema(StoryFrontmatterSchema, attributes, 'Story'),

  /**
   * Safely validate blog post frontmatter without throwing
   */
  blogpost: (attributes: unknown) =>
    validateWithSchema(BlogpostFrontmatterSchema, attributes, 'Blogpost'),

  /**
   * Safely validate page frontmatter without throwing
   */
  page: (attributes: unknown) =>
    validateWithSchema(PageFrontmatterSchema, attributes, 'Page'),
} as const;
