import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { square } from '@ocobo/styled-system/patterns';
import { section } from '@ocobo/styled-system/recipes';

import { Container } from '../ui/Container';

const teamImages = [
  {
    src: '/team/benjamin.jpeg',
    alt: 'Benjamin Boileux',
  },
  {
    src: '/team/aude.jpeg',
    alt: 'Aude Cadiot',
  },
  {
    src: '/team/corentin.jpeg',
    alt: 'Corentin Guérin',
  },
];

const Team = () => {
  const { t } = useTranslation('strategy');

  const team = [
    {
      title: t('team.items.0.title'),
      description: t('team.items.0.description'),
    },
    {
      title: t('team.items.1.title'),
      description: t('team.items.1.description'),
    },
    {
      title: t('team.items.2.title'),
      description: t('team.items.2.description'),
    },
  ];

  return (
    <section
      className={cx(
        section(),
        css({
          position: 'relative',
        }),
      )}
    >
      <div
        className={css({
          position: 'absolute',
          bg: 'dark',
          h: { base: 'full', lg: '300px' },
          w: 'full',
          bottom: 0,
        })}
      />
      <Container>
        <h2
          className={css({
            textAlign: 'center',
            textStyle: 'heading1',
            maxW: { base: 'full', lg: '1/2' },
            mx: 'auto',
            color: { base: 'white', lg: 'inherit' },
          })}
        >
          {t('team.title')}
        </h2>

        <div
          className={cx(
            section(),
            css({
              maxW: { base: 'full', lg: '5/6' },
              mx: 'auto',
              position: 'relative',
              mt: '16',
            }),
          )}
        >
          <Grid
            columns={{ base: 1, lg: 3 }}
            alignItems="stretch"
            gap={{ base: '100px', lg: '2rem' }}
          >
            {Array.isArray(team) &&
              team.map((item, index) => {
                return (
                  <GridItem key={index}>
                    <div
                      className={css({
                        bg: 'yellow.light',
                        p: '1.2em',
                        pt: '90px',
                        textAlign: 'center',
                        h: 'full',
                        position: 'relative',
                      })}
                    >
                      <img
                        src={teamImages[index]['src']}
                        alt={teamImages[index]['alt']}
                        className={cx(
                          square({ size: 130 }),
                          css({
                            display: 'block',
                            borderLeft: 'thick',
                            borderColor: 'yellow',
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            translateX: '-50%',
                            translateY: '-50%',
                            boxSizing: 'content-box',
                          }),
                        )}
                      />
                      <p
                        className={css({
                          textStyle: 'large',
                          fontWeight: 'bold',
                          mb: '4',
                        })}
                      >
                        {item.title}
                      </p>
                      <p className={css({})}>{item.description}</p>
                    </div>
                  </GridItem>
                );
              })}
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export { Team };
