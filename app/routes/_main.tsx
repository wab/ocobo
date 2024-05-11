import { Outlet } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { MainMobileMenu } from '~/components/MainMobileMenu';
import { MobileMenuProvider } from '~/components/MobileMenu';

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
