import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';

import { css, cx } from '@ocobo/styled-system/css';
import { typography } from '@ocobo/styled-system/recipes';

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
    <div
      className={cx(
        typography(),
        css({
          color: 'text',
          bg: 'background',
        }),
      )}
    >
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}
