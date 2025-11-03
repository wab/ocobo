import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem, styled } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const List = styled('ul', {
  base: {
    '& > li': {
      bleft: 'yellow',
    },

    '& > li + li': {
      mt: '12',
    },
  },
});

const Faster = () => {
  const { t } = useTranslation('home');

  const items = t('faster.items', { returnObjects: true });
  const descriptionItems = t('faster.description', { returnObjects: true });
  return (
    <section className={cx(section(), css({ overflow: 'hidden' }))}>
      <Container>
        <Grid columns={{ base: 1, lg: 12 }} alignItems="center">
          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            className={css({ textAlign: { base: 'center', lg: 'left' } })}
          >
            <div
              className={css({
                hideFrom: 'lg',
                py: '8',
              })}
            >
              <Illustration
                name="homepage_faster"
                alt=""
                className={css({
                  w: 'full',
                  maxWidth: { base: '320px', lg: '220px', '2xl': '320px' },
                  mx: 'auto',
                })}
              />
            </div>
            <h2 className={css({ textStyle: 'heading1' })}>
              {t('faster.title')}
            </h2>
            <p
              className={css({
                textStyle: { base: 'medium', lg: 'heading3' },
                mb: '6',
              })}
            >
              {t('faster.subtitle')}
            </p>
            <div className={css({ hideBelow: 'lg' })}>
              {Array.isArray(descriptionItems) &&
                descriptionItems.length > 0 &&
                descriptionItems.map((item, i) => (
                  <p key={`item-${i}`}>{item}</p>
                ))}
            </div>
          </GridItem>
          <GridItem />
          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <List>
              {Array.isArray(items) &&
                items.map((item) => {
                  return (
                    <li key={item} className={css({ textStyle: 'heading3' })}>
                      {item}
                    </li>
                  );
                })}
            </List>
          </GridItem>
          <GridItem />
          <GridItem
            className={css({ position: 'relative', hideBelow: 'lg' })}
            alignSelf="center"
          >
            <div
              className={css({
                position: 'absolute',
                w: { base: '320px', '2xl': '480px' },
                translateY: '-50%',
              })}
            >
              <Illustration name="homepage_faster" alt="" />
            </div>
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
};

export { Faster };
