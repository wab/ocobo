/**
 * Tests for language configuration and utilities
 */
import { describe, expect, it } from 'vitest';
import {
  ContentPaths,
  DEFAULT_LANGUAGE,
  LANGUAGE_CONFIGS,
  LanguageCacheKeys,
  SUPPORTED_LANGUAGES,
  getLanguageConfig,
  isValidLanguage,
  normalizeLanguage,
} from './language';

describe('Language Configuration', () => {
  describe('Constants', () => {
    it('should have correct default language', () => {
      expect(DEFAULT_LANGUAGE).toBe('fr');
    });

    it('should have supported languages', () => {
      expect(SUPPORTED_LANGUAGES).toContain('fr');
      expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(0);
      // Note: 'en' may or may not be supported depending on configuration
    });

    it('should have language configurations', () => {
      expect(LANGUAGE_CONFIGS.fr).toEqual({
        code: 'fr',
        name: 'Français',
        isDefault: true,
      });
      // English is not currently in SUPPORTED_LANGUAGES, so skip this test
      // if (SUPPORTED_LANGUAGES.includes('en' as any)) {
      //   expect(LANGUAGE_CONFIGS.en).toEqual({
      //     code: 'en',
      //     name: 'English',
      //     isDefault: false,
      //   });
      // }
    });
  });

  describe('isValidLanguage', () => {
    it('should validate supported languages', () => {
      expect(isValidLanguage('fr')).toBe(true);
      // Only test 'en' if it's actually supported
      if (SUPPORTED_LANGUAGES.includes('en' as any)) {
        expect(isValidLanguage('en')).toBe(true);
      } else {
        expect(isValidLanguage('en')).toBe(false);
      }
    });

    it('should reject unsupported languages', () => {
      expect(isValidLanguage('es')).toBe(false);
      expect(isValidLanguage('de')).toBe(false);
      expect(isValidLanguage('')).toBe(false);
      expect(isValidLanguage('invalid')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidLanguage('FR')).toBe(false); // Case sensitive
      expect(isValidLanguage('fr-FR')).toBe(false); // Locale codes not supported
    });
  });

  describe('getLanguageConfig', () => {
    it('should return correct config for supported languages', () => {
      const frConfig = getLanguageConfig('fr');
      expect(frConfig.code).toBe('fr');
      expect(frConfig.name).toBe('Français');
      expect(frConfig.isDefault).toBe(true);

      // Only test English config if it's supported
      if (SUPPORTED_LANGUAGES.includes('en' as any)) {
        const enConfig = getLanguageConfig('en' as any);
        expect(enConfig.code).toBe('en');
        expect(enConfig.name).toBe('English');
        expect(enConfig.isDefault).toBe(false);
      }
    });
  });

  describe('normalizeLanguage', () => {
    it('should return default language for null/undefined', () => {
      expect(normalizeLanguage(null)).toBe(DEFAULT_LANGUAGE);
      expect(normalizeLanguage(undefined)).toBe(DEFAULT_LANGUAGE);
    });

    it('should return valid languages unchanged', () => {
      expect(normalizeLanguage('fr')).toBe('fr');
      // Only test 'en' if it's actually supported
      if (SUPPORTED_LANGUAGES.includes('en' as any)) {
        expect(normalizeLanguage('en')).toBe('en');
      } else {
        expect(normalizeLanguage('en')).toBe(DEFAULT_LANGUAGE);
      }
    });

    it('should fall back to default for invalid languages', () => {
      expect(normalizeLanguage('es')).toBe(DEFAULT_LANGUAGE);
      expect(normalizeLanguage('invalid')).toBe(DEFAULT_LANGUAGE);
      expect(normalizeLanguage('')).toBe(DEFAULT_LANGUAGE);
      // If 'en' is not supported, it should fall back to default
      if (!SUPPORTED_LANGUAGES.includes('en' as any)) {
        expect(normalizeLanguage('en')).toBe(DEFAULT_LANGUAGE);
      }
    });
  });
});

