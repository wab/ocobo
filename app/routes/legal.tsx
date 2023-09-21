import { Outlet } from '@remix-run/react';

import { Footer } from '~/components/Footer';
import { Navbar } from '~/components/Navbar';

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
  return (
    <div className="relative">
      <Navbar />
      <div className="relative px-6 text-dark desktop:pt-28">
        <div className="lg:prose-2xl prose mx-auto py-10 dark:prose-invert prose-a:text-coral">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
