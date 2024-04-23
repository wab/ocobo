import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem, styled } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { Container } from '../ui/Container';

const Root = styled('div', {
  base: {
    bg: 'white',
    boxShadow: 'base',
    height: 'full',
  },
});
const Title = styled('h3', {
  base: {
    layerStyle: 'reversed',
    textStyle: 'heading2',
    justifyContent: { base: 'center', md: 'start' },
    textAlign: { base: 'center', md: 'left' },
    display: 'flex',
    alignItems: 'center',
    minHeight: '4em',
    px: '1em',
  },
});
const List = styled('ul', {
  base: {
    p: '1.5em',
    pr: '3em',
    textStyle: 'large',
    listStylePosition: 'outside',

    '& > li': {
      pl: '1.5em',
      bgRepeat: 'no-repeat',
      bgSize: '1em',
      bgPosition: '0 0.25em',
    },

    '& > li + li': {
      mt: '6',
    },
  },

  variants: {
    isChecked: {
      true: {
        '& > li': {
          bgImage: 'checked',
        },
      },
      false: {
        '& > li': {
          bgImage: 'unchecked',
        },
      },
    },
  },

  defaultVariants: {
    isChecked: false,
  },
});

const Card = { Root, Title, List };

const Better = () => {
  const { t } = useTranslation('home');

  const items0 = t('better.cards.0.items', { returnObjects: true });
  const items1 = t('better.cards.1.items', { returnObjects: true });
  return (
    <section
      className={cx(
        section(),
        css({
          bg: 'mint.light',
        }),
      )}
    >
      <Container>
        <h2 className={css({ textStyle: 'heading1', textAlign: 'center' })}>
          {t('better.title')}
        </h2>
        <Grid
          columns={{ base: 1, lg: 12 }}
          css={{ mt: { base: '4', md: '8', xl: '16' } }}
          alignItems="stretch"
        >
          <GridItem className={css({ hideBelow: 'xl' })} />
          <GridItem colSpan={{ base: 1, lg: 6, xl: 5 }}>
            <Card.Root>
              <Card.Title>{t('better.cards.0.title')}</Card.Title>
              <Card.List isChecked>
                {Array.isArray(items0) &&
                  items0.map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
              </Card.List>
            </Card.Root>
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 6, xl: 5 }}>
            <Card.Root>
              <Card.Title>{t('better.cards.1.title')}</Card.Title>
              <Card.List>
                {Array.isArray(items1) &&
                  items1.map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
              </Card.List>
            </Card.Root>
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
};

export { Better };
