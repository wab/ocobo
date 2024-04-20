import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { container } from '@ocobo/styled-system/patterns';
import { button, typography } from '@ocobo/styled-system/recipes';

import { LocalizedLink } from '../LocalizedLink';

const Hero = () => {
  const { t } = useTranslation('home');

  return (
    <header className={container({ maxWidth: { base: '4/6', md: '8xl' } })}>
      <Grid
        columns={12}
        gridTemplateRows={{
          base: 'calc(80vh - var(--main-header-height))',
          md: '720px',
        }}
        alignItems="center"
      >
        <GridItem
          colSpan={{ base: 12, md: 7 }}
          className={css({
            textAlign: { base: 'center', md: 'left' },
          })}
        >
          <div className={cx(css({ hideFrom: 'md', py: '8', mx: 'auto' }))}>
            <img
              src="/illus/homepage_hero_mobile.svg"
              alt=""
              className={css({ w: 'full' })}
            />
          </div>
          <h1 className={typography({ variant: 'heading1' })}>
            {t('hero.title')}
          </h1>
          <div
            className={css({
              maxW: { base: 'none', lg: '8/12' },
              mt: '4',
            })}
          >
            <p className={typography({ variant: 'heading3' })}>
              {t('hero.subtitle')}
            </p>
            <p className={css({ hideBelow: 'md' })}>{t('hero.description')}</p>
            <p>
              <LocalizedLink to="/contact" className={button()}>
                {t('contact.cta', { ns: 'common' })}
              </LocalizedLink>
            </p>
          </div>
        </GridItem>
        <GridItem
          colSpan={{ base: 12, md: 5 }}
          className={css({ hideBelow: 'md' })}
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
