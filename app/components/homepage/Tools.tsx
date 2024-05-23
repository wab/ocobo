import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { ToolCarousel } from '../ToolCarousel';
import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const Tools = () => {
  const { t } = useTranslation('home');

  return (
    <section
      className={cx(
        css({
          bgImage: { base: 'url(/illus/asterix.svg)', lg: 'none' },
          bgRepeat: 'no-repeat',
          bgSize: '80px',
          bgPosition: 'calc(100% + 20px) -10px',
        }),
        section(),
      )}
    >
      <Container>
        <Grid
          columns={{ base: 1, lg: 12 }}
          alignItems="center"
          className={css({
            pt: '4',
          })}
        >
          <GridItem colSpan={{ base: 1, lg: 5 }}>
            <h2 className={css({ textStyle: 'heading1', bleft: 'coral' })}>
              {t('tools.title')}
            </h2>
            <p className={css({ textStyle: 'medium' })}>
              {t('tools.description')}
            </p>
          </GridItem>
          <GridItem className={css({ hideBelow: 'lg' })} />
          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            className={css({ hideBelow: 'lg' })}
          >
            <Illustration name="tools" extension="png" alt="" />
          </GridItem>
        </Grid>
      </Container>

      <div className={css({ hideFrom: 'lg', mt: 8 })}>
        <ToolCarousel />
      </div>
    </section>
  );
};

export { Tools };
