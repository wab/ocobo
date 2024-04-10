import { NavLink, useLocation, type NavLinkProps } from '@remix-run/react';

const LocalizedLink: React.FunctionComponent<NavLinkProps> = ({
  to,
  ...props
}) => {
  const { pathname } = useLocation();

  const getLocalizedPath = (path: NavLinkProps['to']) => {
    const lang = pathname.split('/')[1];
    return `/${lang}${path === '/' ? '' : path}`;
  };

  return <NavLink to={getLocalizedPath(to)} {...props} />;
};

LocalizedLink.displayName = 'LocalizedLink';
LocalizedLink.propTypes = NavLink.propTypes;

export { LocalizedLink };
