import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { container } from '@ocobo/styled-system/patterns';
import { section } from '@ocobo/styled-system/recipes';

import { LocalizedLink } from '../LocalizedLink';
import { Button } from '../ui/Button';

const Hero = () => {
  const { t } = useTranslation('home');

  return (
    <header
      className={cx(
        container({ maxWidth: { base: 'mobile', lg: 'desktop' } }),
        section(),
      )}
    >
      <Grid columns={{ base: 1, lg: 12 }} alignItems="center">
        <GridItem
          colSpan={{ base: 1, lg: 7 }}
          className={css({
            textAlign: { base: 'center', lg: 'left' },
          })}
        >
          <div className={cx(css({ hideFrom: 'lg', py: '8' }))}>
            <img
              src="/illus/homepage_hero_mobile.svg"
              alt=""
              className={css({ w: 'full', maxWidth: '320px', mx: 'auto' })}
            />
          </div>
          <h1 className={css({ textStyle: 'heading1' })}>{t('hero.title')}</h1>
          <div
            className={css({
              maxW: { base: 'none', lg: '8/12' },
              mt: '4',
            })}
          >
            <p className={css({ textStyle: 'heading3' })}>
              {t('hero.subtitle')}
            </p>
            <p className={css({ hideBelow: 'lg' })}>{t('hero.description')}</p>
            <p>
              <Button asChild>
                <LocalizedLink to="/contact">
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
          <img
            src="/illus/homepage_hero.svg"
            alt=""
            className={css({ w: 'full' })}
          />
        </GridItem>
      </Grid>
    </header>
  );
};

export { Hero };
