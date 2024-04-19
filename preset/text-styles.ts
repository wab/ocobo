import { defineTextStyles } from '@pandacss/dev';

export const textStyles = defineTextStyles({
  heading1: {
    value: {
      base: {
        fontFamily: 'header',
        fontWeight: 400,
        fontSize: '26px',
        lineHeight: 1.1,
      },
      lg: {
        fontSize: '64px',
      },
    },
  },

  heading2: {
    value: {
      base: {
        fontFamily: 'header',
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: 1.2,
      },
      lg: {
        fontSize: '36px',
      },
    },
  },
  heading3: {
    value: {
      base: {
        fontFamily: 'body',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: 1.3,
      },
      lg: {
        fontSize: '30px',
      },
    },
  },
  small: {
    value: {
      base: {
        fontFamily: 'body',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: 1.3,
      },
      lg: {
        fontSize: '16px',
      },
    },
  },
  medium: {
    value: {
      base: {
        fontFamily: 'body',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: 1.3,
      },
      lg: {
        fontSize: '20px',
      },
    },
  },
  large: {
    value: {
      base: {
        fontFamily: 'body',
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: 1.3,
      },
      lg: {
        fontSize: '28px',
      },
    },
  },
  nav: {
    value: {
      base: {
        fontFamily: 'body',
        fontWeight: 400,
        fontSize: '30px',
        lineHeight: 1,
      },
      md: {
        //fontSize: '20px',
        fontSize: '24px',
      },
      xl: {
        fontSize: '24px',
      },
    },
  },
});
