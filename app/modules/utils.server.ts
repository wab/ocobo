import { TvalidateFrontMatter } from '~/types';

import { getPrivateEnvVars } from './env.server';
import { fetchMarkdownFileFs } from './fs/fetchMarkdownFile.server';
import { fetchMarkdownFilesFs } from './fs/fetchMarkdownFiles.server';
import { fetchMarkdownFile } from './github/fetchMarkdownFile.server';
import { fetchMarkdownFiles } from './github/fetchMarkdownFiles.server';
import {
  validateStoryFrontMatter,
  validatePageFrontMatter,
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

const fetchStories = async () => {
  const [status, state, files] = await fetchMarkdownEntries(
    'stories/fr',
    validateStoryFrontMatter,
  );

  if (status !== 200 || !files) {
    throw Error(`Error (${status}) ${state}: Failed to fetch stories.`);
  }

  return files;
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

export { fetchPages, fetchPage, fetchStory, fetchStories };
