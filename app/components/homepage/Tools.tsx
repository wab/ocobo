import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { container, flex } from '@ocobo/styled-system/patterns';
import { section } from '@ocobo/styled-system/recipes';

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
      <Grid
        columns={{ base: 1, lg: 12 }}
        alignItems="center"
        className={container({
          maxWidth: { base: 'mobile', lg: 'desktop' },
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
          <img src="/illus/homepage_tools.png" alt="" />
        </GridItem>
      </Grid>
      <ul
        className={flex({
          w: 'full',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: '8',
          hideFrom: 'lg',
        })}
      >
        <li>
          <img src="/logos/qobra.png" alt="Qobra" />
        </li>
        <li>
          <img src="/logos/tableau.png" alt="Tableau" />
        </li>
        <li>
          <img src="/logos/intercom.png" alt="Intercom" />
        </li>
        <li>
          <img src="/logos/make.png" alt="Make" />
        </li>
      </ul>
    </section>
  );
};

export { Tools };
