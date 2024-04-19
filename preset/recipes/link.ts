import { defineRecipe } from '@pandacss/dev';

export const link = defineRecipe({
  className: 'link',
  description:
    'A link is a reference to a web resource that can be clicked on to navigate to it.',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'start',
    fontWeight: '700',
    textDecoration: 'none',
    cursor: 'pointer',
    flexWrap: 'wrap',
    color: 'inherit',

    _after: {
      content: '""',
      display: 'inline-block',
      background: 'foreground',
      height: '[2px]',
      width: '[calc(100% - 40px)]',
      transition: 'all',
    },

    _hover: {
      _after: {
        width: 'full',
      },
    },

    _focusVisible: {
      outline: 'none',
      _after: {
        height: '[4px]',
      },
    },

    '& svg': { marginLeft: '2' },
  },
});
