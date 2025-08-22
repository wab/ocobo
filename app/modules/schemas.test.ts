/**
 * Tests for Zod schemas and validation utilities
 */
import { describe, expect, it, vi } from 'vitest';
import {
  type BlogpostFrontmatter,
  BlogpostFrontmatterSchema,
  type PageFrontmatter,
  PageFrontmatterSchema,
  type StoryFrontmatter,
  StoryFrontmatterSchema,
  Validators,
  isValidBlogpostFrontmatter,
  isValidPageFrontmatter,
  isValidStoryFrontmatter,
  validateWithSchema,
} from './schemas';

describe('Zod Schemas Validation', () => {
  describe('StoryFrontmatterSchema', () => {
    const validStoryData: StoryFrontmatter = {
      name: 'Test Client',
      date: '2024-01-15',
      title: 'Amazing Project Success',
      subtitle: 'How we transformed their business',
      description: 'A comprehensive case study of digital transformation',
      speaker: 'John Doe',
      role: 'CEO',
      duration: '3 months',
      scopes: ['Digital Transformation', 'Process Automation'],
      tags: ['enterprise', 'automation'],
      tools: ['React', 'Node.js', 'AWS'],
      quotes: ['This changed everything for us'],
      deliverables: ['Web Application', 'Mobile App'],
      youtubeId: 'dQw4w9WgXcQ',
    };

    it('should validate correct story frontmatter', () => {
      const result = StoryFrontmatterSchema.safeParse(validStoryData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validStoryData);
      }
    });

    it('should reject story with missing required fields', () => {
      const invalidData = { ...validStoryData };
      delete (invalidData as any).title;

      const result = StoryFrontmatterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(['title']);
      }
    });

    it('should reject story with empty strings', () => {
      const invalidData = { ...validStoryData, name: '' };

      const result = StoryFrontmatterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('cannot be empty');
      }
    });

    it('should reject invalid YouTube ID', () => {
      const invalidData = { ...validStoryData, youtubeId: 'invalid' };

      const result = StoryFrontmatterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          'Must be a valid YouTube video ID',
        );
      }
    });

    it('should accept valid YouTube ID', () => {
      const validIds = ['dQw4w9WgXcQ', 'J---aiyznGQ', '9bZkp7q19f0'];

      for (const youtubeId of validIds) {
        const data = { ...validStoryData, youtubeId };
        const result = StoryFrontmatterSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    });

    it('should allow extra unknown fields (non-strict mode)', () => {
      const dataWithExtraField = { ...validStoryData, extraField: 'allowed' };

      const result = StoryFrontmatterSchema.safeParse(dataWithExtraField);
      expect(result.success).toBe(true);
      if (result.success) {
        // Extra fields should be ignored but not cause validation to fail
        expect(result.data.name).toBe(validStoryData.name);
        expect(result.data.title).toBe(validStoryData.title);
      }
    });

    it('should log warnings for unknown fields when using validateWithSchema', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const dataWithExtraFields = { 
        ...validStoryData, 
        extraField: 'allowed',
        Outils: 'Salesforce, Qobra'
      };

      const result = validateWithSchema(StoryFrontmatterSchema, dataWithExtraFields, 'TestStory');
      expect(result.success).toBe(true);
      
      // Should have logged a warning about unknown fields
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[TestStory] Unknown fields detected (consider cleanup):')
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('extraField, Outils')
      );

      consoleWarnSpy.mockRestore();
    });

    it('should validate invalid date strings', () => {
      const invalidData = { ...validStoryData, date: 'not a date' };

      const result = StoryFrontmatterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          'Must be a valid date string',
        );
      }
    });
  });

  describe('BlogpostFrontmatterSchema', () => {
    const validBlogData: BlogpostFrontmatter = {
      title: 'How to Build Better APIs',
      description: 'A comprehensive guide to API design',
      exerpt: 'Learn the fundamentals of good API design',
      author: 'Jane Smith',
      image: '/images/api-guide.jpg',
      date: '2024-02-20',
      tags: ['api', 'development', 'best-practices'],
      read: '10 min',
      youtubeId: 'dQw4w9WgXcQ',
    };

    it('should validate correct blog post frontmatter', () => {
      const result = BlogpostFrontmatterSchema.safeParse(validBlogData);
      expect(result.success).toBe(true);
    });

    it('should allow optional exerpt', () => {
      const dataWithoutExcerpt = { ...validBlogData };
      delete (dataWithoutExcerpt as any).exerpt;

      const result = BlogpostFrontmatterSchema.safeParse(dataWithoutExcerpt);
      expect(result.success).toBe(true);
    });

    it('should require all mandatory fields', () => {
      const requiredFields = [
        'title',
        'description',
        'author',
        'image',
        'date',
        'read',
      ];

      for (const field of requiredFields) {
        const invalidData = { ...validBlogData };
        delete (invalidData as any)[field];

        const result = BlogpostFrontmatterSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual([field]);
        }
      }
    });
  });

  describe('PageFrontmatterSchema', () => {
    const validPageData: PageFrontmatter = {
      title: 'Privacy Policy',
      description: 'Our comprehensive privacy policy',
    };

    it('should validate correct page frontmatter', () => {
      const result = PageFrontmatterSchema.safeParse(validPageData);
      expect(result.success).toBe(true);
    });

    it('should require title and description', () => {
      const invalidData = { ...validPageData };
      delete (invalidData as any).title;

      const result = PageFrontmatterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Validation Utilities', () => {
    describe('validateWithSchema', () => {
      it('should return success result for valid data', () => {
        const validData = { title: 'Test', description: 'Test description' };
        const result = validateWithSchema(PageFrontmatterSchema, validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual(validData);
        }
      });

      it('should return error result with detailed issues', () => {
        const invalidData = { title: '' }; // Missing description, empty title
        const result = validateWithSchema(
          PageFrontmatterSchema,
          invalidData,
          'TestPage',
        );

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.issues.length).toBeGreaterThan(0);
          expect(result.issues[0]).toContain('[TestPage]');
        }
      });
    });

    describe('Validators', () => {
      it('should validate story data correctly', () => {
        const validData = {
          name: 'Test',
          date: '2024-01-01',
          title: 'Test Story',
          subtitle: 'Test Subtitle',
          description: 'Test Description',
          speaker: 'John Doe',
          role: 'CEO',
          duration: '30 min',
          scopes: [],
          tags: [],
          tools: [],
          quotes: [],
          deliverables: [],
        };

        const result = Validators.story(validData);
        expect(result.success).toBe(true);
      });

      it('should provide detailed error information', () => {
        const invalidData = { title: 'Only title' };
        const result = Validators.story(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.issues.length).toBeGreaterThan(1);
          expect(result.error).toBeDefined();
        }
      });
    });

    describe('Type Guard Functions', () => {
      it('should correctly identify valid story frontmatter', () => {
        const validData = {
          name: 'Test',
          date: '2024-01-01',
          title: 'Test Story',
          subtitle: 'Test Subtitle',
          description: 'Test Description',
          speaker: 'John Doe',
          role: 'CEO',
          duration: '30 min',
          scopes: [],
          tags: [],
          tools: [],
          quotes: [],
          deliverables: [],
        };

        expect(isValidStoryFrontmatter(validData)).toBe(true);
        expect(isValidStoryFrontmatter({})).toBe(false);
      });

      it('should correctly identify valid blog post frontmatter', () => {
        const validData = {
          title: 'Test Post',
          description: 'Test Description',
          author: 'Author',
          image: '/test.jpg',
          date: '2024-01-01',
          tags: [],
          read: '5 min',
        };

        expect(isValidBlogpostFrontmatter(validData)).toBe(true);
        expect(isValidBlogpostFrontmatter({})).toBe(false);
      });

      it('should correctly identify valid page frontmatter', () => {
        const validData = {
          title: 'Test Page',
          description: 'Test Description',
        };

        expect(isValidPageFrontmatter(validData)).toBe(true);
        expect(isValidPageFrontmatter({})).toBe(false);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined inputs', () => {
      expect(isValidStoryFrontmatter(null)).toBe(false);
      expect(isValidStoryFrontmatter(undefined)).toBe(false);
      expect(isValidBlogpostFrontmatter(null)).toBe(false);
      expect(isValidPageFrontmatter(undefined)).toBe(false);
    });

    it('should handle non-object inputs', () => {
      expect(isValidStoryFrontmatter('string')).toBe(false);
      expect(isValidStoryFrontmatter(123)).toBe(false);
      expect(isValidStoryFrontmatter(true)).toBe(false);
      expect(isValidStoryFrontmatter([])).toBe(false);
    });

    it('should trim whitespace from strings', () => {
      const dataWithWhitespace = {
        title: '  Test Page  ',
        description: '  Test Description  ',
      };

      const result = PageFrontmatterSchema.safeParse(dataWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Test Page');
        expect(result.data.description).toBe('Test Description');
      }
    });

    it('should handle arrays with empty strings correctly', () => {
      const dataWithEmptyArrayItems = {
        name: 'Test',
        date: '2024-01-01',
        title: 'Test Story',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        speaker: 'John Doe',
        role: 'CEO',
        duration: '30 min',
        scopes: ['valid', '', 'also valid'], // Empty string should fail
        tags: [],
        tools: [],
        quotes: [],
        deliverables: [],
      };

      const result = StoryFrontmatterSchema.safeParse(dataWithEmptyArrayItems);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['scopes', 1]);
        expect(result.error.issues[0].message).toContain('cannot be empty');
      }
    });

    it('should handle various date formats', () => {
      const validDates = [
        '2024-01-01',
        '2024/01/01',
        '01 Jan 2024',
        'January 1, 2024',
        '2024-01-01T00:00:00Z',
      ];

      for (const date of validDates) {
        const data = {
          title: 'Test Page',
          description: 'Test Description',
          author: 'Author',
          image: '/test.jpg',
          date,
          tags: [],
          read: '5 min',
        };

        const result = BlogpostFrontmatterSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    });
  });
});
