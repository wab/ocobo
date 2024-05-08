import * as React from 'react';

import { NavLink } from '@remix-run/react';
import { MenuIcon, X } from 'lucide-react';

import { css, cx } from '@ocobo/styled-system/css';
import { flex } from '@ocobo/styled-system/patterns';
import { icon } from '@ocobo/styled-system/recipes';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';

import { MainMenu } from './MainMenu';
import { useMobileMenuContext } from './MobileMenu';
import { Container } from './ui/Container';
import { IconButton } from './ui/IconButton';

type ScrollState = 'at-top' | 'scrolling-up' | 'scrolling-down';

const Header: React.FunctionComponent<{ ghost?: boolean }> = ({ ghost }) => {
  const mobileMenu = useMobileMenuContext();
  const getLocalizedPath = useLocalizedPathname();

  const [scrollState, setScrollState] = React.useState<ScrollState>('at-top');

  React.useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const direction =
        previousScrollY < window.scrollY ? 'scrolling-down' : 'scrolling-up';
      const state = window.scrollY < 30 ? 'at-top' : direction;
      previousScrollY = window.scrollY;
      setScrollState(state);
    };

    if (ghost) {
      addEventListener('scroll', handleScroll, { passive: true });
    } else {
      removeEventListener('scroll', handleScroll);
    }
    handleScroll();
    return () => removeEventListener('scroll', handleScroll);
  }, [ghost]);

  return (
    <div
      data-scroll-state={scrollState}
      data-mobile-menu-open={mobileMenu.open}
      className={cx(
        css({
          height: 'var(--main-header-height)',
          '&[data-scroll-state="scrolling-down"] .header-inner': {
            transitionDuration: '30ms, 120ms',
          },
          '&:not(.ghost[data-scroll-state="at-top"]) > .header-inner': {
            bg: 'background',
            borderColor: 'dark',
          },
        }),
        ghost ? 'ghost' : '',
      )}
    >
      <div
        className={cx(
          'header-inner',
          css({
            borderBottom: 'thin',
            borderColor: 'transparent',
            minWidth: '320px',
            position: 'fixed',
            height: 'inherit',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '2',
            userSelect: 'none',
            boxShadow: '0 1px transparent',
            transition: 'background-color 180ms, box-shadow 180ms',
          }),
        )}
      >
        <Container isMobileFullWidth className={css({ height: 'full' })}>
          <div
            className={flex({
              alignItems: 'center',
              gap: '6',
              height: 'full',
            })}
          >
            <NavLink to={getLocalizedPath('/')}>
              <img
                src="/logo-ocobo.png"
                alt="Ocobo"
                className={css({
                  display: 'block',
                  height: '46px',
                  translateY: '-5px',
                })}
              />
            </NavLink>
            <MainMenu />
            <div
              className={css({
                hideFrom: 'lg',
                position: 'absolute',
                top: '0',
                right: '0',
                display: 'flex',
                alignItems: 'center',
                height: 'full',
                padding: '6',
              })}
            >
              <IconButton
                data-state={mobileMenu.open ? 'open' : 'closed'}
                onClick={() => mobileMenu.setOpen((open) => !open)}
              >
                {mobileMenu.open ? (
                  <X className={icon({ size: 'lg' })} />
                ) : (
                  <MenuIcon className={icon({ size: 'lg' })} />
                )}
              </IconButton>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export { Header };
