import * as React from 'react';

import { css } from '@ocobo/styled-system/css';

import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { MainMobileMenu } from '~/components/MainMobileMenu';
import { MobileMenuProvider } from '~/components/MobileMenu';

import { Loader } from './ui/Loader';

const LayoutMain: React.FunctionComponent<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
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
        <React.Suspense fallback={<Loader className={css({ h: '300px' })} />}>
          {children}
        </React.Suspense>

        <Footer />
      </div>
    </MobileMenuProvider>
  );
};

export { LayoutMain };
