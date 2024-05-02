import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { section } from '@ocobo/styled-system/recipes';

import { Carousel, CarouselItem } from '../ui/Carousel';
import { Container } from '../ui/Container';

const items = [
  {
    src: '/logos/qobra.png',
    title: 'Qobra',
  },
  {
    src: '/logos/tableau.png',
    title: 'Tableau',
  },
  {
    src: '/logos/intercom.png',
    title: 'Intercom',
  },
  {
    src: '/logos/make.png',
    title: 'Make',
  },
  {
    src: '/logos/chargebee.png',
    title: 'Chargebee',
  },
  {
    src: '/logos/hubspot.png',
    title: 'Hubspot',
  },
  {
    src: '/logos/salesforce.png',
    title: 'salesforce',
  },
  {
    src: '/logos/lemlist.png',
    title: 'lemlist',
  },
  {
    src: '/logos/pipedrive.png',
    title: 'pipedrive',
  },
  {
    src: '/logos/planhat.png',
    title: 'planhat',
  },
  {
    src: '/logos/zendesk.png',
    title: 'zendesk',
  },
];

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
            <img src="/illus/homepage_tools.png" alt="" />
          </GridItem>
        </Grid>
      </Container>

      <Carousel
        className={css({ hideFrom: 'lg', mt: 8 })}
        items={items}
        renderItem={({ item, isSnapPoint }) => (
          <CarouselItem key={item.src} isSnapPoint={isSnapPoint}>
            <img
              src={item.src}
              className={css({
                maxHeight: 50,
                maxWidth: 150,
              })}
              alt={item.title}
            />
          </CarouselItem>
        )}
      />
    </section>
  );
};

export { Tools };
