import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { NavLink, useLoaderData } from '@remix-run/react';

import { postFromModule, type Post } from '~/utils/parsers';

import * as post1 from './media.1.mdx';
import * as post2 from './media.2.mdx';
import * as post3 from './media.3.mdx';
import * as post4 from './media.4.mdx';
import * as post5 from './media.5.mdx';
import * as post6 from './media.6.mdx';
import * as post7 from './media.7.mdx';
import * as post8 from './media.8.mdx';
import * as post9 from './media.9.mdx';
import * as post10 from './media.10.mdx';
import * as post11 from './media.11.mdx';

import { FiCalendar, FiPenTool } from 'react-icons/fi';
import { Tag } from '~/components/Tag';

export async function loader() {
  return json({
    title: 'Ocobo • le Nouvel Ops',
    description:
      "Ocobo Le Nouvel Ops, c'est le média qui accompagne les Business Ops d'aujourd'hui et de demain. L’idée ? Vous éclairer sur diverses thématiques en vous partageant des articles sur les tendances du marché, les méthodologies, les bonnes pratiques & benchmarks qui gravitent autour de notre passionnant métier",
    coverImage: 'https://ocobo.co/cover.png',
    posts: [
      postFromModule(post11),
      postFromModule(post10),
      postFromModule(post9),
      postFromModule(post8),
      postFromModule(post7),
      postFromModule(post6),
      postFromModule(post5),
      postFromModule(post4),
      postFromModule(post3),
      postFromModule(post2),
      postFromModule(post1),
    ],
  });
}

const Item: React.FunctionComponent<Post> = ({ slug, card }) => {
  return (
    <li className="group overflow-hidden rounded-md bg-white shadow-lg dark:text-dark">
      <NavLink to={slug} className="block">
        <div className="overflow-hidden desktop:h-[420px]">
          <img
            src={card.coverImage}
            alt=""
            className="object-cover transition-transform duration-150 group-hover:rotate-1 group-hover:scale-110"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-2 p-4 ">
          <p className="mb-2 font-blog text-3xl font-bold transition-colors duration-150 group-hover:text-coral">
            {card.title}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FiPenTool />
            {card.author}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FiCalendar />
            Publié le {new Date(card.date).toLocaleDateString('fr')}
          </p>
          <ul className="flex gap-1">
            {card.tags.map((tag: string) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          {card.description ? (
            <p className="text-sm italic leading-relaxed">{card.description}</p>
          ) : null}
        </div>
      </NavLink>
    </li>
  );
};

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return [
    { title: data?.title },
    { name: 'description', content: data?.description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: data?.title },
    { name: 'og:type', content: 'article' },
    { name: 'og:url', content: `https://ocobo.co${location.pathname}` },
    { name: 'og:description', content: data?.description },
    { name: 'og:image', content: data?.coverImage },
  ];
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="not-prose min-h-screen">
      <ul className="grid gap-8">
        {posts.map((post) => (
          <Item key={post.slug} {...post} />
        ))}
      </ul>
    </div>
  );
}
