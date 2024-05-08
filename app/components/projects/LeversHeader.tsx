import { Trans, useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const LeversHeader = () => {
  const { t } = useTranslation('projects');

  const title = t('levers.title');

  return (
    <div
      className={cx(
        section(),
        css({
          position: 'relative',
          _before: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '60%',
            right: 0,
            bottom: 0,
            bg: 'sky.light',
            hideBelow: 'lg',
          },
        }),
      )}
    >
      <Container isMobileFullWidth>
        <header>
          <Grid columns={{ base: 1, lg: 12 }} alignItems="center">
            <GridItem
              className={css({
                hideBelow: 'lg',
              })}
            />
            <GridItem
              colSpan={{ base: 1, lg: 4 }}
              className={css({
                textAlign: { base: 'center', lg: 'left' },
              })}
            >
              <h2
                className={css({
                  textStyle: 'heading1',
                })}
              >
                <Trans
                  i18nKey={title}
                  components={[
                    <span
                      key="small"
                      className={css({
                        textStyle: 'heading3',
                        fontWeight: 'bold',
                        display: 'block',
                        pr: { base: 0, lg: 4 },
                      })}
                    />,
                  ]}
                />
              </h2>
            </GridItem>
            <GridItem
              className={css({
                hideBelow: 'lg',
              })}
            />
            <GridItem
              colSpan={{ base: 1, lg: 5 }}
              className={css({
                hideBelow: 'lg',
              })}
            >
              <Illustration name="strategy_hero" />
            </GridItem>
          </Grid>
        </header>
      </Container>
    </div>
  );
};

export { LeversHeader };
