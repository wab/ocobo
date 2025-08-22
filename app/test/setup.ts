/**
 * Vitest test setup file
 * This file runs before all test files and sets up global test environment
 */

import { beforeEach, vi } from 'vitest';

// Mock environment variables for tests
beforeEach(() => {
  // Reset all mocks before each test
  vi.clearAllMocks();

  // Set default environment variables for tests
  process.env.NODE_ENV = 'test';
  process.env.GITHUB_ACCOUNT = 'test-account';
  process.env.GITHUB_REPO = 'test-repo';
  process.env.GITHUB_ACCESS_TOKEN = 'test-token';
});

// Global test utilities
(global as any).mockConsole = () => {
  const originalConsole = { ...console };

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {
      // Mock console.log for testing
    });
    vi.spyOn(console, 'error').mockImplementation(() => {
      // Mock console.error for testing
    });
    vi.spyOn(console, 'warn').mockImplementation(() => {
      // Mock console.warn for testing
    });
    vi.spyOn(console, 'debug').mockImplementation(() => {
      // Mock console.debug for testing
    });
  });

  return originalConsole;
};
