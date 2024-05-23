/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  BlogpostFrontmatter,
  PageFrontmatter,
  StoryFrontmatter,
} from '~/types';

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

export function validatePageFrontMatter(
  attributes: unknown,
): attributes is PageFrontmatter {
  return (
    !!attributes &&
    typeof attributes !== 'function' &&
    typeof attributes === 'object'
  );
}

export function validateBlogpostFrontMatter(
  attributes: unknown,
): attributes is BlogpostFrontmatter {
  return (
    !!attributes &&
    typeof attributes !== 'function' &&
    typeof attributes === 'object'
  );
}
