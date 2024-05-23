import { type LoaderFunctionArgs, json, LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from '@remix-run/react';
import { SpeedInsights } from '@vercel/speed-insights/remix';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next/react';

import styles from '~/index.css?url';
import { getLang } from '~/utils/lang';

import { Error } from './components/Error';
import { useSetViewportHeight } from './hooks/useSetViewportHeight';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: 'apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export const handle = { i18n: ['common'] };

export async function loader({ params }: LoaderFunctionArgs) {
  const locale = getLang(params);
  const isProduction = process.env.NODE_ENV === 'production';

  return json({
    locale,
    isProduction,
    shouldLoadScript:
      isProduction || process.env.SHOULD_LOAD_TRACKING_SCRIPTS === 'true',
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  // Get the locale from the loader
  const loaderData = useRouteLoaderData<typeof loader>('root');
  const { i18n } = useTranslation();

  return (
    <html lang={loaderData?.locale ?? 'fr'} dir={i18n.dir()} translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!loaderData?.isProduction && <meta name="robots" content="noindex" />}
        <Meta />
        <Links />

        {loaderData?.shouldLoadScript && (
          <>
            <script
              src="https://tag.clearbitscripts.com/v1/pk_38c2f75e7330f98606d3fda7c9686cc9/tags.js"
              referrerPolicy="strict-origin-when-cross-origin"
            />

            <script
              type="text/javascript"
              id="hs-script-loader-2"
              async
              defer
              src="//js-eu1.hs-scripts.com/27107933.js"
            />
          </>
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <Error.Container>
      <Error.Message />
    </Error.Container>
  );
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  // change the language of the instance to the locale detected by the loader
  useChangeLanguage(locale);
  useSetViewportHeight();
  return <Outlet />;
}
