/**
 * Tests for custom error types and error handling utilities
 */
import { describe, it, expect } from 'vitest';
import {
  ContentError,
  ContentFetchError,
  ContentNotFoundError,
  FrontmatterValidationError,
  ConfigurationError,
  GitHubAPIError,
  FileSystemError,
  isContentError,
  toContentError,
} from './errors';

describe('ContentError (Base Class)', () => {
  class TestContentError extends ContentError {
    constructor(message: string, status = 500) {
      super(message, 'TEST_ERROR', status);
    }
  }

  it('should create error with correct properties', () => {
    const error = new TestContentError('Test message', 400);

    expect(error.message).toBe('Test message');
    expect(error.code).toBe('TEST_ERROR');
    expect(error.status).toBe(400);
    expect(error.name).toBe('TestContentError');
  });

  it('should support context object', () => {
    const context = { userId: 123, path: '/test' };
    const error = new TestContentError('Test message');
    error.context = context;

    expect(error.context).toEqual(context);
  });

  it('should be serializable to JSON', () => {
    const context = { userId: 123 };
    const error = new TestContentError('Test message', 404);
    error.context = context;

    const json = error.toJSON();

    expect(json).toEqual({
      name: 'TestContentError',
      message: 'Test message',
      code: 'TEST_ERROR',
      status: 404,
      context,
    });
  });

  it('should maintain proper prototype chain', () => {
    const error = new TestContentError('Test message');

    expect(error instanceof ContentError).toBe(true);
    expect(error instanceof TestContentError).toBe(true);
    expect(error instanceof Error).toBe(true);
  });
});

describe('ContentFetchError', () => {
  it('should create GitHub fetch error', () => {
    const error = new ContentFetchError(
      'Failed to fetch from GitHub',
      'github',
      'stories/fr',
      404
    );

    expect(error.message).toBe('Failed to fetch from GitHub');
    expect(error.code).toBe('CONTENT_FETCH_ERROR');
    expect(error.status).toBe(404);
    expect(error.source).toBe('github');
    expect(error.path).toBe('stories/fr');
  });

  it('should create filesystem fetch error with default status', () => {
    const context = { originalError: 'ENOENT' };
    const error = new ContentFetchError(
      'File not found',
      'filesystem',
      '/path/to/file',
      undefined,
      context
    );

    expect(error.status).toBe(500); // default
    expect(error.context).toMatchObject({
      source: 'filesystem',
      path: '/path/to/file',
      originalError: 'ENOENT',
    });
  });
});

describe('ContentNotFoundError', () => {
  it('should create not found error with correct message', () => {
    const error = new ContentNotFoundError('story', 'my-story-slug');

    expect(error.message).toBe('story not found: my-story-slug');
    expect(error.code).toBe('CONTENT_NOT_FOUND');
    expect(error.status).toBe(404);
    expect(error.contentType).toBe('story');
    expect(error.identifier).toBe('my-story-slug');
  });

  it('should include context in error details', () => {
    const context = { language: 'fr', path: 'stories/fr' };
    const error = new ContentNotFoundError('blog post', 'missing-post', context);

    expect(error.context).toMatchObject({
      contentType: 'blog post',
      identifier: 'missing-post',
      language: 'fr',
      path: 'stories/fr',
    });
  });
});

describe('FrontmatterValidationError', () => {
  it('should create validation error with multiple issues', () => {
    const validationErrors = [
      'Missing required field: title',
      'Invalid date format',
      'Tags must be an array',
    ];
    const error = new FrontmatterValidationError(
      '/path/to/content.md',
      validationErrors
    );

    expect(error.message).toBe(
      'Invalid frontmatter in /path/to/content.md: Missing required field: title, Invalid date format, Tags must be an array'
    );
    expect(error.code).toBe('FRONTMATTER_VALIDATION_ERROR');
    expect(error.status).toBe(422);
    expect(error.contentPath).toBe('/path/to/content.md');
    expect(error.validationErrors).toEqual(validationErrors);
  });

  it('should include original error in context', () => {
    const originalError = new Error('Parsing failed');
    const context = { originalError, slug: 'test-content' };
    const error = new FrontmatterValidationError(
      'content.md',
      ['Invalid YAML'],
      context
    );

    expect(error.context).toMatchObject({
      contentPath: 'content.md',
      validationErrors: ['Invalid YAML'],
      originalError,
      slug: 'test-content',
    });
  });
});

describe('ConfigurationError', () => {
  it('should create configuration error with config key', () => {
    const error = new ConfigurationError(
      'Missing required environment variable',
      'GITHUB_ACCESS_TOKEN'
    );

    expect(error.message).toBe('Missing required environment variable');
    expect(error.code).toBe('CONFIGURATION_ERROR');
    expect(error.status).toBe(500);
    expect(error.configKey).toBe('GITHUB_ACCESS_TOKEN');
  });

  it('should create configuration error without config key', () => {
    const error = new ConfigurationError('Invalid configuration format');

    expect(error.configKey).toBeUndefined();
    expect(error.context).toMatchObject({
      configKey: undefined,
    });
  });
});

