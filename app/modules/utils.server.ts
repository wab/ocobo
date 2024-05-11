import { type Language } from '~/localization/resources';

import { getPrivateEnvVars } from './env.server';
import { fetchMarkdownFileFs } from './fs/fetchMarkdownFile.server';
import { fetchMarkdownFilesFs } from './fs/fetchMarkdownFiles.server';
import { fetchMarkdownFile } from './github/fetchMarkdownFile.server';
import { fetchMarkdownFiles } from './github/fetchMarkdownFiles.server';
import { validateFrontMatter } from './validation.server';

const getLocaleStoryPath = (locale: Language) => {
  const { localeRepoAPIUrl } = getPrivateEnvVars();

  return `${localeRepoAPIUrl}/stories/${locale}`;
};

const getGithubStoryPath = (locale: Language) => {
  const { githubRepoAPIUrl } = getPrivateEnvVars();
  return `${githubRepoAPIUrl}/stories/${locale}`;
};

export const fetchStories = async () => {
  const { githubAccessToken, readContentFrom } = getPrivateEnvVars();

  console.log('localeRepoAPIUrl', getLocaleStoryPath('fr'));

  switch (readContentFrom) {
    default:
    case 'github':
      return fetchMarkdownFiles(
        githubAccessToken,
        getGithubStoryPath('fr'),
        validateFrontMatter,
      );
    case 'locale':
      return fetchMarkdownFilesFs(
        getLocaleStoryPath('fr'),
        validateFrontMatter,
      );
  }
};

export const fetchStory = async (slug: string) => {
  const { githubAccessToken, readContentFrom } = getPrivateEnvVars();

  switch (readContentFrom) {
    default:
    case 'github':
      return fetchMarkdownFile(
        githubAccessToken,
        getGithubStoryPath('fr'),
        slug,
        validateFrontMatter,
      );
    case 'locale':
      return fetchMarkdownFileFs(
        getLocaleStoryPath('fr'),
        slug,
        validateFrontMatter,
      );
  }
};
