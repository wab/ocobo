import { defineConfig } from '@pandacss/dev';

import ocoboPreset from 'preset';

export default defineConfig({
  // Whether to use css reset
  preflight: false,

  jsxFramework: 'react',
  presets: [ocoboPreset],

  // Where to look for your css declarations
  include: [
    './app/routes/**/*.{ts,tsx,js,jsx}',
    './app/components/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],
  strictPropertyValues: true,
  strictTokens: true,

  // Useful for theme customization
  theme: {
    extend: {},
  },

  staticCss: {
    css: [
      {
        properties: {
          // ✅ Good: Pre-generate the styles for the color
          color: ['yellow', 'sky', 'mint', 'coral'],
          borderColor: ['yellow', 'sky', 'mint', 'coral'],
          backgroundColor: [
            'yellow',
            'sky',
            'mint',
            'coral',
            'yellow.light',
            'sky.light',
            'mint.light',
            'coral.light',
          ],
        },
      },
    ],
  },

  utilities: {
    extend: {
      grid: {
        className: 'grid', // css({ br: "sm" }) => rounded-sm
        values: ['2', '3', '4'], // connect values to the radii tokens
        transform(value) {
          return {
            display: 'grid',
            gridTemplateColumns: `repeat(${value}, minmax(0, 1fr))`,
            gap: '1rem',
          };
        },
      },
      bleft: {
        className: 'bleft', // css({ br: "sm" }) => rounded-sm
        values: ['yellow', 'sky', 'mint', ' coral'], // connect values to the radii tokens
        transform(value) {
          return {
            paddingLeft: '1rem',
            borderLeft: '10px solid var(--colors-' + value + ')',
          };
        },
      },
    },
  },

  patterns: {
    extend: {
      // Extend the default `flex` pattern
      grid: {
        defaultValues(props) {
          return {
            gap: props.columnGap || props.rowGap ? undefined : '1rem',
            columns: 12,
          };
        },
      },
    },
  },

  // The output directory for your css system
  outdir: '@ocobo/styled-system',
});
