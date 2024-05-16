import { css } from '@ocobo/styled-system/css';

import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { MainMobileMenu } from '~/components/MainMobileMenu';
import { MobileMenuProvider } from '~/components/MobileMenu';

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
        {children}
        <Footer />
      </div>
    </MobileMenuProvider>
  );
};

export { LayoutMain };
