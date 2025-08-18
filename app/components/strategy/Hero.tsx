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
  const { t } = useTranslation('strategy');
  const getLocalizedPath = useLocalizedPathname();

  return (
    <header className={section()}>
      <Container isMobileFullWidth>
        <div
          className={css({
            bg: 'yellow.light',
            p: { base: '10%', lg: '3em' },
            w: { base: 'full', lg: '5/6' },
            boxSizing: 'border-box',
            mx: 'auto',
            mb: '50px',
          })}
        >
          <Grid columns={{ base: 1, lg: 10 }} alignItems="center">
            <GridItem
              colSpan={{ base: 1, lg: 3 }}
              className={css({
                position: 'relative',
                hideBelow: 'lg',
              })}
            >
              <div
                className={css({
                  w: '150%',
                  position: 'absolute',
                  right: '20%',
                  translateY: '-50%',
                })}
              >
                <Illustration
                  name="strategy_hero"
                  alt=""
                  className={css({ w: 'full' })}
                />
              </div>
            </GridItem>

            <GridItem
              colSpan={{ base: 1, lg: 7 }}
              className={css({
                textAlign: { base: 'center', lg: 'left' },
              })}
            >
              <h1 className={css({ textStyle: 'heading1', marginBottom: '4' })}>
                {t('hero.title')}
              </h1>
              <div className={css({ maxWidth: { base: 'none', lg: '2/3' } })}>
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
              <div
                className={css({
                  w: '250px',
                  position: 'relative',
                  hideFrom: 'lg',
                  mx: 'auto',
                  mt: '-80px',
                  transform: 'translateY(60%)',
                })}
              >
                <Illustration
                  name="strategy_hero_mobile"
                  alt=""
                  className={css({ w: 'full' })}
                />
              </div>
            </GridItem>
          </Grid>
        </div>
      </Container>
    </header>
  );
};

export { Hero };
