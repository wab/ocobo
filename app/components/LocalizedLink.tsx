import { NavLink, type NavLinkProps } from '@remix-run/react';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';

const LocalizedLink: React.FunctionComponent<NavLinkProps> = ({
  to,
  ...props
}) => {
  const getLocalizedPath = useLocalizedPathname();

  return <NavLink to={getLocalizedPath(to)} {...props} />;
};

LocalizedLink.displayName = 'LocalizedLink';
LocalizedLink.propTypes = NavLink.propTypes;

export { LocalizedLink };
