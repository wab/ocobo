/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Frontmatter validation utilities
 *
 * This module provides type guards for validating markdown frontmatter
 * to ensure content files have the required metadata structure.
 */
import {
  BlogpostFrontmatter,
  PageFrontmatter,
  StoryFrontmatter,
} from '~/types';

/**
 * Validates that attributes conform to StoryFrontmatter structure
 * Stories require title, description, tags array, and date object
 */
export function validateStoryFrontMatter(
  attributes: unknown,
): attributes is StoryFrontmatter {
  return (
    !!attributes &&
    typeof attributes !== 'function' &&
    typeof attributes === 'object' &&
    typeof (attributes as any)['title'] === 'string' &&
    typeof (attributes as any)['description'] === 'string' &&
    Array.isArray((attributes as any)['tags']) &&
    typeof (attributes as any)['date'] === 'object'
  );
}

/**
 * Validates that attributes conform to PageFrontmatter structure
 * Pages have minimal requirements - just need to be a valid object
 */
export function validatePageFrontMatter(
  attributes: unknown,
): attributes is PageFrontmatter {
  return (
    !!attributes &&
    typeof attributes !== 'function' &&
    typeof attributes === 'object'
  );
}

/**
 * Validates that attributes conform to BlogpostFrontmatter structure
 * Blog posts have minimal requirements - just need to be a valid object
 */
export function validateBlogpostFrontMatter(
  attributes: unknown,
): attributes is BlogpostFrontmatter {
  return (
    !!attributes &&
    typeof attributes !== 'function' &&
    typeof attributes === 'object'
  );
}
