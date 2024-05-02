import { Trans, useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { subtitle } from '@ocobo/styled-system/recipes';

import { Card } from '../ui/Card';
import { Carousel, CarouselItem } from '../ui/Carousel';
import { Container } from '../ui/Container';

const MethodEvaluation = () => {
  const { t } = useTranslation('strategy');

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
                  <>
                    <GridItem
                      colSpan={4}
                      key={index}
                      className={css({ hideBelow: 'lg' })}
                    >
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
                  </>
                );
              })}
          </Grid>
        </div>
      </Container>
      <div
        className={css({
          //pl: 12,
        })}
      >
        {Array.isArray(evaluation) && (
          <Carousel
            shouldDisplayDots
            className={css({ hideFrom: 'lg' })}
            items={evaluation}
            renderItem={({ item, isSnapPoint }) => (
              <CarouselItem key={item.title} isSnapPoint={isSnapPoint}>
                <div
                  className={css({
                    textStyle: 'heading2',
                    p: '0.5em 1.5rem 0.5em 1.5rem',
                    ml: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    bg: 'white',
                    borderLeft: 'thick',
                    borderColor: 'yellow',
                    width: '240px',
                    height: '140px',
                  })}
                >
                  {item.title}
                </div>
              </CarouselItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

export { MethodEvaluation };
