import { type NavLinkProps, useLocation } from '@remix-run/react';

function useLocalizedPathname() {
  const { pathname } = useLocation();

  return (path: NavLinkProps['to']) => {
    const lang = pathname.split('/')[1];
    return `/${lang}${path === '/' ? '' : path}`;
  };
}

export { useLocalizedPathname };
