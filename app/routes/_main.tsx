import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, redirect } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { MainMobileMenu } from '~/components/MainMobileMenu';
import { MobileMenuProvider } from '~/components/MobileMenu';

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
    <MobileMenuProvider>
      <MainMobileMenu />
      <div
        className={css({
          color: 'foreground',
          bg: 'background',
          textStyle: 'medium',
        })}
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    </MobileMenuProvider>
  );
}
