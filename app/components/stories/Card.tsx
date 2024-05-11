import { styled } from '@ocobo/styled-system/jsx';

const Root = styled('div', {
  base: {
    mb: 8,
  },
});

const Section = styled('div', {
  base: {
    bg: 'mint.light',
    p: 6,
    borderBottom: 'thin',
    borderColor: 'mint',

    _last: {
      borderBottom: 'none',
    },
  },
});

const Title = styled('h2', {
  base: {
    fontWeight: 'bold',
    bg: 'mint',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    p: 6,
  },
});

const List = styled('ul', {
  base: {
    pl: 6,
    listStyleType: 'disc',

    '& li': {
      mb: 4,
      _last: {
        mb: 0,
      },
    },
  },
});

export const Card = { Root, Title, Section, List };
