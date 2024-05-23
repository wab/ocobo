import { styled } from '@ocobo/styled-system/jsx';

const Root = styled('div', {
  base: {
    bleft: 'sky',
    bg: 'sky.light',
    py: 4,
    pr: 4,
    height: 'full',
    maxWidth: { base: '240px', lg: 'none' },
  },
});

const Title = styled('h4', {
  base: {
    textStyle: 'big',
    fontWeight: 'bold',
  },
});

const List = styled('ul', {
  base: {
    textStyle: 'small',
    mt: 4,
    pl: 4,
    listStyleType: 'disc',
  },
});

export const Card = { Root, Title, List };
