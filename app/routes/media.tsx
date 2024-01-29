import { Outlet } from '@remix-run/react';
import { FiHome } from 'react-icons/fi';
import { ImNewspaper } from 'react-icons/im';

import { Logo } from '~/components/Logo';
import { ToggleTheme } from '~/components/ToggleTheme';
import { Footer } from '~/components/Footer';

import { NavLink } from '~/components/Link';

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap',
    },
    {
      rel: 'icon',
      href: '/favicon-blog.png',
      type: 'image/png',
    },
  ];
}

export default function MediaIndex() {
  // comment
  return (
    <>
      <div className="relative px-6 transition-colors duration-150 ease-in-out">
        <nav className="mx-auto max-w-[65ch] pt-4 desktop:flex">
          <NavLink to="/media" className="mr-auto h-[40px] dark:text-light dark:hover:text-coral">
            <Logo width={100} />
            <span className="pt-2 font-blog text-xl leading-none">le Nouvel Ops</span>
          </NavLink>
          <ul className="flex h-[40px] items-center gap-3 pt-2 text-sm">
            <li className="leading-none">
              <NavLink to="/media">
                <ImNewspaper /> Accueil
              </NavLink>
            </li>
            <li className="leading-none">
              <NavLink to="/">
                <FiHome /> ocobo.co
              </NavLink>
            </li>
            <li className="leading-none">
              <ToggleTheme />
            </li>
          </ul>
        </nav>
        <div className="lg:prose-2xl prose mx-auto py-10 dark:prose-invert prose-a:text-coral">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
