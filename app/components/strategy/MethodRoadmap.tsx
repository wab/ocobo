import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { section, subtitle } from '@ocobo/styled-system/recipes';

import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const MethodRoadmap = () => {
  const { t } = useTranslation('strategy');

  const roadmap = [
    {
      title: t('method.roadmap.items.0.title'),
      description: t('method.roadmap.items.0.description'),
    },
    {
      title: t('method.roadmap.items.1.title'),
      description: t('method.roadmap.items.1.description'),
    },
  ];

  return (
    <div className={css({ borderBottom: 'thin', borderColor: 'dark' })}>
      <Container>
        <div
          className={cx(
            section(),
            css({
              maxW: { base: 'full', lg: '5/6' },
              mx: 'auto',
              position: 'relative',
            }),
          )}
        >
          <h3
            className={cx(
              subtitle(),
              css({
                position: 'absolute',
                top: 0,
                left: 0,
                translateY: '-50%',
              }),
            )}
          >
            {t('method.roadmap.title')}
          </h3>
          <div
            className={css({
              position: 'absolute',
              top: 0,
              right: 0,
              w: '100px',
              translateY: '-50%',
              hideFrom: 'lg',
            })}
          >
            <Illustration name="strategy_roadmap" />
          </div>

          <Grid
            columns={{ base: 1, lg: 10 }}
            alignItems="stretch"
            rowGap={{ base: 4, lg: 24 }}
          >
            <GridItem colSpan={{ base: 1, lg: 4 }}>
              <p
                className={css({
                  bleft: 'yellow',
                  textStyle: 'large',
                  fontWeight: 'bold',
                })}
              >
                {t('method.roadmap.subtitle')}
              </p>
              <div
                className={css({
                  maxWidth: '5/6',
                  mx: 'auto',
                  mt: 8,
                  hideBelow: 'lg',
                })}
              >
                <Illustration name="strategy_roadmap" />
              </div>
            </GridItem>
            <GridItem className={css({ hideBelow: 'lg' })} />
            <GridItem
              colSpan={{ base: 1, lg: 4 }}
              className={css({ hideBelow: 'lg' })}
            >
              {Array.isArray(roadmap) &&
                roadmap.map((item, index) => {
                  return (
                    <div
                      key={`desktop-${index}`}
                      className={css({
                        mb: 8,
                      })}
                    >
                      <p
                        className={css({
                          textStyle: 'large',
                          fontWeight: 'bold',
                          pb: '4',
                          borderBottom: 'thin',
                          borderColor: 'yellow',
                        })}
                      >
                        {item.title}
                      </p>
                      <p className={css({})}>{item.description}</p>
                    </div>
                  );
                })}
            </GridItem>
            <ul
              className={css({
                hideFrom: 'lg',
                bleft: 'transparent',
                listStyleType: 'disc',
                listStylePosition: 'outside',
              })}
            >
              {Array.isArray(roadmap) &&
                roadmap.map((item, index) => {
                  return <li key={`mobile-${index}`}>{item.title}</li>;
                })}
            </ul>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export { MethodRoadmap };
