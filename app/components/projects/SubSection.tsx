import { styled } from '@ocobo/styled-system/jsx';

const Root = styled('div', {
  base: {
    position: 'relative',
    pb: 16,
    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'full',
      height: '1px',
      bg: 'dark',
    },
  },
});

const Title = styled('h3', {
  base: {
    translateY: '-50%',
  },
});

export const SubSection = { Root, Title };
