import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { button, section } from '@ocobo/styled-system/recipes';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';
import { url } from '~/utils/url';

import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const Hero = () => {
  const { t } = useTranslation('home');
  const getLocalizedPath = useLocalizedPathname();

  return (
    <header className={section()}>
      <Container>
        <Grid columns={{ base: 1, lg: 12 }} alignItems="center" rowGap="2rem">
          <GridItem
            colSpan={{ base: 1, lg: 7 }}
            className={css({
              textAlign: { base: 'center', lg: 'left' },
            })}
          >
            <h1 className={css({ textStyle: 'heading1' })}>
              {t('hero.title')}
            </h1>
            <div
              className={css({
                maxW: { base: 'none', lg: '8/12' },
                mt: '4',
              })}
            >
              <p className={css({ textStyle: 'heading3' })}>
                {t('hero.subtitle')}
              </p>
              <p className={css({ hideBelow: 'lg' })}>
                {t('hero.description')}
              </p>
              <p>
                <NavLink
                  to={getLocalizedPath(url.contact)}
                  className={button()}
                >
                  {t('contact.cta', { ns: 'common' })}
                </NavLink>
              </p>
            </div>
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 5 }}>
            <Illustration
              name="homepage_hero"
              alt=""
              className={css({
                display: 'block',
                w: { base: '3/4', lg: 'full' },
                mx: 'auto',
              })}
            />
          </GridItem>
        </Grid>
      </Container>
    </header>
  );
};

export { Hero };
