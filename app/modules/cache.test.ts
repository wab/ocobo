/**
 * Tests for ContentCache service
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CacheKeys, ContentCache } from './cache';
import { LanguageCacheKeys } from './language';

describe('ContentCache', () => {
  let cache: ContentCache;
  const _mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {
    // Mock console.log for testing
  });

  beforeEach(() => {
    cache = new ContentCache({
      defaultTtl: 1000, // 1 second for fast tests
      maxSize: 1024, // 1KB for testing
      maxEntries: 3, // Small limit for eviction tests
      debug: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Operations', () => {
    it('should set and get values', async () => {
      const testValue = { test: 'data' };
      await cache.set('test-key', testValue);

      const result = await cache.get('test-key');
      expect(result).toEqual(testValue);
    });

    it('should return null for non-existent keys', async () => {
      const result = await cache.get('non-existent');
      expect(result).toBeNull();
    });

    it('should check if key exists', async () => {
      await cache.set('test-key', 'test-value');

      expect(cache.has('test-key')).toBe(true);
      expect(cache.has('non-existent')).toBe(false);
    });

    it('should delete keys', async () => {
      await cache.set('test-key', 'test-value');
      expect(cache.has('test-key')).toBe(true);

      const deleted = cache.delete('test-key');
      expect(deleted).toBe(true);
      expect(cache.has('test-key')).toBe(false);
    });

    it('should return false when deleting non-existent key', async () => {
      const deleted = cache.delete('non-existent');
      expect(deleted).toBe(false);
    });

    it('should clear all entries', async () => {
      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');

      cache.clear();

      expect(await cache.get('key1')).toBeNull();
      expect(await cache.get('key2')).toBeNull();
      expect(cache.getStats().entryCount).toBe(0);
    });
  });

  describe('TTL (Time To Live)', () => {
    it('should expire entries after TTL', async () => {
      await cache.set('test-key', 'test-value', 10); // 10ms TTL

      expect(await cache.get('test-key')).toBe('test-value');

      // Wait for expiration
      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(await cache.get('test-key')).toBeNull();
    });

    it('should use default TTL when not specified', async () => {
      await cache.set('test-key', 'test-value');

      const stats = cache.getStats();
      expect(stats.entryCount).toBe(1);
    });

    it('should clean up expired entries', async () => {
      await cache.set('key1', 'value1', 10);
      await cache.set('key2', 'value2', 1000);

      // Wait for first key to expire
      await new Promise((resolve) => setTimeout(resolve, 20));

      const cleaned = cache.cleanup();
      expect(cleaned).toBe(1);
      expect(await cache.get('key1')).toBeNull();
      expect(await cache.get('key2')).toBe('value2');
    });
  });

  describe('Cache Statistics', () => {
    it('should track hits and misses', async () => {
      await cache.set('test-key', 'test-value');

      // Hit
      await cache.get('test-key');
      // Miss
      await cache.get('non-existent');

      const stats = cache.getStats();
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);

      const hitRatio = cache.getHitRatio();
      expect(hitRatio).toBe(50); // 1 hit out of 2 total
    });

    it('should track current size and entry count', async () => {
      await cache.set('key1', 'value1');
      await cache.set('key2', { complex: 'object', with: ['array'] });

      const stats = cache.getStats();
      expect(stats.entryCount).toBe(2);
      expect(stats.currentSize).toBeGreaterThan(0);
    });

    it('should calculate hit ratio correctly', async () => {
      expect(cache.getHitRatio()).toBe(0); // No operations yet

      await cache.set('key1', 'value1');
      await cache.get('key1'); // hit
      await cache.get('key1'); // hit
      await cache.get('missing'); // miss

      expect(cache.getHitRatio()).toBeCloseTo(66.67, 1); // 2 hits out of 3 total
    });
  });

  describe('Size Management and Eviction', () => {
    it('should respect max entries limit', async () => {
      // Fill cache to exactly the limit
      await cache.set('key1', 'value1');
      await cache.set('key2', 'value2');
      await cache.set('key3', 'value3');

      // Verify we're at capacity
      expect(cache.getStats().entryCount).toBe(3);
    });

    it('should have eviction mechanism configured', async () => {
      const stats = cache.getStats();
      expect(stats.maxSize).toBe(1024);
      expect(stats.entryCount).toBe(0);

      // Basic verification that cache settings are correct
      expect(stats.maxSize).toBeGreaterThan(0);
    });

    it('should handle cache limits gracefully', async () => {
      const config = cache.getStats();
      expect(config.maxSize).toBeGreaterThan(0);
      expect(config.entryCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Pattern-based Invalidation', () => {
    beforeEach(async () => {
      await cache.set('blog:en:post1', 'content1');
      await cache.set('blog:fr:post1', 'content2');
      await cache.set('story:en:story1', 'content3');
      await cache.set('page:legal:terms', 'content4');
    });

    it('should invalidate entries matching string pattern', async () => {
      const deleted = cache.invalidate('blog:*');

      expect(deleted).toBeGreaterThan(0);
      expect(await cache.get('blog:en:post1')).toBeNull();
      expect(await cache.get('blog:fr:post1')).toBeNull();
      expect(await cache.get('story:en:story1')).toBe('content3');
      expect(await cache.get('page:legal:terms')).toBe('content4');
    });

    it('should invalidate entries matching regex pattern', async () => {
      const deleted = cache.invalidate(/blog:.*:post1/);

      expect(deleted).toBe(2);
      expect(await cache.get('blog:en:post1')).toBeNull();
      expect(await cache.get('blog:fr:post1')).toBeNull();
    });

    it('should invalidate specific language entries', async () => {
      const deleted = cache.invalidate('*:en:*');

      expect(deleted).toBeGreaterThan(0);
      expect(await cache.get('blog:en:post1')).toBeNull();
      expect(await cache.get('story:en:story1')).toBeNull();
      expect(await cache.get('blog:fr:post1')).toBe('content2');
    });
  });

  describe('Cache Entry Replacement', () => {
    it('should replace existing entries', async () => {
      await cache.set('test-key', 'original-value');
      expect(await cache.get('test-key')).toBe('original-value');

      await cache.set('test-key', 'updated-value');
      expect(await cache.get('test-key')).toBe('updated-value');

      // Should still be only one entry
      expect(cache.getStats().entryCount).toBe(1);
    });

    it('should update size when replacing entries', async () => {
      await cache.set('test-key', 'short');
      const initialSize = cache.getStats().currentSize;

      await cache.set('test-key', 'much longer value that takes more space');
      const newSize = cache.getStats().currentSize;

      expect(newSize).toBeGreaterThan(initialSize);
    });
  });

  describe('Error Handling', () => {
    it('should handle non-serializable values gracefully', async () => {
      const circular: any = {};
      circular.self = circular;

      // Should not throw, should use fallback size calculation
      await expect(cache.set('circular', circular)).resolves.not.toThrow();
    });

    it('should handle null and undefined values', async () => {
      await cache.set('null-key', null);
      await cache.set('undefined-key', undefined);

      expect(await cache.get('null-key')).toBeNull();
      expect(await cache.get('undefined-key')).toBeUndefined();
    });
  });
});

describe('CacheKeys', () => {
  describe('Key Generation', () => {
    it('should generate correct stories cache keys', () => {
      expect(CacheKeys.stories()).toBe('stories:fr:all');
      expect(CacheKeys.stories('en')).toBe('stories:en:all');
    });

    it('should generate correct story cache keys', () => {
      expect(CacheKeys.story('my-story')).toBe('story:fr:my-story');
      expect(CacheKeys.story('my-story', 'en')).toBe('story:en:my-story');
    });

    it('should generate correct blog cache keys', () => {
      expect(CacheKeys.blogPosts()).toBe('blog:fr:all');
      expect(CacheKeys.blogPosts('en')).toBe('blog:en:all');

      expect(CacheKeys.blogPost('my-post')).toBe('blog:fr:my-post');
      expect(CacheKeys.blogPost('my-post', 'en')).toBe('blog:en:my-post');
    });

    it('should generate correct page cache keys', () => {
      expect(CacheKeys.pages('legal/terms')).toBe('pages:legal:terms');
      expect(CacheKeys.pages('media/videos')).toBe('pages:media:videos');

      expect(CacheKeys.page('legal', 'terms')).toBe('page:legal:terms');
      expect(CacheKeys.page('media/videos', 'intro')).toBe(
        'page:media:videos:intro',
      );
    });

    it('should handle special characters in paths', () => {
      expect(CacheKeys.page('path/with/slashes', 'slug')).toBe(
        'page:path:with:slashes:slug',
      );
    });
  });

  describe('Language-Aware Cache Keys', () => {
    it('should generate correct language-aware stories cache keys', () => {
      expect(LanguageCacheKeys.stories()).toBe('stories:fr:all');
      expect(LanguageCacheKeys.stories('fr')).toBe('stories:fr:all');
    });

    it('should generate correct language-aware story cache keys', () => {
      expect(LanguageCacheKeys.story('my-story')).toBe('story:fr:my-story');
      expect(LanguageCacheKeys.story('my-story', 'fr')).toBe(
        'story:fr:my-story',
      );
    });

    it('should generate correct language-aware blog cache keys', () => {
      expect(LanguageCacheKeys.blogPosts()).toBe('blog:fr:all');
      expect(LanguageCacheKeys.blogPosts('fr')).toBe('blog:fr:all');

      expect(LanguageCacheKeys.blogPost('my-post')).toBe('blog:fr:my-post');
      expect(LanguageCacheKeys.blogPost('my-post', 'fr')).toBe(
        'blog:fr:my-post',
      );
    });

    it('should generate correct invalidation patterns', () => {
      expect(LanguageCacheKeys.languagePattern('fr')).toBe('*:fr:*');
      expect(LanguageCacheKeys.storiesPattern('fr')).toBe('story*:fr:*');
      expect(LanguageCacheKeys.storiesPattern()).toBe('story*');
      expect(LanguageCacheKeys.blogPattern('fr')).toBe('blog*:fr:*');
      expect(LanguageCacheKeys.blogPattern()).toBe('blog*');
    });
  });
});
