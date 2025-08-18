import { Outlet } from 'react-router';

import { Grid, GridItem } from '@ocobo/styled-system/jsx';

import { LayoutMain } from '~/components/LayoutMain';
import { Container } from '~/components/ui/Container';
import { ScrollProgressBar } from '~/components/ui/ScrollProgressBar';

export default function Index() {
  return (
    <LayoutMain>
      <ScrollProgressBar />
      <Container isMobileFullWidth>
        <Grid columns={{ base: 1, lg: 6 }}>
          <GridItem colSpan={4}>
            <Outlet />
          </GridItem>
        </Grid>
      </Container>
    </LayoutMain>
  );
}
