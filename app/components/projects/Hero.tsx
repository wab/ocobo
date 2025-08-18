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
  const { t } = useTranslation('projects');
  const getLocalizedPath = useLocalizedPathname();

  return (
    <header className={section()}>
      <Container isMobileFullWidth>
        <Grid columns={{ base: 1, lg: 12 }} alignItems="center">
          <GridItem
            colStart={2}
            colEnd={{ base: 1, lg: 11 }}
            className={css({
              bg: 'sky.light',
              py: { base: 8, lg: 16 },
              px: { base: 8, lg: 0 },
            })}
          >
            <Grid columns={{ base: 1, lg: 9 }} alignItems="center">
              <GridItem className={css({ hideBelow: 'lg' })} />
              <GridItem
                colSpan={{ base: 1, lg: 5 }}
                className={css({ textAlign: { base: 'center', lg: 'left' } })}
              >
                <h1 className={css({ textStyle: 'heading1' })}>
                  {t('hero.title')}
                </h1>
                <p className={css({ textStyle: 'heading3', hideBelow: 'lg' })}>
                  {t('hero.subtitle')}
                </p>
                <p className={css({ hideBelow: 'lg' })}>
                  {t('hero.description')}
                </p>
                <p className={css({ hideFrom: 'lg' })}>
                  {t('hero.description_mobile')}
                </p>
                <p>
                  <NavLink
                    to={getLocalizedPath(url.contact)}
                    className={button()}
                  >
                    {t('contact.cta', { ns: 'common' })}
                  </NavLink>
                </p>
              </GridItem>
              <GridItem colSpan={{ base: 1, lg: 3 }}>
                <div
                  className={css({
                    translateX: { base: '0%', lg: '30%' },
                    translateY: { base: '70px', lg: '0%' },
                    w: { base: '2/3', lg: 'full' },
                    mt: { base: '-70px', lg: 0 },
                    mx: 'auto',
                  })}
                >
                  <Illustration
                    name="projects_hero"
                    className={css({
                      hideBelow: 'lg',
                      transform: { base: 'none', lg: 'scale(1.3)' },
                    })}
                  />
                  <Illustration
                    name="projects_hero_mobile"
                    className={css({
                      hideFrom: 'lg',
                      transform: { base: 'none', lg: 'scale(1.3)' },
                    })}
                  />
                </div>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </header>
  );
};

export { Hero };
