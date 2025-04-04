import { NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { center } from '@ocobo/styled-system/patterns';
import { link, section } from '@ocobo/styled-system/recipes';

import { url } from '~/utils/url';

import { PlayerYoutube } from '../PlayerYoutube';
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
            <PlayerYoutube
              id="-xpYK2HEw3M"
              title="Revenue Connect: Simplifier l'adoption d'une solution (Benjamin Boileux & Raphaëlle Martin-Neuville)"
              className={css({
                mb: '4',
              })}
            />
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
