import { defineSlotRecipe } from '@pandacss/dev';

export const navigationMenu = defineSlotRecipe({
  className: 'navigationMenu',
  description: 'Styles for the NavigationMenu component',
  slots: [
    'root',
    'list',
    'item',
    'trigger',
    'content',
    'link',
    'viewportWrapper',
    'viewport',
    'indicator',
  ],
  base: {
    root: {
      position: 'relative',
      zIndex: '10',
      display: 'flex',
      maxWidth: 'max-content',
      flex: '1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      display: 'flex',
      flex: '1',
      listStyleType: 'none',
      alignItems: 'center',
      justifyContent: 'start',
      gap: '2',
      xl: {
        gap: '4',
      },
    },
    item: {
      '& > [data-radix-collection-item]': {
        display: 'inline-flex',
        h: '24px',
        w: 'max-content',
        alignItems: 'center',
        justifyContent: 'center',
        bg: 'background',
        px: '2',
        py: '2',
        textStyle: 'nav',
        fontWeight: 'medium',
        cursor: 'pointer',
        border: 'none',
        borderLeft: 'thick',
        borderColor: 'transparent',
        boxSizing: 'border-box',
        transition: 'colors',
        transitionDuration: 'normal',
        transitionBehavior: 'smooth',
        color: 'dark',

        _hover: {
          borderColor: 'gray',
          color: 'darker',
        },

        _focus: {
          borderColor: 'gray',
          color: 'accent.foreground',
          outline: 'none',
        },

        _disabled: {
          pointerEvents: 'none',
          opacity: '50',
        },
      },
    },
    trigger: {
      '& > svg': {
        position: 'relative',
        top: '1px',
        ml: '4px',
        h: '3',
        w: '3',
        transition: 'all',
        transitionDuration: 'normal',
      },

      '&[data-state=open]': {
        _hover: {
          '& > svg': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
    content: {
      top: '100%',
      border: 'thin',
      borderColor: 'gray.light',
      bg: 'popover',
      color: 'popover.foreground',
      shadow: 'base',
      minWidth: 'max-content',
      maxWidth: 240,

      '&[data-motion^=from-]': {
        animateIn: true,
        fadeIn: 0,
      },

      '&[data-motion^=to-]': {
        animateOut: true,
        fadeOut: 0,
      },

      '&[data-motion=from-end]': {
        slideInFromRight: '52',
      },

      '&[data-motion=from-start]': {
        slideInFromLeft: '52',
      },

      '&[data-motion=to-end]': {
        slideOutToRight: '52',
      },

      '&[data-motion=to-start]': {
        slideOutToLeft: '52',
      },

      md: {
        position: 'absolute',
        w: 'auto',
      },
    },
    viewportWrapper: {
      position: 'absolute',
      left: '0',
      top: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    viewport: {
      transformOrigin: 'top center',
      position: 'relative',
      mt: '1.5',
      h: 'var(--radix-navigation-menu-viewport-height)',
      w: 'full',
      overflow: 'hidden',
      rounded: 'none',
      border: 'base',
      bg: 'popover',
      color: 'popover.foreground',
      shadow: 'base',
      '&[data-state=open]': {
        animateIn: true,
        zoomIn: 90,
      },
      '&[data-state=closed]': {
        animateOut: true,
        zoomOut: 95,
      },
      md: {
        w: 'var(--radix-navigation-menu-viewport-width)',
      },
    },
    indicator: {
      top: 'calc(100% - 9px)',
      zIndex: '1',
      display: 'flex',
      h: '10px',
      alignItems: 'flex-end',
      justifyContent: 'center',
      overflow: 'hidden',

      '&[data-state=visible]': {
        animateIn: true,
        fadeIn: 0,
      },

      '&[data-state=hidden]': {
        animateOut: true,
        fadeOut: 0,
      },

      '& > div': {
        position: 'relative',
        top: '50%',
        h: '10px',
        w: '10px',
        transform: 'rotate(45deg)',
        //roundedTopLeft: 'sm',
        //bg: 'border',
        border: 'thin',
        borderColor: 'gray.light',
        shadow: 'base',
        backgroundColor: 'popover',
      },
    },
  },
});
