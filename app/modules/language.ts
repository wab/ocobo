/**
 * Language configuration and utilities
 *
 * This module provides centralized language configuration, validation,
 * and path building utilities to support internationalization throughout
 * the content management system.
 */

import type { Language } from '~/localization/resources';
import { languages } from '~/localization/resources';

// Re-export Language type for convenience
export type { Language };

/**
 * Default language for the application
 */
export const DEFAULT_LANGUAGE: Language = 'fr';

/**
 * Supported languages for content
 */
export const SUPPORTED_LANGUAGES = languages;

/**
 * Language configuration interface
 */
export interface LanguageConfig {
  /** The language code */
  code: Language;
  /** Display name for the language */
  name: string;
  /** Whether this is the default language */
  isDefault: boolean;
}

/**
 * Language configurations for all supported languages
 * Note: This dynamically builds configs based on what's actually supported
 */
export const LANGUAGE_CONFIGS: Record<Language, LanguageConfig> = {
  fr: {
    code: 'fr',
    name: 'Français',
    isDefault: true,
  },
  ...(SUPPORTED_LANGUAGES.includes('en' as Language)
    ? {
        en: {
          code: 'en' as Language,
          name: 'English',
          isDefault: false,
        },
      }
    : {}),
} as Record<Language, LanguageConfig>;

/**
 * Validates if a language code is supported
 */
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

/**
 * Gets the language configuration for a given language code
 */
export function getLanguageConfig(lang: Language): LanguageConfig {
  return LANGUAGE_CONFIGS[lang];
}

/**
 * Normalizes a language code, falling back to default if invalid
 */
export function normalizeLanguage(lang?: string | null): Language {
  if (!lang) return DEFAULT_LANGUAGE;
  if (isValidLanguage(lang)) return lang;
  return DEFAULT_LANGUAGE;
}

/**
 * Content path utilities for building language-aware paths
 */
export const ContentPaths = {
  /**
   * Build path for stories directory
   */
  stories: (language: Language = DEFAULT_LANGUAGE): string =>
    `stories/${language}`,

  /**
   * Build path for blog posts directory
   */
  blog: (language: Language = DEFAULT_LANGUAGE): string => `blog/${language}`,

  /**
   * Build path for pages directory (pages are not language-specific)
   */
  pages: (path: string): string => path,

  /**
   * Build GitHub API URL for content path
   */
  githubApiUrl: (baseUrl: string, path: string): string => `${baseUrl}/${path}`,

  /**
   * Build local filesystem path for content
   */
  localPath: (baseDir: string, path: string): string => `${baseDir}/${path}`,
} as const;

/**
 * Language-aware cache key builders
 */
export const LanguageCacheKeys = {
  /**
   * Cache key for all stories in a language
   */
  stories: (language: Language = DEFAULT_LANGUAGE): string =>
    `stories:${language}:all`,

  /**
   * Cache key for a single story in a language
   */
  story: (slug: string, language: Language = DEFAULT_LANGUAGE): string =>
    `story:${language}:${slug}`,

  /**
   * Cache key for all blog posts in a language
   */
  blogPosts: (language: Language = DEFAULT_LANGUAGE): string =>
    `blog:${language}:all`,

  /**
   * Cache key for a single blog post in a language
   */
  blogPost: (slug: string, language: Language = DEFAULT_LANGUAGE): string =>
    `blog:${language}:${slug}`,

  /**
   * Cache key for pages in a directory (pages are not language-specific)
   */
  pages: (path: string): string => `pages:${path.replace(/\//g, ':')}`,

  /**
   * Cache key for a single page
   */
  page: (path: string, slug: string): string =>
    `page:${path.replace(/\//g, ':')}:${slug}`,

  /**
   * Pattern for invalidating all content for a specific language
   */
  languagePattern: (language: Language): string => `*:${language}:*`,

  /**
   * Pattern for invalidating all stories
   */
  storiesPattern: (language?: Language): string =>
    language ? `story*:${language}:*` : 'story*',

  /**
   * Pattern for invalidating all blog posts
   */
  blogPattern: (language?: Language): string =>
    language ? `blog*:${language}:*` : 'blog*',
} as const;
