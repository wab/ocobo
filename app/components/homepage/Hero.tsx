import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { url } from '~/utils/url';

import { LocalizedLink } from '../LocalizedLink';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const Hero = () => {
  const { t } = useTranslation('home');

  return (
    <header className={section()}>
      <Container>
        <Grid columns={{ base: 1, lg: 12 }} alignItems="center">
          <GridItem
            colSpan={{ base: 1, lg: 7 }}
            className={css({
              textAlign: { base: 'center', lg: 'left' },
            })}
          >
            <div className={cx(css({ hideFrom: 'lg', py: '8' }))}>
              <Illustration
                name="homepage_hero_mobile"
                alt=""
                className={css({ w: 'full', maxWidth: '320px', mx: 'auto' })}
              />
            </div>
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
                <Button asChild>
                  <LocalizedLink to={url.contact}>
                    {t('contact.cta', { ns: 'common' })}
                  </LocalizedLink>
                </Button>
              </p>
            </div>
          </GridItem>
          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            className={css({ hideBelow: 'lg' })}
          >
            <Illustration
              name="homepage_hero"
              alt=""
              className={css({ w: 'full' })}
            />
          </GridItem>
        </Grid>
      </Container>
    </header>
  );
};

export { Hero };
