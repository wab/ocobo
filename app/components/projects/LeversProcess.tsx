import { useTranslation } from 'react-i18next';
import { useSnapCarousel } from 'react-snap-carousel';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { carousel, carouselItem } from '@ocobo/styled-system/patterns';
import { subtitle } from '@ocobo/styled-system/recipes';

import { Card } from './Card';
import { SubSection } from './SubSection';

import { Container } from '../ui/Container';
import { DotPagination } from '../ui/DotPagination';
import { Illustration } from '../ui/Illustration';

const LeversProcess = () => {
  const { t } = useTranslation('projects');
  const { scrollRef, snapPointIndexes, pages, activePageIndex, goTo } =
    useSnapCarousel();

  const items = [
    {
      title: t('levers.process.items.0.title'),
      subItems: t('levers.process.items.0.items', { returnObjects: true }),
    },
    {
      title: t('levers.process.items.1.title'),
      description: t('levers.process.items.1.description'),
      subItems: t('levers.process.items.1.items', { returnObjects: true }),
    },
  ];

  return (
    <SubSection.Root>
      <Container isMobileFullWidth>
        <Grid columns={{ base: 1, lg: 12 }}>
          <GridItem colStart={{ base: 1, lg: 5 }} colEnd={8}>
            <SubSection.Title className={subtitle()}>
              {t('levers.process.title')}
            </SubSection.Title>
          </GridItem>
        </Grid>
        <Grid
          columns={{ base: 1, lg: 12 }}
          alignItems="stretch"
          className={css({
            hideBelow: 'lg',
          })}
        >
          <GridItem colSpan={{ base: 1, lg: 4 }}>
            <Illustration
              name="strategy_hero"
              className={css({
                maxWidth: '2/3',
              })}
            />
          </GridItem>
          {items.map((item, i) => (
            <GridItem key={`team-items-${i}`} colSpan={{ base: 1, lg: 3 }}>
              <Card.Root>
                <Card.Title>{item.title}</Card.Title>
                {item.description && (
                  <p
                    className={css({
                      textStyle: 'small',
                      mb: 0,
                    })}
                  >
                    {item.description}
                  </p>
                )}
                <Card.List>
                  {Array.isArray(item.subItems) &&
                    item.subItems.map((subItem, j) => (
                      <li key={`team-items-${i}-${j}`}>{subItem}</li>
                    ))}
                </Card.List>
              </Card.Root>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <div className={css({ hideFrom: 'lg' })}>
        <ul
          ref={scrollRef}
          className={carousel({
            alignItems: 'stretch',
            gap: 0,
          })}
        >
          {items.map((item, i) => (
            <li
              key={`evaluation-mobile-${i}`}
              className={carouselItem({
                shouldScrollSnapAlignStart: snapPointIndexes.has(i),
                ml: 4,
                _last: {
                  mr: 4,
                },
              })}
            >
              <Card.Root>
                <Card.Title>{item.title}</Card.Title>
                <Card.List>
                  {Array.isArray(item.subItems) &&
                    item.subItems.map((subItem, j) => (
                      <li key={`team-items-${i}-${j}`}>{subItem}</li>
                    ))}
                </Card.List>
              </Card.Root>
            </li>
          ))}
        </ul>
        <DotPagination
          pageCount={pages.length}
          activePageIndex={activePageIndex}
          goTo={goTo}
          className={css({
            color: 'sky',
          })}
        />
      </div>
    </SubSection.Root>
  );
};

export { LeversProcess };
