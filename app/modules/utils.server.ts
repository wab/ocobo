/**
 * Content management utilities
 *
 * This module provides high-level functions for fetching and caching content
 * from either local filesystem (development) or GitHub API (production).
 * Includes intelligent caching and content type validation.
 */
import { TvalidateFrontMatter } from '~/types';
import type { BlogpostFrontmatter, StoryFrontmatter } from '~/types';
import type { MarkdocFile } from '~/types';

import { getPrivateEnvVars } from './env.server';
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
 */
async function fetchMarkdownEntries<T>(
  path: string,
  validateFrontMatter: TvalidateFrontMatter<T>,
) {
  const {
    githubAccessToken,
    readContentFrom,
    localeRepoAPIUrl,
    githubRepoAPIUrl,
  } = getPrivateEnvVars();

  switch (readContentFrom) {
    default:
    case 'github':
      return fetchMarkdownFiles(
        githubAccessToken,
        `${githubRepoAPIUrl}/${path}`,
        validateFrontMatter,
      );
    case 'locale':
      return fetchMarkdownFilesFs(
        `${localeRepoAPIUrl}/${path}`,
        validateFrontMatter,
      );
  }
}

/**
 * Generic function to fetch a single markdown file from either source
 * Automatically switches between local filesystem and GitHub based on environment
 */
const fetchMarkdownEntry = async <T>(
  path: string,
  slug: string,
  validateFrontMatter: TvalidateFrontMatter<T>,
) => {
  const {
    githubAccessToken,
    readContentFrom,
    localeRepoAPIUrl,
    githubRepoAPIUrl,
  } = getPrivateEnvVars();

  switch (readContentFrom) {
    default:
    case 'github':
      return fetchMarkdownFile(
        githubAccessToken,
        `${githubRepoAPIUrl}/${path}`,
        slug,
        validateFrontMatter,
      );
    case 'locale':
      return fetchMarkdownFileFs(
        `${localeRepoAPIUrl}/${path}`,
        slug,
        validateFrontMatter,
      );
  }
};

// ========================================
// CACHING CONFIGURATION
// ========================================

/**
 * Cache duration: 2 hours in milliseconds
 * Balances performance with content freshness
 */
const CACHE_TTL = 2 * 60 * 60 * 1000;

/**
 * In-memory cache for client stories
 * Reduces API calls and improves performance for frequently accessed content
 */
let storiesCache: {
  stories: [number, string, MarkdocFile<StoryFrontmatter>[]];
  timestamp: number;
} | null = null;

// ========================================
// CLIENT STORIES FUNCTIONS
// ========================================

/**
 * Fetches all client stories with intelligent caching
 *
 * @param forceRefresh - Skip cache and fetch fresh data
 * @returns Array of story markdown files with metadata
 */
const fetchStories = async (forceRefresh = false) => {
  // Return cached stories if they exist and haven't expired
  if (
    !forceRefresh &&
    storiesCache &&
    Date.now() - storiesCache.timestamp < CACHE_TTL
  ) {
    return storiesCache.stories;
  }

  const [status, state, files] = await fetchMarkdownEntries(
    'stories/fr',
    validateStoryFrontMatter,
  );

  if (status !== 200 || !files) {
    throw Error(`Error (${status}) ${state}: Failed to fetch stories.`);
  }

  // Update cache
  storiesCache = {
    stories: [status, state, files],
    timestamp: Date.now(),
  };

  return [status, state, files];
};

/**
 * Fetches a single client story by slug
 *
 * @param slug - Story identifier (filename without extension)
 * @returns Single story markdown file with metadata
 */
const fetchStory = async (slug: string) => {
  const [status, state, article] = await fetchMarkdownEntry(
    'stories/fr',
    slug,
    validateStoryFrontMatter,
  );

  if (status !== 200 || !article) {
    throw Error(`Error (${status}) ${state}: Failed to fetch story ${slug}.`);
  }

  return article;
};

// ========================================
// GENERIC PAGE FUNCTIONS
// ========================================

/**
 * Fetches all pages from a specified directory
 * Used for legal pages, media content, etc.
 *
 * @param path - Directory path relative to content root
 * @returns Array of page markdown files
 */
const fetchPages = async (path: string) => {
  const [status, state, files] = await fetchMarkdownEntries(
    path,
    validatePageFrontMatter,
  );

  if (status !== 200 || !files) {
    throw Error(`Error (${status}) ${state}: Failed to fetch stories.`);
  }

  return files;
};

/**
 * Fetches a single page by path and slug
 *
 * @param path - Directory path relative to content root
 * @param slug - Page identifier (filename without extension)
 * @returns Single page markdown file
 */
const fetchPage = async (path: string, slug: string) => {
  const [status, state, article] = await fetchMarkdownEntry(
    path,
    slug,
    validatePageFrontMatter,
  );

  if (status !== 200 || !article) {
    throw Error(`Error (${status}) ${state}: Failed to fetch story ${slug}.`);
  }

  return article;
};

// ========================================
// BLOG POSTS FUNCTIONS
// ========================================

/**
 * In-memory cache for blog posts
 * Reduces API calls and improves performance for blog listing pages
 */
let blogPostsCache: {
  posts: Awaited<ReturnType<typeof fetchMarkdownEntries<BlogpostFrontmatter>>>;
  timestamp: number;
} | null = null;

/**
 * Fetches all blog posts with intelligent caching
 *
 * @param forceRefresh - Skip cache and fetch fresh data
 * @returns Array of blog post markdown files with metadata
 */
const fetchBlogPosts = async (forceRefresh = false) => {
  // Return cached posts if they exist and haven't expired
  if (
    !forceRefresh &&
    blogPostsCache &&
    Date.now() - blogPostsCache.timestamp < CACHE_TTL
  ) {
    return blogPostsCache.posts;
  }

  const posts = await fetchMarkdownEntries<BlogpostFrontmatter>(
    'blog/fr',
    validateBlogpostFrontMatter,
  );

  // Update cache
  blogPostsCache = {
    posts,
    timestamp: Date.now(),
  };

  return posts;
};

/**
 * Fetches a single blog post by slug
 *
 * @param slug - Blog post identifier (filename without extension)
 * @returns Single blog post markdown file with metadata
 */
const fetchBlogPost = async (slug: string) => {
  const [status, state, article] = await fetchMarkdownEntry(
    'blog/fr',
    slug,
    validateBlogpostFrontMatter,
  );

  if (status !== 200 || !article) {
    throw Error(
      `Error (${status}) ${state}: Failed to fetch blogpost ${slug}.`,
    );
  }

  return article;
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
