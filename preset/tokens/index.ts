import type { Tokens } from '@pandacss/dev';

import { aspectRatios } from './aspect-ratios';
import { borders } from './borders';
import { colors } from './colors';
import { sizes } from './sizes';
import { spacing } from './spacing';
import {
  fontSizes,
  fontWeights,
  fonts,
  letterSpacings,
  lineHeights,
} from './typography';

const defineTokens = <T extends Tokens>(v: T) => v;

export const tokens = defineTokens({
  aspectRatios,
  borders,

  radii: {
    full: { value: '9999px' },
    radius: { value: '0.5rem' },
  },
  fontWeights,
  lineHeights,
  fonts,
  letterSpacings,
  fontSizes,
  colors,
  shadows: {
    base: { value: '0px 4px 50px 0px rgba(0, 0, 0, 0.12)' },
    inner: { value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' },
    outline: { value: '0 0 0 3px rgba(66, 153, 225, 0.5)' },
    sm: {
      value: [
        '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        '0 1px 2px -1px rgb(0 0 0 / 0.1)',
      ],
    },
    md: {
      value: [
        '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        '0 2px 4px -2px rgb(0 0 0 / 0.1)',
      ],
    },
    none: { value: 'none' },
  },
  blurs: {
    base: { value: '8px' },
  },
  spacing,
  sizes,
  assets: {
    checked: {
      value: {
        type: 'svg',
        value:
          '<svg width="38" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 38 27"><path stroke="#9ADBBA" stroke-width="5" d="m1.768 10.232 11 11M35.768 1.768l-23 23"/></svg>',
      },
    },
    unchecked: {
      value: {
        type: 'svg',
        value:
          '<svg height="27" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 27"><path stroke="#FE9C87" stroke-width="5" d="m25.768 1.768-23 23M25.232 24.768l-23-23"/></svg>',
      },
    },
  },
});
