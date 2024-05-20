import { NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { center } from '@ocobo/styled-system/patterns';
import { link, section } from '@ocobo/styled-system/recipes';

import { url } from '~/utils/url';

import { Container } from '../ui/Container';

const Aligned = () => {
  const { t } = useTranslation('home');

  return (
    <section className={section()}>
      <Container>
        <Grid columns={{ base: 1, lg: 12 }}>
          <GridItem className={css({ hideBelow: 'xl' })} />
          <GridItem colSpan={{ base: 1, lg: 5 }}>
            <h2
              className={css({
                textStyle: 'heading1',
                bleft: 'coral',
                mb: '6',
              })}
            >
              {t('aligned.title')}
            </h2>
            <h3 className={css({ textStyle: 'heading3' })}>
              {t('aligned.subtitle')}
            </h3>
            <p>{t('aligned.description')}</p>
          </GridItem>
          <GridItem className={css({ hideBelow: 'md' })} />
          <GridItem colSpan={{ base: 1, lg: 5 }}>
            <div
              className={center({
                w: 'full',
                h: { base: '190px', lg: '290px' },
                bg: '#283F2B',
                mb: '6',
              })}
            >
              <img
                src="/logos/tomorro.png"
                alt="Tomorro"
                className={css({ display: 'block', w: '60%' })}
              />
            </div>
            <p>
              <NavLink to={url.stories} className={link()}>
                {t('aligned.cta')}
              </NavLink>
            </p>
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
};

export { Aligned };
