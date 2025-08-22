/**
 * Custom error types for content management
 *
 * This module defines specific error types for better error handling
 * and debugging throughout the content management system.
 */

/**
 * Base error class for all content-related errors
 */
export abstract class ContentError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Convert error to a serializable object for logging/API responses
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      status: this.status,
      context: this.context,
    };
  }
}

/**
 * Error thrown when content cannot be fetched from source
 */
export class ContentFetchError extends ContentError {
  constructor(
    message: string,
    public readonly source: 'github' | 'filesystem',
    public readonly path: string,
    status = 500,
    context?: Record<string, unknown>,
  ) {
    super(message, 'CONTENT_FETCH_ERROR', status, {
      ...context,
      source,
      path,
    });
  }
}

/**
 * Error thrown when content is not found
 */
export class ContentNotFoundError extends ContentError {
  constructor(
    public readonly contentType: string,
    public readonly identifier: string,
    context?: Record<string, unknown>,
  ) {
    super(`${contentType} not found: ${identifier}`, 'CONTENT_NOT_FOUND', 404, {
      ...context,
      contentType,
      identifier,
    });
  }
}

/**
 * Error thrown when frontmatter validation fails
 */
export class FrontmatterValidationError extends ContentError {
  constructor(
    public readonly contentPath: string,
    public readonly validationErrors: string[],
    context?: Record<string, unknown>,
  ) {
    super(
      `Invalid frontmatter in ${contentPath}: ${validationErrors.join(', ')}`,
      'FRONTMATTER_VALIDATION_ERROR',
      422,
      {
        ...context,
        contentPath,
        validationErrors,
      },
    );
  }
}

/**
 * Error thrown when content validation fails (Zod-powered)
 */
export class ContentValidationError extends ContentError {
  constructor(
    message: string,
    public readonly contentType: string,
    public readonly validationIssues: string[],
    context?: Record<string, unknown>,
  ) {
    const detailedMessage = `${message}. Issues: ${validationIssues.join('; ')}`;
    super(detailedMessage, 'CONTENT_VALIDATION_ERROR', 422, {
      ...context,
      contentType,
      validationIssues,
    });
  }
}

/**
 * Error thrown when environment configuration is invalid
 */
export class ConfigurationError extends ContentError {
  constructor(
    message: string,
    public readonly configKey?: string,
    context?: Record<string, unknown>,
  ) {
    super(message, 'CONFIGURATION_ERROR', 500, {
      ...context,
      configKey,
    });
  }
}

/**
 * Error thrown when GitHub API requests fail
 */
export class GitHubAPIError extends ContentError {
  constructor(
    message: string,
    public readonly githubStatus: number,
    public readonly githubResponse?: string,
    context?: Record<string, unknown>,
  ) {
    super(message, 'GITHUB_API_ERROR', githubStatus, {
      ...context,
      githubStatus,
      githubResponse,
    });
  }
}

/**
 * Error thrown when filesystem operations fail
 */
export class FileSystemError extends ContentError {
  constructor(
    message: string,
    public readonly operation: 'read' | 'write' | 'list',
    public readonly filePath: string,
    context?: Record<string, unknown>,
  ) {
    super(message, 'FILESYSTEM_ERROR', 500, {
      ...context,
      operation,
      filePath,
    });
  }
}

/**
 * Type guard to check if an error is a ContentError
 */
export function isContentError(error: unknown): error is ContentError {
  return error instanceof ContentError;
}

/**
 * Utility to convert any error to a ContentError
 */
export function toContentError(
  error: unknown,
  defaultMessage = 'An unexpected error occurred',
  context?: Record<string, unknown>,
): ContentError {
  if (isContentError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new ConfigurationError(error.message || defaultMessage, undefined, {
      ...context,
      originalError: error.name,
      stack: error.stack,
    });
  }

  return new ConfigurationError(defaultMessage, undefined, {
    ...context,
    originalError: String(error),
  });
}
