import { Outlet } from '@remix-run/react';

import { LayoutMain } from '~/components/LayoutMain';

export default function Index() {
  return (
    <LayoutMain>
      <Outlet />
    </LayoutMain>
  );
}
