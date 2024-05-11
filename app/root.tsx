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

export const handle = { i18n: ['common', 'home', 'strategy', 'projects'] };

export async function loader({ params }: LoaderFunctionArgs) {
  const locale = getLang(params);

  return json({ locale, env: process.env.VERCEL_ENV });
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
        {loaderData?.env !== 'production' && (
          <meta name="robots" content="noindex" />
        )}
        <Meta />
        <Links />
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

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  // change the language of the instance to the locale detected by the loader
  useChangeLanguage(locale);
  useSetViewportHeight();
  return <Outlet />;
}
