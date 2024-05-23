import { styled } from '@ocobo/styled-system/jsx';

const SubMenuRoot = styled('ul', {
  base: {
    p: '6',
  },
});
const SubMenuItem = styled('li', {
  base: {
    borderLeft: 'thick',
    textStyle: 'nav',

    '& > a': {
      px: '2',
      py: '1',
      display: 'block',
      transition: 'colors',
      transitionDuration: 'normal',
      transitionBehavior: 'smooth',
    },

    '& + &': {
      mt: '6',
    },
  },

  variants: {
    variant: {
      yellow: {
        borderColor: 'yellow',
        '& > a': {
          _hover: {
            bga: 'yellow/5',
            color: 'yellow',
          },
        },
      },
      sky: {
        borderColor: 'sky',
        '& > a': {
          _hover: {
            bga: 'sky/5',
            color: 'sky',
          },
        },
      },
      coral: {
        borderColor: 'coral',
        '& > a': {
          _hover: {
            bga: 'coral/5',
            color: 'coral',
          },
        },
      },
      mint: {
        borderColor: 'mint',
        '& > a': {
          _hover: {
            bga: 'mint/10',
            color: 'mint',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'mint',
  },
});

export const SubMenu = { Root: SubMenuRoot, Item: SubMenuItem };
