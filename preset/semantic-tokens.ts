import { defineSemanticTokens } from '@pandacss/dev';

export const semanticTokens = defineSemanticTokens({
  colors: {
    background: {
      value: {
        base: '{colors.white}',
        _dark: '{colors.dark}',
      },
    },
    foreground: {
      value: {
        base: '{colors.dark}',
        _dark: '{colors.white}',
      },
    },
    muted: {
      DEFAULT: {
        value: {
          base: '{colors.gray.light}',
          _dark: '{colors.gray}',
        },
      },
      foreground: {
        value: {
          base: '{colors.gray}',
          _dark: '{colors.gray.light}',
        },
      },
    },
    card: {
      DEFAULT: {
        value: {
          base: '{colors.white}',
          _dark: '{colors.dark}',
        },
      },
      foreground: {
        value: {
          base: '{colors.dark}',
          _dark: '{colors.gray}',
        },
      },
    },
    popover: {
      DEFAULT: {
        value: {
          base: '{colors.white}',
          _dark: '{colors.dark}',
        },
      },
      foreground: {
        value: {
          base: '{colors.dark}',
          _dark: '{colors.gray}',
        },
      },
    },
    border: {
      value: {
        base: '{colors.gray}',
        _dark: '{colors.gray}',
      },
    },
    input: {
      value: {
        base: '{colors.gray}',
        _dark: '{colors.gray}',
      },
    },
    accent: {
      DEFAULT: {
        value: {
          base: '{colors.gray.light}',
          _dark: '{colors.gray}',
        },
      },
      foreground: {
        value: {
          base: '{colors.dark}',
          _dark: '{colors.gray}',
        },
      },
    },
    destructive: {
      DEFAULT: {
        value: {
          base: '{colors.coral.light}',
          _dark: '{colors.coral.dark}',
        },
      },
      foreground: {
        value: {
          base: '{colors.coral.dark}',
          _dark: '{colors.coral.light}',
        },
      },
    },
    ring: {
      value: {
        base: '{colors.gray}',
        _dark: '{colors.gray}',
      },
    },
  },
  borders: {
    base: { value: '1px solid {colors.gray.light}' },
    input: { value: '1px solid {colors.input}' },
    destructive: { value: '1px solid {colors.destructive}' },
  },
  radii: {
    xl: { value: `calc({radii.radius} + 4px)` },
    lg: { value: `{radii.radius}` },
    md: { value: `calc({radii.radius} - 2px)` },
    sm: { value: 'calc({radii.radius} - 4px)' },
  },
  animations: {
    'accordion-down': { value: 'accordion-down 0.2s ease-out' },
    'accordion-up': { value: 'accordion-up 0.2s ease-out' },
  },
});
