/**
 * Content caching service
 *
 * This module provides intelligent caching for content with TTL support,
 * size limits, and pattern-based invalidation. Designed to replace
 * simple in-memory caches with a more robust solution.
 */

/**
 * Cache entry with metadata
 */
interface CacheEntry<T = unknown> {
  value: T;
  timestamp: number;
  ttl: number;
  size: number;
}

/**
 * Cache statistics for monitoring
 */
export interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  currentSize: number;
  maxSize: number;
  entryCount: number;
}

/**
 * Cache configuration options
 */
export interface CacheConfig {
  /** Default TTL in milliseconds */
  defaultTtl: number;
  /** Maximum cache size in bytes */
  maxSize: number;
  /** Maximum number of entries */
  maxEntries: number;
  /** Enable debug logging */
  debug: boolean;
}

/**
 * Intelligent content cache with TTL, size limits, and eviction policies
 */
export class ContentCache {
  private cache = new Map<string, CacheEntry>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    currentSize: 0,
    maxSize: 0,
    entryCount: 0,
  };

  private readonly config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      defaultTtl: 2 * 60 * 60 * 1000, // 2 hours default
      maxSize: 50 * 1024 * 1024, // 50MB default
      maxEntries: 1000, // 1000 entries default
      debug: false,
      ...config,
    };

    this.stats.maxSize = this.config.maxSize;
  }

  /**
   * Get a value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      this.log(`Cache miss: ${key}`);
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.currentSize -= entry.size;
      this.stats.entryCount--;
      this.stats.misses++;
      this.log(`Cache expired: ${key}`);
      return null;
    }

    this.stats.hits++;
    this.log(`Cache hit: ${key}`);
    return entry.value as T;
  }

  /**
   * Set a value in cache
   */
  async set<T>(
    key: string,
    value: T,
    ttl: number = this.config.defaultTtl,
  ): Promise<void> {
    const size = this.calculateSize(value);

    // Remove existing entry if it exists
    const existingEntry = this.cache.get(key);
    if (existingEntry) {
      this.stats.currentSize -= existingEntry.size;
      this.stats.entryCount--;
    }

    // Check if we need to evict entries
    await this.evictIfNeeded(size);

    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl,
      size,
    };

    this.cache.set(key, entry);
    this.stats.currentSize += size;
    this.stats.entryCount++;

    this.log(`Cache set: ${key} (${size} bytes, TTL: ${ttl}ms)`);
  }

  /**
   * Check if a key exists in cache and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.currentSize -= entry.size;
      this.stats.entryCount--;
      return false;
    }

    return true;
  }

  /**
   * Delete a specific key
   */
  delete(key: string): boolean {
    const entry = this.cache.get(key);
    if (entry) {
      this.cache.delete(key);
      this.stats.currentSize -= entry.size;
      this.stats.entryCount--;
      this.log(`Cache delete: ${key}`);
      return true;
    }
    return false;
  }

  /**
   * Invalidate cache entries matching a pattern
   */
  invalidate(pattern: string | RegExp): number {
    const regex =
      typeof pattern === 'string'
        ? new RegExp(pattern.replace(/\*/g, '.*'))
        : pattern;

    let deletedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        this.stats.currentSize -= entry.size;
        this.stats.entryCount--;
        deletedCount++;
      }
    }

    this.log(
      `Cache invalidated ${deletedCount} entries matching pattern: ${pattern}`,
    );
    return deletedCount;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    this.stats.currentSize = 0;
    this.stats.entryCount = 0;
    this.log('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Get cache hit ratio as percentage
   */
  getHitRatio(): number {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : (this.stats.hits / total) * 100;
  }

  /**
   * Clean up expired entries
   */
  cleanup(): number {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        this.stats.currentSize -= entry.size;
        this.stats.entryCount--;
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      this.log(`Cleaned up ${cleanedCount} expired entries`);
    }

    return cleanedCount;
  }

  /**
   * Evict entries if cache size/count limits are exceeded
   */
  private async evictIfNeeded(newEntrySize: number): Promise<void> {
    // Check limits - evict when we would exceed limits with new entry
    while (
      this.stats.currentSize + newEntrySize > this.config.maxSize ||
      this.cache.size >= this.config.maxEntries
    ) {
      const oldestKey = this.findOldestEntry();
      if (!oldestKey) break;

      const entry = this.cache.get(oldestKey)!;
      this.cache.delete(oldestKey);
      this.stats.currentSize -= entry.size;
      this.stats.entryCount--;
      this.stats.evictions++;

      this.log(`Evicted cache entry: ${oldestKey}`);
    }
  }

  /**
   * Find the oldest cache entry for eviction
   */
  private findOldestEntry(): string | null {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  /**
   * Calculate approximate size of a value in bytes
   */
  private calculateSize(value: unknown): number {
    if (value === null || value === undefined) return 0;

    try {
      // Rough estimate based on JSON serialization
      const jsonString = JSON.stringify(value);
      return jsonString.length * 2; // UTF-16 characters are 2 bytes each
    } catch {
      // Fallback for non-serializable objects
      return 1024; // 1KB estimate
    }
  }

  /**
   * Debug logging
   */
  private log(message: string): void {
    if (this.config.debug) {
      console.log(`[ContentCache] ${message}`);
    }
  }
}

/**
 * Global content cache instance
 * Configured with reasonable defaults for the application
 */
export const contentCache = new ContentCache({
  defaultTtl: 2 * 60 * 60 * 1000, // 2 hours
  maxSize: 50 * 1024 * 1024, // 50MB
  maxEntries: 1000,
  debug: process.env.NODE_ENV === 'development',
});

/**
 * Cache key builders for different content types
 */
export const CacheKeys = {
  /**
   * Cache key for all stories
   */
  stories: (language = 'fr') => `stories:${language}:all`,

  /**
   * Cache key for a single story
   */
  story: (slug: string, language = 'fr') => `story:${language}:${slug}`,

  /**
   * Cache key for all blog posts
   */
  blogPosts: (language = 'fr') => `blog:${language}:all`,

  /**
   * Cache key for a single blog post
   */
  blogPost: (slug: string, language = 'fr') => `blog:${language}:${slug}`,

  /**
   * Cache key for pages in a directory
   */
  pages: (path: string) => `pages:${path.replace(/\//g, ':')}`,

  /**
   * Cache key for a single page
   */
  page: (path: string, slug: string) =>
    `page:${path.replace(/\//g, ':')}:${slug}`,
} as const;
