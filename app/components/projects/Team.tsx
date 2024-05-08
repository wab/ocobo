import { Trans, useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { ToolCarousel } from '../ToolCarousel';
import { Container } from '../ui/Container';

const Team = () => {
  const { t } = useTranslation('projects');

  const descriptionDesktop = t('team.description_desktop');
  return (
    <section
      className={cx(
        section(),
        css({
          bg: { base: 'transparent', lg: 'sky.light' },
        }),
      )}
    >
      <Container>
        <Grid columns={{ base: 1, lg: 12 }}>
          <GridItem colSpan={{ base: 1, lg: 5 }}>
            <h2 className={css({ textStyle: 'heading1', bleft: 'sky' })}>
              {t('team.title')}
            </h2>
            <p className={css({ textStyle: 'medium', hideBelow: 'lg' })}>
              <Trans
                i18nKey={descriptionDesktop}
                components={[<strong key="strong" />]}
              />
            </p>
            <p className={css({ textStyle: 'medium', hideFrom: 'lg' })}>
              {t('team.description_mobile')}
            </p>
          </GridItem>
          <GridItem
            colSpan={{ base: 1, lg: 7 }}
            className={css({ hideBelow: 'lg' })}
          >
            <img
              src="/illus/tools.png"
              alt=""
              className={css({
                display: 'block',
                w: '3/4',
                mx: 'auto',
              })}
            />
          </GridItem>
        </Grid>
      </Container>
      <div className={css({ hideFrom: 'lg', mt: 8 })}>
        <ToolCarousel />
      </div>
    </section>
  );
};

export { Team };
