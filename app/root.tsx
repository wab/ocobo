import { SpeedInsights } from '@vercel/speed-insights/react';
import { useTranslation } from 'react-i18next';
import { type LinksFunction, type LoaderFunctionArgs } from 'react-router';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';
import {
  ExternalScripts,
  type ExternalScriptsHandle,
} from 'remix-utils/external-scripts';

import styles from '~/index.css?url';
import { getLang } from '~/utils/lang';

import { ErrorMessage } from './components/ErrorMessage';
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

export async function loader({ params }: LoaderFunctionArgs) {
  const locale = getLang(params);
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    locale,
    isProduction,
    gaTrackingId: process.env.GA_TRACKING_ID,
    shouldLoadScript:
      isProduction || process.env.SHOULD_LOAD_TRACKING_SCRIPTS === 'true',
  };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

interface AppHandle extends ExternalScriptsHandle<LoaderData> {
  i18n: string[];
}

export const handle: AppHandle = {
  i18n: ['common'],
  scripts({ data }) {
    if (data?.shouldLoadScript) {
      return [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${data?.gaTrackingId}`,
        },
        {
          src: 'https://tag.clearbitscripts.com/v1/pk_38c2f75e7330f98606d3fda7c9686cc9/tags.js',
        },
        {
          src: '//js-eu1.hs-scripts.com/27107933.js',
          async: true,
          defer: true,
          id: 'hs-script-loader',
        },
      ];
    }
    return [];
  },
};

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
          <script
            async
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${loaderData?.gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <ExternalScripts />
        <Scripts />
        <SpeedInsights />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return <ErrorMessage />;
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  // change the language of the instance to the locale detected by the loader
  useChangeLanguage(locale);
  useSetViewportHeight();
  return <Outlet />;
}
