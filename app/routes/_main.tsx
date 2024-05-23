import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';
import { SerializeFrom, json } from '@remix-run/node';
import { Outlet, useNavigation } from '@remix-run/react';
import { ExternalScriptsHandle } from 'remix-utils/external-scripts';

import { css } from '@ocobo/styled-system/css';

import { Error } from '~/components/Error';
import { LayoutMain } from '~/components/LayoutMain';
import { contactFormId } from '~/utils/hubspot';

export function ErrorBoundary() {
  return (
    <LayoutMain>
      <Error.Container>
        <Error.Message />
      </Error.Container>
    </LayoutMain>
  );
}

export async function loader() {
  const isProduction = process.env.NODE_ENV === 'production';

  return json({
    isProduction,
    shouldLoadScript:
      isProduction || process.env.SHOULD_LOAD_TRACKING_SCRIPTS === 'true',
  });
}

export const handle: ExternalScriptsHandle<SerializeFrom<typeof loader>> = {
  scripts({ data }) {
    if (data.shouldLoadScript) {
      return [
        {
          src: 'https://tag.clearbitscripts.com/v1/pk_38c2f75e7330f98606d3fda7c9686cc9/tags.js',
          referrerPolicy: 'strict-origin-when-cross-origin',
        },
        // {
        //   src: 'https://app.distro.so/inbound.js',
        //   referrerPolicy: 'strict-origin-when-cross-origin',
        // },
        {
          type: 'text/javascript',
          id: 'hs-script-loader-2',
          async: true,
          defer: true,
          src: '//js-eu1.hs-scripts.com/27107933.js',
        },
        // {
        //   type: 'text/javascript',
        //   dangerouslySetInnerHTML: {
        //     __html: `
        //         window.distro = new Distro({ routerId: '9' })
        //         distro.schedule('hsForm_${contactFormId}')
        //       `,
        //   },
        // },
      ];
    }

    return [];
  },
};

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