describe('ContentPaths', () => {
  describe('stories', () => {
    it('should generate correct stories paths', () => {
      expect(ContentPaths.stories()).toBe('stories/fr');
      expect(ContentPaths.stories('fr')).toBe('stories/fr');
      // Test with any valid language parameter
      expect(ContentPaths.stories('en' as any)).toBe('stories/en');
    });
  });

  describe('blog', () => {
    it('should generate correct blog paths', () => {
      expect(ContentPaths.blog()).toBe('blog/fr');
      expect(ContentPaths.blog('fr')).toBe('blog/fr');
      // Test with any valid language parameter
      expect(ContentPaths.blog('en' as any)).toBe('blog/en');
    });
  });

  describe('pages', () => {
    it('should return pages path unchanged', () => {
      expect(ContentPaths.pages('legal')).toBe('legal');
      expect(ContentPaths.pages('media/videos')).toBe('media/videos');
    });
  });

  describe('githubApiUrl', () => {
    it('should construct GitHub API URLs correctly', () => {
      const baseUrl = 'https://api.github.com/repos/user/repo/contents';
      const path = 'stories/fr';

      expect(ContentPaths.githubApiUrl(baseUrl, path)).toBe(
        'https://api.github.com/repos/user/repo/contents/stories/fr',
      );
    });
  });

  describe('localPath', () => {
    it('should construct local paths correctly', () => {
      const baseDir = '/home/user/projects/repo';
      const path = 'stories/fr';

      expect(ContentPaths.localPath(baseDir, path)).toBe(
        '/home/user/projects/repo/stories/fr',
      );
    });
  });
});

describe('LanguageCacheKeys', () => {
  describe('Content Keys', () => {
    it('should generate stories cache keys', () => {
      expect(LanguageCacheKeys.stories()).toBe('stories:fr:all');
      expect(LanguageCacheKeys.stories('en' as any)).toBe('stories:en:all');
    });

    it('should generate story cache keys', () => {
      expect(LanguageCacheKeys.story('my-story')).toBe('story:fr:my-story');
      expect(LanguageCacheKeys.story('my-story', 'en' as any)).toBe(
        'story:en:my-story',
      );
    });

    it('should generate blog posts cache keys', () => {
      expect(LanguageCacheKeys.blogPosts()).toBe('blog:fr:all');
      expect(LanguageCacheKeys.blogPosts('en' as any)).toBe('blog:en:all');
    });

    it('should generate blog post cache keys', () => {
      expect(LanguageCacheKeys.blogPost('my-post')).toBe('blog:fr:my-post');
      expect(LanguageCacheKeys.blogPost('my-post', 'en' as any)).toBe(
        'blog:en:my-post',
      );
    });

    it('should generate page cache keys', () => {
      expect(LanguageCacheKeys.pages('legal')).toBe('pages:legal');
      expect(LanguageCacheKeys.pages('media/videos')).toBe(
        'pages:media:videos',
      );

      expect(LanguageCacheKeys.page('legal', 'terms')).toBe('page:legal:terms');
      expect(LanguageCacheKeys.page('media/videos', 'intro')).toBe(
        'page:media:videos:intro',
      );
    });
  });

  describe('Invalidation Patterns', () => {
    it('should generate language invalidation patterns', () => {
      expect(LanguageCacheKeys.languagePattern('fr')).toBe('*:fr:*');
      expect(LanguageCacheKeys.languagePattern('en' as any)).toBe('*:en:*');
    });

    it('should generate stories invalidation patterns', () => {
      expect(LanguageCacheKeys.storiesPattern()).toBe('story*');
      expect(LanguageCacheKeys.storiesPattern('fr')).toBe('story*:fr:*');
      expect(LanguageCacheKeys.storiesPattern('en' as any)).toBe('story*:en:*');
    });

    it('should generate blog invalidation patterns', () => {
      expect(LanguageCacheKeys.blogPattern()).toBe('blog*');
      expect(LanguageCacheKeys.blogPattern('fr')).toBe('blog*:fr:*');
      expect(LanguageCacheKeys.blogPattern('en' as any)).toBe('blog*:en:*');
    });
  });

  describe('Path Normalization', () => {
    it('should handle special characters in paths', () => {
      expect(LanguageCacheKeys.pages('path/with/slashes')).toBe(
        'pages:path:with:slashes',
      );
      expect(LanguageCacheKeys.page('path/with/slashes', 'slug')).toBe(
        'page:path:with:slashes:slug',
      );
    });
  });
});

describe('Integration Tests', () => {
  it('should work together for content path and cache key generation', () => {
    const language = 'fr'; // Use a supported language
    const slug = 'test-story';

    // Generate content path
    const contentPath = ContentPaths.stories(language);
    expect(contentPath).toBe('stories/fr');

    // Generate corresponding cache key
    const cacheKey = LanguageCacheKeys.story(slug, language);
    expect(cacheKey).toBe('story:fr:test-story');

    // Both should be consistent
    expect(contentPath).toContain(language);
    expect(cacheKey).toContain(language);
    expect(cacheKey).toContain(slug);
  });

  it('should provide consistent normalization', () => {
    const invalidLang = 'invalid';
    const normalizedLang = normalizeLanguage(invalidLang);

    // Content path should use normalized language
    const contentPath = ContentPaths.stories(normalizedLang);
    expect(contentPath).toBe('stories/fr');

    // Cache key should also use normalized language
    const cacheKey = LanguageCacheKeys.stories(normalizedLang);
    expect(cacheKey).toBe('stories:fr:all');
  });
});
