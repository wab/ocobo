import * as React from 'react';

import { NavLink, type NavLinkProps } from '@remix-run/react';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';

const LocalizedLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, to, ...props }, ref) => {
    const getLocalizedPath = useLocalizedPathname();
    return (
      <NavLink ref={ref} to={getLocalizedPath(to)} {...props}>
        {children}
      </NavLink>
    );
  },
);

LocalizedLink.displayName = 'LocalizedLink';

export { LocalizedLink };
