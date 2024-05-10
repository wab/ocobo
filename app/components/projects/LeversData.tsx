import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { subtitle } from '@ocobo/styled-system/recipes';

import { Card } from './Card';
import { SubSection } from './SubSection';

import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const LeversData = () => {
  const { t } = useTranslation('projects');

  const items = t('levers.data.items', { returnObjects: true });

  return (
    <SubSection.Root>
      <Container isMobileFullWidth>
        <Grid columns={{ base: 1, lg: 12 }}>
          <GridItem colStart={{ base: 1, lg: 3 }} colEnd={8}>
            <SubSection.Title className={subtitle()}>
              {t('levers.data.title')}
            </SubSection.Title>
          </GridItem>
        </Grid>
        <Grid columns={{ base: 1, lg: 12 }} alignItems="stretch">
          <GridItem
            colSpan={2}
            className={css({
              hideBelow: 'lg',
            })}
          />

          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <GridItem>
              <Card.Root>
                <Card.List>
                  {Array.isArray(items) &&
                    items.map((item, i) => (
                      <li key={`team-items-${i}`}>{item}</li>
                    ))}
                </Card.List>
              </Card.Root>
            </GridItem>
          </GridItem>
          <GridItem colSpan={1} />
          <GridItem
            colSpan={{ base: 1, lg: 3 }}
            className={css({
              hideBelow: 'lg',
            })}
          >
            <Illustration name="projects_levers_data" className={css({})} />
          </GridItem>
        </Grid>
      </Container>
    </SubSection.Root>
  );
};

export { LeversData };
