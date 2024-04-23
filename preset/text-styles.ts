import { defineTextStyles } from '@pandacss/dev';

export const textStyles = defineTextStyles({
  heading1: {
    value: {
      fontFamily: 'header',
      fontWeight: 400,
      fontSize: { base: '1.625rem', lg: '2.75rem', '2xl': '3.5rem' },
      lineHeight: 1.1,
    },
  },

  heading2: {
    value: {
      fontFamily: 'header',
      fontWeight: 400,
      fontSize: { base: '1.125rem', lg: '1.8rem', '2xl': '2rem' },
      lineHeight: 1.2,
    },
  },
  heading3: {
    value: {
      fontFamily: 'body',
      fontWeight: 700,
      fontSize: { base: '1.25rem', lg: '1.25rem', '2xl': '1.375rem' },
      lineHeight: 1.3,
    },
  },
  small: {
    value: {
      fontFamily: 'body',
      fontWeight: 400,
      fontSize: { base: '0.75rem', lg: '0.875rem', '2xl': '1rem' },
      lineHeight: 1.3,
    },
  },
  medium: {
    value: {
      fontFamily: 'body',
      fontWeight: 400,
      fontSize: { base: '1rem', lg: '1.125rem', '2xl': '1.25rem' },
      lineHeight: 1.3,
    },
  },
  large: {
    value: {
      fontFamily: 'body',
      fontWeight: 400,
      fontSize: { base: '1rem', lg: '1.25rem', '2xl': '1.375rem' },
      lineHeight: 1.3,
    },
  },
  nav: {
    value: {
      fontFamily: 'body',
      fontWeight: 400,
      fontSize: { base: '1.2rem', lg: '1rem', '2xl': '1.125rem' },
      lineHeight: 1,
    },
  },
});
