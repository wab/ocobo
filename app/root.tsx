import * as React from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import clsx from 'clsx';
import * as gtag from '~/utils/gtags.client';
import { ThemeProvider, useTheme } from '~/utils/theme-provider';
import { gdprConsent } from '~/utils/cookies';
import { CookieBanner } from '~/components/CookieBanner';

import styles from './styles/app.css';

export function links() {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: true.toString(),
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap',
    },

    { rel: 'stylesheet', href: styles },
    {
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/png',
    },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};

  if (formData.get('accept-gdpr') === 'true') {
    cookie.gdprConsent = true;
  }

  if (formData.get('accept-gdpr') === 'false') {
    cookie.gdprConsent = false;
  }

  return redirect(request.headers.get('Referer') ?? '?', {
    headers: {
      'Set-Cookie': await gdprConsent.serialize(cookie),
    },
  });
}

// Load the GA tracking id from the .env
export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};
  return json({
    gaTrackingId: process.env.GA_TRACKING_ID,
    showGdprBanner: cookie.gdprConsent === undefined,
    cookieConsent: cookie.gdprConsent,
    ENV: {
      HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    },
  });
}

function App() {
  const [theme] = useTheme();
  const location = useLocation();
  const { gaTrackingId, showGdprBanner, cookieConsent, ENV } = useLoaderData<typeof loader>();

  React.useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  const isTrackingEnabled = process.env.NODE_ENV === 'production' && Boolean(cookieConsent);

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          src="https://tag.clearbitscripts.com/v1/pk_38c2f75e7330f98606d3fda7c9686cc9/tags.js"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </head>
      <body className="relative dark:bg-dark">
        {isTrackingEnabled ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        ) : null}
        <CookieBanner isVisible={showGdprBanner} />
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
