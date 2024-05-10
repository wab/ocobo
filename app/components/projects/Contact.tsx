import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { ContactForm } from '../ContactForm';
import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const Contact = () => {
  const { t } = useTranslation('projects');

  return (
    <section
      className={cx(
        section(),
        css({
          bg: { base: 'sky.light', lg: 'transparent' },
          pb: { base: '4', lg: 0 },
        }),
      )}
    >
      <Container isMobileFullWidth>
        <Grid columns={{ base: 6, lg: 12 }}>
          <GridItem
            colStart={{ base: 2, lg: 2 }}
            colEnd={{ base: 6, lg: 6 }}
            className={css({
              textAlign: { base: 'center', lg: 'left' },
            })}
          >
            <h2
              className={css({
                textStyle: { base: 'heading1', lg: 'heading2' },
                bleft: { base: 'none', lg: 'sky' },
              })}
            >
              {t('contact.title')}
            </h2>
            <p className={css({ textStyle: 'medium', mb: '4' })}>
              {t('contact.description')}
            </p>
            <Illustration
              name="projects_contact"
              className={css({
                hideBelow: 'lg',
                maxWidth: '4/5',
                translate: '95px',
              })}
            />
          </GridItem>
          <GridItem
            colStart={{ base: 1, lg: 6 }}
            colEnd={{ base: 7, lg: 12 }}
            className={css({
              bg: 'sky.light',
            })}
          >
            <div
              className={css({
                px: { base: 0, lg: '16' },
                py: { base: 4, lg: '12' },
              })}
            >
              <ContactForm />
            </div>
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
};

export { Contact };
