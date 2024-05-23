import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { container } from '@ocobo/styled-system/patterns';
import { section } from '@ocobo/styled-system/recipes';

import { ContactForm } from '../ContactForm';

const Contact = () => {
  const { t } = useTranslation(['home', 'contact']);

  return (
    <section>
      <div
        className={cx(
          container({
            maxWidth: {
              base: 'full',
              lg: 'desktop',
              '2xl': 'xlarge',
            },
            px: { base: '0', lg: '8' },
          }),
        )}
      >
        <div
          className={css({
            bg: 'coral.light',
            borderTop: 'thin',
            borderColor: 'dark',
            px: { base: '1.5em', lg: 16 },
          })}
        >
          <Grid columns={{ base: 1, lg: 12 }} className={cx(section())}>
            <GridItem className={css({ hideBelow: 'xl' })} />
            <GridItem colSpan={{ base: 1, lg: 6, xl: 5 }}>
              <div
                className={css({
                  textAlign: { base: 'center', lg: 'left' },
                  maxWidth: { base: '4/5', lg: 'full' },
                  mx: 'auto',
                })}
              >
                <h2
                  className={css({
                    textStyle: 'heading1',
                    bleft: { base: 'none', lg: ' coral' },
                    mb: 6,
                  })}
                >
                  {t('contact.title')}
                </h2>
                <div className={css({ pr: { base: 0, lg: 12 } })}>
                  <p className={css({ textStyle: 'large' })}>
                    {t('contact.subtitle')}
                  </p>
                  <p className={css({ textStyle: 'medium' })}>
                    {t('contact.description')}
                  </p>
                </div>
              </div>
            </GridItem>

            <GridItem colSpan={{ base: 1, lg: 5, xl: 4 }}>
              <ContactForm />
            </GridItem>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export { Contact };
