/**
 * Content management utilities
 *
 * This module provides high-level functions for fetching and caching content
 * from either local filesystem (development) or GitHub API (production).
 * Features intelligent caching, proper error handling, and content validation.
 */
import { TvalidateFrontMatter } from '~/types';
import type { BlogpostFrontmatter, StoryFrontmatter } from '~/types';
import type { MarkdocFile } from '~/types';

import { CacheKeys, contentCache } from './cache';
import { getPrivateEnvVars } from './env.server';
import {
  ContentFetchError,
  ContentNotFoundError,
  toContentError,
} from './errors';
import { fetchMarkdownFileFs } from './fs/fetchMarkdownFile.server';
import { fetchMarkdownFilesFs } from './fs/fetchMarkdownFiles.server';
import { fetchMarkdownFile } from './github/fetchMarkdownFile.server';
import { fetchMarkdownFiles } from './github/fetchMarkdownFiles.server';
import {
  validateBlogpostFrontMatter,
  validatePageFrontMatter,
  validateStoryFrontMatter,
} from './validation.server';

/**
 * Generic function to fetch multiple markdown files from either source
 * Automatically switches between local filesystem and GitHub based on environment
 * Includes proper error handling and converts errors to ContentError types
 */
async function fetchMarkdownEntries<T>(
  path: string,
  validateFrontMatter: TvalidateFrontMatter<T>,
) {
  try {
    const {
      githubAccessToken,
      readContentFrom,
      localeRepoAPIUrl,
      githubRepoAPIUrl,
    } = getPrivateEnvVars();

    switch (readContentFrom) {
      default:
      case 'github': {
        const result = await fetchMarkdownFiles(
          githubAccessToken,
          `${githubRepoAPIUrl}/${path}`,
          validateFrontMatter,
        );

        if (result[0] !== 200 || !result[2]) {
          throw new ContentFetchError(
            `Failed to fetch content from GitHub: ${result[1]}`,
            'github',
            path,
            result[0],
          );
        }

        return result;
      }
      case 'locale': {
        const result = await fetchMarkdownFilesFs(
          `${localeRepoAPIUrl}/${path}`,
          validateFrontMatter,
        );

        if (result[0] !== 200 || !result[2]) {
          throw new ContentFetchError(
            `Failed to fetch content from filesystem: ${result[1]}`,
            'filesystem',
            path,
            result[0],
          );
        }

        return result;
      }
    }
  } catch (error) {
    throw toContentError(
      error,
      `Failed to fetch markdown entries from ${path}`,
      {
        path,
      },
    );
  }
}

/**
 * Generic function to fetch a single markdown file from either source
 * Automatically switches between local filesystem and GitHub based on environment
 * Includes proper error handling and converts errors to ContentError types
 */
const fetchMarkdownEntry = async <T>(
  path: string,
  slug: string,
  validateFrontMatter: TvalidateFrontMatter<T>,
) => {
  try {
    const {
      githubAccessToken,
      readContentFrom,
      localeRepoAPIUrl,
      githubRepoAPIUrl,
    } = getPrivateEnvVars();

    switch (readContentFrom) {
      default:
      case 'github': {
        const result = await fetchMarkdownFile(
          githubAccessToken,
          `${githubRepoAPIUrl}/${path}`,
          slug,
          validateFrontMatter,
        );

        if (result[0] === 404) {
          throw new ContentNotFoundError('content', slug, { path });
        }

        if (result[0] !== 200 || !result[2]) {
          throw new ContentFetchError(
            `Failed to fetch content from GitHub: ${result[1]}`,
            'github',
            `${path}/${slug}`,
            result[0],
          );
        }

        return result[2];
      }
      case 'locale': {
        const result = await fetchMarkdownFileFs(
          `${localeRepoAPIUrl}/${path}`,
          slug,
          validateFrontMatter,
        );

        if (result[0] === 404) {
          throw new ContentNotFoundError('content', slug, { path });
        }

        if (result[0] !== 200 || !result[2]) {
          throw new ContentFetchError(
            `Failed to fetch content from filesystem: ${result[1]}`,
            'filesystem',
            `${path}/${slug}`,
            result[0],
          );
        }

        return result[2];
      }
    }
  } catch (error) {
    if (
      error instanceof ContentNotFoundError ||
      error instanceof ContentFetchError
    ) {
      throw error;
    }
    throw toContentError(
      error,
      `Failed to fetch markdown entry ${slug} from ${path}`,
      {
        path,
        slug,
      },
    );
  }
};

// ========================================
// CACHING CONFIGURATION
// ========================================
// Caching is now handled by the ContentCache service
// No need for manual cache management

// ========================================
// CLIENT STORIES FUNCTIONS
// ========================================

/**
 * Fetches all client stories with intelligent caching
 *
 * @param forceRefresh - Skip cache and fetch fresh data
 * @param language - Content language (defaults to French)
 * @returns Array of story markdown files with metadata
 */
const fetchStories = async (forceRefresh = false, language = 'fr') => {
  const cacheKey = CacheKeys.stories(language);

  // Try to get from cache first
  if (!forceRefresh) {
    const cached =
      await contentCache.get<[number, string, MarkdocFile<StoryFrontmatter>[]]>(
        cacheKey,
      );
    if (cached) {
      return cached;
    }
  }

  try {
    const [status, state, files] = await fetchMarkdownEntries(
      `stories/${language}`,
      validateStoryFrontMatter,
    );

    const result: [number, string, MarkdocFile<StoryFrontmatter>[]] = [
      status,
      state,
      files ?? [],
    ];

    // Cache the successful result
    await contentCache.set(cacheKey, result);

    return result;
  } catch (error) {
    throw toContentError(error, 'Failed to fetch stories', {
      language,
      forceRefresh,
    });
  }
};

