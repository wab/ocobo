import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';

import { css } from 'styled-system/css';
import { Footer } from '~/components/Footer';
import { Navigation } from '~/components/Navigation';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (!params.lang) {
    return redirect(`/fr${pathname === '/' ? '' : pathname}`, 301);
  }
  return { status: 200 };
}

export default function Index() {
  return (
    <div className={css({ px: '4' })}>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}
