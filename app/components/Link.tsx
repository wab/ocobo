import { Link } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';

export const NavLink: React.FunctionComponent<LinkProps> = ({ children, ...props }) => (
  <Link
    className="flex cursor-pointer items-center gap-1 underline-offset-1 transition-colors duration-300 ease-in-out hover:text-coral"
    {...props}
  >
    {children}
  </Link>
);

export const AnchorLink: React.FunctionComponent<React.HTMLProps<HTMLAnchorElement>> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="flex cursor-pointer items-center gap-1 underline-offset-1 transition-colors duration-300 ease-in-out hover:text-coral"
  >
    {children}
  </a>
);
