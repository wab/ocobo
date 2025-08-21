/**
 * Integration tests for content fetching utilities
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { contentCache } from './cache';
import { ContentFetchError, ContentNotFoundError } from './errors';
import { DEFAULT_LANGUAGE } from './language';
import {
  clearContentCache,
  fetchBlogPost,
  fetchBlogPosts,
  fetchPage,
  fetchPages,
  fetchStories,
  fetchStory,
  getContentCacheStats,
  invalidateContentCache,
} from './utils.server';

// Mock external dependencies
vi.mock('./env.server', () => ({
  getPrivateEnvVars: vi.fn(() => ({
    env: 'development',
    githubAccessToken: 'test-token',
    githubRepoAPIUrl: 'https://api.github.com/repos/test/repo/contents',
    readContentFrom: 'github',
    localeRepoAPIUrl: '/local/repo',
  })),
}));

vi.mock('./github/fetchMarkdownFiles.server', () => ({
  fetchMarkdownFiles: vi.fn(),
}));

vi.mock('./github/fetchMarkdownFile.server', () => ({
  fetchMarkdownFile: vi.fn(),
}));

vi.mock('./fs/fetchMarkdownFiles.server', () => ({
  fetchMarkdownFilesFs: vi.fn(),
}));

vi.mock('./fs/fetchMarkdownFile.server', () => ({
  fetchMarkdownFileFs: vi.fn(),
}));

vi.mock('./validation.server', () => ({
  validateStoryFrontMatter: vi.fn(() => true),
  validateBlogpostFrontMatter: vi.fn(() => true),
  validatePageFrontMatter: vi.fn(() => true),
}));

import { getPrivateEnvVars } from './env.server';
import { fetchMarkdownFile } from './github/fetchMarkdownFile.server';
import { fetchMarkdownFiles } from './github/fetchMarkdownFiles.server';

const mockGetPrivateEnvVars = vi.mocked(getPrivateEnvVars);
const mockFetchMarkdownFiles = vi.mocked(fetchMarkdownFiles);
const mockFetchMarkdownFile = vi.mocked(fetchMarkdownFile);

describe('Content Fetching Utilities', () => {
  const mockStoryData = {
    slug: 'test-story',
    frontmatter: {
      title: 'Test Story',
      description: 'A test story',
      tags: ['test'],
      date: new Date(),
    },
    content: { type: 'div', children: ['Test content'] },
    markdown: '# Test Story\n\nTest content',
  };

  const mockBlogData = {
    slug: 'test-blog',
    frontmatter: {
      title: 'Test Blog Post',
      description: 'A test blog post',
      date: new Date(),
    },
    content: { type: 'div', children: ['Blog content'] },
    markdown: '# Test Blog\n\nBlog content',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    clearContentCache();

    // Setup default successful responses
    mockFetchMarkdownFiles.mockResolvedValue([200, 'success', [mockStoryData]]);
    mockFetchMarkdownFile.mockResolvedValue([200, 'success', mockStoryData]);
  });

  afterEach(() => {
    clearContentCache();
  });

  describe('fetchStories', () => {
    it('should fetch stories successfully', async () => {
      const result = await fetchStories();

      expect(result).toEqual([200, 'success', [mockStoryData]]);
      expect(mockFetchMarkdownFiles).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/stories/fr',
        expect.any(Function),
      );
    });

    it('should normalize unsupported languages to default', async () => {
      await fetchStories(false, 'en' as any); // 'en' not supported, should normalize to 'fr'

      expect(mockFetchMarkdownFiles).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/stories/fr',
        expect.any(Function),
      );
    });

    it('should use cache on subsequent calls', async () => {
      // First call
      await fetchStories();
      // Second call should use cache
      await fetchStories();

      expect(mockFetchMarkdownFiles).toHaveBeenCalledTimes(1);
    });

    it('should bypass cache when forceRefresh is true', async () => {
      // First call
      await fetchStories();
      // Second call with forceRefresh
      await fetchStories(true);

      expect(mockFetchMarkdownFiles).toHaveBeenCalledTimes(2);
    });

    it('should throw ContentFetchError when GitHub returns error', async () => {
      mockFetchMarkdownFiles.mockResolvedValueOnce([404, 'not_found', null]);

      await expect(fetchStories()).rejects.toThrow(ContentFetchError);
    });

    it('should handle GitHub API failures gracefully', async () => {
      mockFetchMarkdownFiles.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchStories()).rejects.toThrow();
    });
  });

  describe('fetchStory', () => {
    it('should fetch single story successfully', async () => {
      const result = await fetchStory('test-story');

      expect(result).toEqual(mockStoryData);
      expect(mockFetchMarkdownFile).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/stories/fr',
        'test-story',
        expect.any(Function),
      );
    });

    it('should normalize unsupported languages to default', async () => {
      await fetchStory('test-story', 'en' as any); // 'en' not supported, should normalize to 'fr'

      expect(mockFetchMarkdownFile).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/stories/fr',
        'test-story',
        expect.any(Function),
      );
    });

    it('should use cache for repeated requests', async () => {
      await fetchStory('test-story');
      await fetchStory('test-story');

      expect(mockFetchMarkdownFile).toHaveBeenCalledTimes(1);
    });

    it('should throw ContentNotFoundError for 404 responses', async () => {
      mockFetchMarkdownFile.mockResolvedValueOnce([404, 'not_found', null]);

      await expect(fetchStory('missing-story')).rejects.toThrow(
        ContentNotFoundError,
      );
    });

    it('should cache stories with same normalized language together', async () => {
      await fetchStory('test-story', 'fr');
      await fetchStory('test-story', 'en' as any); // Both normalize to 'fr'

      // Should only call API once since both requests normalize to 'fr'
      expect(mockFetchMarkdownFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchBlogPosts', () => {
    beforeEach(() => {
      mockFetchMarkdownFiles.mockResolvedValue([
        200,
        'success',
        [mockBlogData],
      ]);
    });

    it('should fetch blog posts successfully', async () => {
      const result = await fetchBlogPosts();

      expect(result).toEqual([200, 'success', [mockBlogData]]);
      expect(mockFetchMarkdownFiles).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/blog/fr',
        expect.any(Function),
      );
    });

    it('should normalize unsupported languages to default', async () => {
      await fetchBlogPosts(false, 'en' as any); // 'en' not supported, should normalize to 'fr'

      expect(mockFetchMarkdownFiles).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/blog/fr',
        expect.any(Function),
      );
    });

    it('should use cache effectively', async () => {
      await fetchBlogPosts();
      await fetchBlogPosts(); // Should use cache

      expect(mockFetchMarkdownFiles).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchBlogPost', () => {
    beforeEach(() => {
      mockFetchMarkdownFile.mockResolvedValue([200, 'success', mockBlogData]);
    });

    it('should fetch single blog post successfully', async () => {
      const result = await fetchBlogPost('test-blog');

      expect(result).toEqual(mockBlogData);
      expect(mockFetchMarkdownFile).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/blog/fr',
        'test-blog',
        expect.any(Function),
      );
    });

    it('should cache blog posts independently from stories', async () => {
      await fetchBlogPost('test-blog');
      await fetchStory('test-story');

      expect(mockFetchMarkdownFile).toHaveBeenCalledTimes(2);
    });
  });

  describe('fetchPages', () => {
    const mockPageData = {
      slug: 'test-page',
      frontmatter: { title: 'Test Page' },
      content: { type: 'div', children: ['Page content'] },
      markdown: '# Test Page\n\nPage content',
    };

    beforeEach(() => {
      mockFetchMarkdownFiles.mockResolvedValue([
        200,
        'success',
        [mockPageData],
      ]);
    });

    it('should fetch pages successfully', async () => {
      const result = await fetchPages('legal');

      expect(result).toEqual([mockPageData]);
      expect(mockFetchMarkdownFiles).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/legal',
        expect.any(Function),
      );
    });

    it('should cache pages by path', async () => {
      await fetchPages('legal');
      await fetchPages('legal'); // Should use cache

      expect(mockFetchMarkdownFiles).toHaveBeenCalledTimes(1);
    });

    it('should cache different paths separately', async () => {
      await fetchPages('legal');
      await fetchPages('media');

      expect(mockFetchMarkdownFiles).toHaveBeenCalledTimes(2);
    });
  });

  describe('fetchPage', () => {
    const mockPageData = {
      slug: 'terms',
      frontmatter: { title: 'Terms of Service' },
      content: { type: 'div', children: ['Terms content'] },
      markdown: '# Terms\n\nTerms content',
    };

    beforeEach(() => {
      mockFetchMarkdownFile.mockResolvedValue([200, 'success', mockPageData]);
    });

    it('should fetch single page successfully', async () => {
      const result = await fetchPage('legal', 'terms');

      expect(result).toEqual(mockPageData);
      expect(mockFetchMarkdownFile).toHaveBeenCalledWith(
        'test-token',
        'https://api.github.com/repos/test/repo/contents/legal',
        'terms',
        expect.any(Function),
      );
    });

    it('should cache individual pages', async () => {
      await fetchPage('legal', 'terms');
      await fetchPage('legal', 'terms');

      expect(mockFetchMarkdownFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cache Management', () => {
    it('should clear all content cache', async () => {
      // Populate cache
      await fetchStory('test-story');
      await fetchBlogPost('test-blog');

      let stats = getContentCacheStats();
      expect(stats.stats.entryCount).toBeGreaterThan(0);

      clearContentCache();

      stats = getContentCacheStats();
      expect(stats.stats.entryCount).toBe(0);
    });

    it('should invalidate specific content type caches', async () => {
      // Populate different types of content
      await fetchStory('story1', 'fr');
      await fetchStory('story2', 'en');
      await fetchBlogPost('blog1', 'fr');

      let stats = getContentCacheStats();
      expect(stats.stats.entryCount).toBe(3);

      // Invalidate only French stories
      invalidateContentCache.stories('fr');

      // Should have removed French story entries
      stats = getContentCacheStats();
      expect(stats.stats.entryCount).toBeLessThan(3);
    });

    it('should invalidate all stories when no language specified', async () => {
      await fetchStory('story1', 'fr');
      await fetchStory('story2', 'en');
      await fetchBlogPost('blog1', 'fr');

      invalidateContentCache.stories();

      const stats = getContentCacheStats();
      expect(stats.stats.entryCount).toBeLessThan(3); // Stories should be removed
    });

    it('should provide cache statistics', async () => {
      await fetchStory('test-story');
      await fetchStory('test-story'); // Cache hit
      await fetchStory('missing-story').catch(() => {}); // Cache miss

      const stats = getContentCacheStats();

      expect(stats.stats.hits).toBeGreaterThan(0);
      expect(stats.stats.misses).toBeGreaterThan(0);
      expect(stats.hitRatio).toBeGreaterThan(0);
      expect(stats.stats.entryCount).toBeGreaterThan(0);
    });
  });

  describe('Environment-based Content Source', () => {
    it('should use filesystem source in development', async () => {
      mockGetPrivateEnvVars.mockReturnValueOnce({
        env: 'development',
        githubAccessToken: 'test-token',
        githubRepoAPIUrl: 'https://api.github.com/repos/test/repo/contents',
        readContentFrom: 'locale',
        localeRepoAPIUrl: '/local/repo',
      });

      const { fetchMarkdownFilesFs } = await import(
        './fs/fetchMarkdownFiles.server'
      );
      vi.mocked(fetchMarkdownFilesFs).mockResolvedValueOnce([
        200,
        'success',
        [mockStoryData],
      ]);

      await fetchStories();

      expect(fetchMarkdownFilesFs).toHaveBeenCalledWith(
        `/local/repo/stories/${DEFAULT_LANGUAGE}`,
        expect.any(Function),
      );
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle network failures gracefully', async () => {
      mockFetchMarkdownFiles.mockRejectedValueOnce(
        new Error('Network timeout'),
      );

      await expect(fetchStories()).rejects.toThrow();
    });

    it('should handle malformed responses', async () => {
      mockFetchMarkdownFiles.mockResolvedValueOnce([
        500,
        'internal_error',
        null,
      ]);

      await expect(fetchStories()).rejects.toThrow(ContentFetchError);
    });

    it('should preserve error context in thrown errors', async () => {
      mockFetchMarkdownFile.mockResolvedValueOnce([404, 'not_found', null]);

      try {
        await fetchStory('missing-story', 'en' as any);
      } catch (error) {
        expect(error).toBeInstanceOf(ContentNotFoundError);
        expect((error as ContentNotFoundError).context).toMatchObject({
          path: 'stories/fr', // 'en' normalizes to 'fr'
        });
      }
    });

    it('should handle concurrent requests efficiently', async () => {
      // First call to populate cache
      await fetchStory('test-story');

      // Reset mock call count
      mockFetchMarkdownFile.mockClear();

      // Make multiple concurrent requests for the same content
      const promises = [
        fetchStory('test-story'),
        fetchStory('test-story'),
        fetchStory('test-story'),
      ];

      const results = await Promise.all(promises);

      // All should return the same data
      expect(results[0]).toEqual(results[1]);
      expect(results[1]).toEqual(results[2]);

      // No additional API calls should have been made due to caching
      expect(mockFetchMarkdownFile).toHaveBeenCalledTimes(0);
    });
  });
});