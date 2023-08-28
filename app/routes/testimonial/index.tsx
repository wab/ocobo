import { json } from '@remix-run/node';
// import type { MetaFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';

import * as leeway from './leeway.mdx';
import type { Testimonial } from '~/utils/parsers';
import { testimonialFromModule } from '~/utils/parsers';

export async function loader() {
  return json({
    title: 'Ocobo • Ils nous ont fait confiance',
    description:
      "Ocobo Le Nouvel Ops, c'est le média qui accompagne les Business Ops d'aujourd'hui et de demain. L’idée ? Vous éclairer sur diverses thématiques en vous partageant des articles sur les tendances du marché, les méthodologies, les bonnes pratiques & benchmarks qui gravitent autour de notre passionnant métier",
    coverImage: 'https://ocobo.co/cover.png',
    posts: [testimonialFromModule(leeway)],
  });
}

const Item: React.FunctionComponent<Testimonial> = ({ slug, title, logo, guest, position }) => (
  <li>
    <NavLink
      to={slug}
      className="group block rounded-md border-[1px] border-solid border-light border-opacity-50 no-underline transition-colors hover:bg-light hover:bg-opacity-20"
    >
      <div className="flex h-28 items-center gap-4 px-4">
        <img src={logo} alt={title} className="h-12 w-12 rounded-md" />
        <div>
          <span className="block text-lg font-bold transition-colors group-hover:text-coral">
            {title}
          </span>
          <span className="italic">
            {guest} • {position}
          </span>
        </div>
      </div>
    </NavLink>
  </li>
);

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="pt-8">
      <h1 className="font-title font-normal">Ils nous ont fait confiance</h1>

      <ol className="list-none p-0">
        {posts.map((post) => (
          <Item key={post.slug} {...post} />
        ))}
      </ol>
    </div>
  );
}
