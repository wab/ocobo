import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';
import { Outlet, useNavigation } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { LayoutMain } from '~/components/LayoutMain';

export default function Index() {
  const navigation = useNavigation();
  return (
    <HubspotProvider>
      <LayoutMain>
        <div
          className={
            navigation.state === 'loading'
              ? css({
                  opacity: '0.25',
                  transition: 'opacity 200ms',
                  transitionDelay: '200ms',
                })
              : ''
          }
        >
          <Outlet />
        </div>
      </LayoutMain>
    </HubspotProvider>
  );
}
