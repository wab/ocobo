import { defineSlotRecipe } from '@pandacss/dev';

export const accordion = defineSlotRecipe({
  className: 'accordion',
  description: 'Styles for the Accordion component',
  slots: ['root', 'item', 'header', 'trigger', 'content'],
  base: {
    item: {},
    header: {
      display: 'flex',
    },
    trigger: {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all',
      cursor: 'pointer',
      bg: 'transparent',
      border: 'none',

      _hover: {},

      '& > svg': {
        flexShrink: '0',
        transition: 'transform',
        transitionDuration: 'normal',
      },

      '&[data-state=open] > svg': {
        transform: 'rotate(90deg)',
      },
    },
    content: {
      overflow: 'hidden',
      transition: 'all',

      '&[data-state=closed]': {
        animation: 'accordion-up',
      },

      '&[data-state=open]': {
        animation: 'accordion-down',
      },
    },
  },
});
