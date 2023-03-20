import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { clsx } from 'clsx';
import { PostCard } from '~/components/PostCard';

import * as post1 from './1.mdx';
import * as post2 from './2.mdx';
import * as post3 from './3.mdx';
import * as post4 from './4.mdx';
import * as post5 from './5.mdx';
import * as post6 from './6.mdx';

function postFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    card: {
      ...mod.attributes.meta,
      tags: mod.attributes.tags.split(', '),
    },
  };
}

export async function loader() {
  return json({
    title: 'Ocobo • le Nouvel Ops',
    description:
      "Ocobo Le Nouvel Ops, c'est le média qui accompagne les Business Ops d'aujourd'hui et de demain. L’idée ? Vous éclairer sur diverses thématiques en vous partageant des articles sur les tendances du marché, les méthodologies, les bonnes pratiques & benchmarks qui gravitent autour de notre passionnant métier",
    coverImage: 'https://ocobo.co/cover.png',
    posts: [
      postFromModule(post6),
      postFromModule(post5),
      postFromModule(post4),
      postFromModule(post3),
      postFromModule(post2),
      postFromModule(post1),
    ],
  });
}

export const meta: MetaFunction = ({ data, location }) => ({
  title: data.title,
  description: data.description,
  'twitter:card': 'summary_large_image',
  'og:title': data.title,
  'og:type': 'article',
  'og:url': `https://ocobo.co${location.pathname}`,
  'og:description': data.description,
  'og:image': data.coverImage,
});

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="not-prose min-h-screen">
      <ul className="grid gap-8 desktop:grid-cols-2">
        {posts.map((post, index) => (
          <li
            key={post.slug}
            className={clsx(
              index === 0 ? 'col-span-2' : 'col-span-1',
              'group overflow-hidden rounded-md bg-white shadow-lg dark:text-dark'
            )}
          >
            <NavLink to={post.slug} className="block">
              <PostCard {...post.card} isHightlighted={index === 0} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
