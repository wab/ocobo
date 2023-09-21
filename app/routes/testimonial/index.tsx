import { json } from '@remix-run/node';
// import type { MetaFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';

import * as leeway from './leeway/index.mdx';
import * as qare from './qare/index.mdx';
import type { Testimonial } from '~/utils/parsers';
import { testimonialFromModule } from '~/utils/parsers';
import { AiFillFunnelPlot } from 'react-icons/ai';
import { FiTag } from 'react-icons/fi';
import { Tag } from '~/components/Tag';

export async function loader() {
  return json({
    title: 'Ocobo • Ils nous ont fait confiance',
    description:
      "Ocobo Le Nouvel Ops, c'est le média qui accompagne les Business Ops d'aujourd'hui et de demain. L’idée ? Vous éclairer sur diverses thématiques en vous partageant des articles sur les tendances du marché, les méthodologies, les bonnes pratiques & benchmarks qui gravitent autour de notre passionnant métier",
    coverImage: 'https://ocobo.co/cover.png',
    posts: [testimonialFromModule(qare), testimonialFromModule(leeway)],
  });
}

const Item: React.FunctionComponent<Testimonial> = ({
  slug,
  title,
  guest,
  position,
  scope,
  tags,
}) => {
  return (
    <li>
      <NavLink
        to={slug}
        className="group block rounded-md border-[1px] border-solid border-light border-opacity-50 no-underline transition-colors hover:bg-light hover:bg-opacity-20"
      >
        <div className="flex items-center gap-4 p-4">
          <div>
            <span className="mb-1 block text-lg font-bold transition-colors group-hover:text-coral">
              {title}
            </span>
            <div className="mb-2 italic">
              {guest} • {position}
            </div>
            <div className="mb-2 flex items-start gap-2">
              <span>
                <AiFillFunnelPlot className="text-coral" />
              </span>
              <ul className="not-prose m-0 flex list-none flex-wrap gap-1 p-0 leading-none">
                {scope.map((sc, i) => (
                  <li key={sc} className="flex gap-1">
                    {sc}
                    {i < scope.length - 1 && <span className="text-coral">•</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start gap-2">
              <span>
                <FiTag className="text-coral" />
              </span>
              <ul className="not-prose m-0 flex list-none flex-wrap gap-1 p-0 leading-none">
                {tags.map((tag: string) => (
                  <li key={tag} className="flex gap-1">
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="prose pt-8">
      <h1 className="font-title font-normal">Ils nous ont fait confiance</h1>

      <ol className="list-none space-y-4 p-0">
        {posts.map((post) => (
          <Item key={post.slug} {...post} />
        ))}
      </ol>
    </div>
  );
}