/**
 * Fetches a single client story by slug
 *
 * @param slug - Story identifier (filename without extension)
 * @param language - Content language (defaults to French)
 * @returns Single story markdown file with metadata
 */
const fetchStory = async (slug: string, language = 'fr') => {
  const cacheKey = CacheKeys.story(slug, language);

  // Try to get from cache first
  const cached =
    await contentCache.get<MarkdocFile<StoryFrontmatter>>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const article = await fetchMarkdownEntry(
      `stories/${language}`,
      slug,
      validateStoryFrontMatter,
    );

    // Cache the successful result
    await contentCache.set(cacheKey, article);

    return article;
  } catch (error) {
    throw toContentError(error, `Failed to fetch story: ${slug}`, {
      slug,
      language,
    });
  }
};

// ========================================
// GENERIC PAGE FUNCTIONS
// ========================================

/**
 * Fetches all pages from a specified directory
 * Used for legal pages, media content, etc.
 *
 * @param path - Directory path relative to content root
 * @param forceRefresh - Skip cache and fetch fresh data
 * @returns Array of page markdown files
 */
const fetchPages = async (path: string, forceRefresh = false) => {
  const cacheKey = CacheKeys.pages(path);

  // Try to get from cache first
  if (!forceRefresh) {
    const cached = await contentCache.get<MarkdocFile<any>[]>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const [_status, _state, files] = await fetchMarkdownEntries(
      path,
      validatePageFrontMatter,
    );

    // Cache the successful result
    await contentCache.set(cacheKey, files);

    return files;
  } catch (error) {
    throw toContentError(error, `Failed to fetch pages from: ${path}`, {
      path,
      forceRefresh,
    });
  }
};

/**
 * Fetches a single page by path and slug
 *
 * @param path - Directory path relative to content root
 * @param slug - Page identifier (filename without extension)
 * @returns Single page markdown file
 */
const fetchPage = async (path: string, slug: string) => {
  const cacheKey = CacheKeys.page(path, slug);

  // Try to get from cache first
  const cached = await contentCache.get<MarkdocFile<any>>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const article = await fetchMarkdownEntry(
      path,
      slug,
      validatePageFrontMatter,
    );

    // Cache the successful result
    await contentCache.set(cacheKey, article);

    return article;
  } catch (error) {
    throw toContentError(error, `Failed to fetch page: ${slug} from ${path}`, {
      path,
      slug,
    });
  }
};

// ========================================
// BLOG POSTS FUNCTIONS
// ========================================

/**
 * Fetches all blog posts with intelligent caching
 *
 * @param forceRefresh - Skip cache and fetch fresh data
 * @param language - Content language (defaults to French)
 * @returns Array of blog post markdown files with metadata
 */
const fetchBlogPosts = async (forceRefresh = false, language = 'fr') => {
  const cacheKey = CacheKeys.blogPosts(language);

  // Try to get from cache first
  if (!forceRefresh) {
    const cached =
      await contentCache.get<
        [number, string, MarkdocFile<BlogpostFrontmatter>[]]
      >(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const posts = await fetchMarkdownEntries<BlogpostFrontmatter>(
      `blog/${language}`,
      validateBlogpostFrontMatter,
    );

    // Cache the successful result
    await contentCache.set(cacheKey, posts);

    return posts;
  } catch (error) {
    throw toContentError(error, 'Failed to fetch blog posts', {
      language,
      forceRefresh,
    });
  }
};

/**
 * Fetches a single blog post by slug
 *
 * @param slug - Blog post identifier (filename without extension)
 * @param language - Content language (defaults to French)
 * @returns Single blog post markdown file with metadata
 */
const fetchBlogPost = async (slug: string, language = 'fr') => {
  const cacheKey = CacheKeys.blogPost(slug, language);

  // Try to get from cache first
  const cached =
    await contentCache.get<MarkdocFile<BlogpostFrontmatter>>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const article = await fetchMarkdownEntry(
      `blog/${language}`,
      slug,
      validateBlogpostFrontMatter,
    );

    // Cache the successful result
    await contentCache.set(cacheKey, article);

    return article;
  } catch (error) {
    throw toContentError(error, `Failed to fetch blog post: ${slug}`, {
      slug,
      language,
    });
  }
};

// ========================================
// CACHE MANAGEMENT UTILITIES
// ========================================

/**
 * Clear all content caches
 * Useful for cache invalidation after content updates
 */
export const clearContentCache = () => {
  contentCache.clear();
};

/**
 * Invalidate specific content type caches
 */
export const invalidateContentCache = {
  stories: (language?: string) => {
    if (language) {
      contentCache.invalidate(`story:${language}:.*`);
    } else {
      contentCache.invalidate('story:.*');
    }
  },
  blogPosts: (language?: string) => {
    if (language) {
      contentCache.invalidate(`blog:${language}:.*`);
    } else {
      contentCache.invalidate('blog:.*');
    }
  },
  pages: (path?: string) => {
    if (path) {
      contentCache.invalidate(`page:${path.replace(/\//g, ':')}:.*`);
    } else {
      contentCache.invalidate('page:.*');
    }
  },
};

/**
 * Get cache statistics for monitoring
 */
export const getContentCacheStats = () => {
  return {
    stats: contentCache.getStats(),
    hitRatio: contentCache.getHitRatio(),
  };
};

// ========================================
// EXPORTS
// ========================================

export {
  fetchPages,
  fetchPage,
  fetchStory,
  fetchStories,
  fetchBlogPosts,
  fetchBlogPost,
};
