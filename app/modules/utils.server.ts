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

// Cache for stories with 2-hour TTL
let storiesCache: {
  stories: [number, string, MarkdocFile<StoryFrontmatter>[]];
  timestamp: number;
} | null = null;

const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

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

// Cache for blog posts with 2-hour TTL
let blogPostsCache: {
  posts: Awaited<ReturnType<typeof fetchMarkdownEntries<BlogpostFrontmatter>>>;
  timestamp: number;
} | null = null;

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

export {
  fetchPages,
  fetchPage,
  fetchStory,
  fetchStories,
  fetchBlogPosts,
  fetchBlogPost,
};