describe('GitHubAPIError', () => {
  it('should create GitHub API error with response details', () => {
    const error = new GitHubAPIError(
      'API rate limit exceeded',
      429,
      'Rate limit exceeded',
      { retryAfter: 3600 }
    );

    expect(error.message).toBe('API rate limit exceeded');
    expect(error.code).toBe('GITHUB_API_ERROR');
    expect(error.status).toBe(429);
    expect(error.githubStatus).toBe(429);
    expect(error.githubResponse).toBe('Rate limit exceeded');
    expect(error.context).toMatchObject({
      githubStatus: 429,
      githubResponse: 'Rate limit exceeded',
      retryAfter: 3600,
    });
  });

  it('should handle GitHub API error without response', () => {
    const error = new GitHubAPIError('Network timeout', 408);

    expect(error.githubResponse).toBeUndefined();
  });
});

describe('FileSystemError', () => {
  it('should create filesystem error with operation details', () => {
    const context = { permissions: '644', owner: 'user' };
    const error = new FileSystemError(
      'Permission denied',
      'read',
      '/path/to/file.md',
      context
    );

    expect(error.message).toBe('Permission denied');
    expect(error.code).toBe('FILESYSTEM_ERROR');
    expect(error.status).toBe(500);
    expect(error.operation).toBe('read');
    expect(error.filePath).toBe('/path/to/file.md');
    expect(error.context).toMatchObject({
      operation: 'read',
      filePath: '/path/to/file.md',
      permissions: '644',
      owner: 'user',
    });
  });

  it('should support different operations', () => {
    const readError = new FileSystemError('Read failed', 'read', '/file');
    const writeError = new FileSystemError('Write failed', 'write', '/file');
    const listError = new FileSystemError('List failed', 'list', '/dir');

    expect(readError.operation).toBe('read');
    expect(writeError.operation).toBe('write');
    expect(listError.operation).toBe('list');
  });
});

describe('isContentError', () => {
  it('should return true for ContentError instances', () => {
    expect(isContentError(new ContentFetchError('test', 'github', 'path'))).toBe(true);
    expect(isContentError(new ContentNotFoundError('type', 'id'))).toBe(true);
    expect(isContentError(new ConfigurationError('test'))).toBe(true);
  });

  it('should return false for non-ContentError instances', () => {
    expect(isContentError(new Error('regular error'))).toBe(false);
    expect(isContentError(new TypeError('type error'))).toBe(false);
    expect(isContentError('string error')).toBe(false);
    expect(isContentError(null)).toBe(false);
    expect(isContentError(undefined)).toBe(false);
    expect(isContentError({ message: 'object' })).toBe(false);
  });
});

describe('toContentError', () => {
  it('should return ContentError as-is', () => {
    const originalError = new ContentFetchError('test', 'github', 'path');
    const result = toContentError(originalError);

    expect(result).toBe(originalError);
  });

  it('should convert Error to ConfigurationError', () => {
    const originalError = new Error('Original message');
    const context = { userId: 123 };
    const result = toContentError(originalError, 'Default message', context);

    expect(result).toBeInstanceOf(ConfigurationError);
    expect(result.message).toBe('Original message');
    expect(result.code).toBe('CONFIGURATION_ERROR');
    expect(result.context).toMatchObject({
      userId: 123,
      originalError: 'Error',
      stack: expect.any(String),
    });
  });

  it('should use default message for Error without message', () => {
    const originalError = new Error('');
    const result = toContentError(originalError, 'Default message');

    expect(result.message).toBe('Default message');
  });

  it('should convert non-Error values to ConfigurationError', () => {
    const result = toContentError('string error', 'Default message', { test: true });

    expect(result).toBeInstanceOf(ConfigurationError);
    expect(result.message).toBe('Default message');
    expect(result.context).toMatchObject({
      test: true,
      originalError: 'string error',
    });
  });

  it('should handle null and undefined', () => {
    const nullResult = toContentError(null);
    const undefinedResult = toContentError(undefined);

    expect(nullResult).toBeInstanceOf(ConfigurationError);
    expect(undefinedResult).toBeInstanceOf(ConfigurationError);
    
    expect(nullResult.context?.originalError).toBe('null');
    expect(undefinedResult.context?.originalError).toBe('undefined');
  });

  it('should handle objects without message', () => {
    const objectError = { code: 'CUSTOM_ERROR', details: 'Something went wrong' };
    const result = toContentError(objectError, 'Default message');

    expect(result.message).toBe('Default message');
    expect(result.context?.originalError).toBe('[object Object]');
  });

  it('should preserve stack trace from original Error', () => {
    const originalError = new Error('Original message');
    const result = toContentError(originalError);

    expect(result.context?.stack).toBe(originalError.stack);
  });
});