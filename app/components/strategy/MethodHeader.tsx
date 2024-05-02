import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';

import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const MethodHeader = () => {
  const { t } = useTranslation('strategy');

  return (
    <header>
      <Container>
        <Grid columns={{ base: 1, lg: 12 }} alignItems="center">
          <GridItem colSpan={{ base: 1, lg: 1 }}>
            <Illustration
              name="strategy_method"
              alt=""
              className={css({
                hideFrom: 'lg',
                maxW: '1/2',
                mx: 'auto',
              })}
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 7 }}>
            <h2
              className={css({
                textStyle: 'heading1',
                textAlign: { base: 'center', lg: 'left' },
              })}
            >
              {t('method.title')}
            </h2>
          </GridItem>
          <GridItem
            colSpan={{ base: 1, lg: 4 }}
            className={css({
              hideBelow: 'lg',
            })}
          >
            <Illustration name="strategy_method" alt="" />
          </GridItem>
        </Grid>
      </Container>
    </header>
  );
};

export { MethodHeader };
