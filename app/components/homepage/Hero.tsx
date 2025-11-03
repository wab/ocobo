import { Trans, useTranslation } from 'react-i18next';
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

  const descriptionItems = t('hero.description.2', { returnObjects: true });

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
                maxW: { base: 'none', lg: '10/12' },
                mt: '4',
                display: 'grid',
                gap: '6',
              })}
            >
              <div>
                <Trans
                  i18nKey={'hero.description.0'}
                  ns="home"
                  components={[<strong key="strong" />]}
                />
              </div>
              <div>
                <Trans
                  i18nKey={'hero.description.1'}
                  ns="home"
                  components={[<strong key="strong" />]}
                />
              </div>
              <ul className={css({ listStyle: 'disc', pl: '4' })}>
                {Array.isArray(descriptionItems) &&
                  descriptionItems.length > 0 &&
                  descriptionItems.map((item, i) => (
                    <li key={`item-${i}`}>{item}</li>
                  ))}
              </ul>
              <div>
                <Trans
                  i18nKey={'hero.description.3'}
                  ns="home"
                  components={[<strong key="strong" />]}
                />
              </div>

              <div className={css({ display: 'flex', gap: '4' })}>
                <NavLink
                  to={getLocalizedPath(url.contact)}
                  className={button({ variant: 'solid' })}
                >
                  {t('contact.cta', { ns: 'common' })}
                </NavLink>
                <NavLink to={url.stories} className={button()}>
                  {t('hero.cta', { ns: 'home' })}
                </NavLink>
              </div>
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
