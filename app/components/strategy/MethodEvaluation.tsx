import * as React from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { useSnapCarousel } from 'react-snap-carousel';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { carousel, carouselItem } from '@ocobo/styled-system/patterns';
import { subtitle } from '@ocobo/styled-system/recipes';

import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { DotPagination } from '../ui/DotPagination';

const MethodEvaluation = () => {
  const { t } = useTranslation('strategy');

  const { scrollRef, snapPointIndexes, pages, activePageIndex, goTo } =
    useSnapCarousel();

  const evaluation = [
    {
      title: t('method.evaluation.items.0.title'),
      description: t('method.evaluation.items.0.description'),
    },
    {
      title: t('method.evaluation.items.1.title'),
      description: t('method.evaluation.items.1.description'),
    },
    {
      title: t('method.evaluation.items.2.title'),
      description: t('method.evaluation.items.2.description'),
    },
    {
      title: t('method.evaluation.items.3.title'),
      description: t('method.evaluation.items.3.description'),
    },
  ];

  return (
    <div>
      <Container>
        <div
          className={css({
            maxW: { base: 'full', lg: '5/6' },
            mx: 'auto',
            mt: 16,
          })}
        >
          <Grid
            columns={{ base: 1, lg: 10 }}
            alignItems="stretch"
            rowGap={{ base: 8, lg: 24 }}
          >
            <GridItem colSpan={4}>
              <h3 className={subtitle()}>{t('method.evaluation.title')}</h3>
              <p
                className={css({
                  bleft: 'yellow',
                  textStyle: 'large',
                  fontWeight: 'bold',
                })}
              >
                {t('method.evaluation.subtitle')}
              </p>
            </GridItem>
            <GridItem />
            <GridItem colSpan={5}>
              <p className={css({})}>
                <Trans
                  i18nKey="method.evaluation.description"
                  components={[<strong key="strong" />]}
                  ns="strategy"
                />
              </p>
            </GridItem>

            {Array.isArray(evaluation) &&
              evaluation.map((item, index) => {
                const isOdd = Boolean((index + 1) % 2);
                return (
                  <React.Fragment key={`evaluation-${index}`}>
                    <GridItem colSpan={4} className={css({ hideBelow: 'lg' })}>
                      <Card.Root className={css({ h: 'full' })}>
                        <Card.Title
                          className={css({
                            textStyle: 'heading3',
                            height: { base: '6em', lg: 'auto' },
                            borderBottomWidth: { base: '0', lg: 'thin' },
                          })}
                        >
                          {item.title}
                        </Card.Title>
                        <Card.Content
                          className={css({
                            hideBelow: 'lg',
                          })}
                        >
                          {item.description}
                        </Card.Content>
                      </Card.Root>
                    </GridItem>
                    {isOdd && <GridItem />}
                  </React.Fragment>
                );
              })}
          </Grid>
        </div>
      </Container>
      <div className={css({ hideFrom: 'lg' })}>
        <ul
          ref={scrollRef}
          className={carousel({
            alignItems: 'stretch',
          })}
        >
          {evaluation.map((item, i) => (
            <li
              key={`evaluation-mobile-${i}`}
              className={carouselItem({
                shouldScrollSnapAlignStart: snapPointIndexes.has(i),
                width: '240px',
                _first: {
                  ml: '4',
                },
                _last: {
                  mr: '4',
                },
              })}
            >
              <div
                className={css({
                  textStyle: 'heading3',
                  p: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  bg: 'white',
                  borderLeft: 'thick',
                  borderColor: 'yellow',
                  height: 'full',
                })}
              >
                {item.title}
              </div>
            </li>
          ))}
        </ul>
        <DotPagination
          pageCount={pages.length}
          activePageIndex={activePageIndex}
          goTo={goTo}
          className={css({
            color: 'yellow',
          })}
        />
      </div>
    </div>
  );
};

export { MethodEvaluation };
