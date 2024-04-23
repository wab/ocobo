import { defineRecipe } from '@pandacss/dev';

export const section = defineRecipe({
  className: 'section',
  description:
    'A section is a thematic grouping of content, typically with a heading.',
  base: {
    py: { base: '8', md: '16', xl: '24' },
  },
});
