import { json } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';

import * as leeway from './testimonial.leeway.mdx';
import * as qare from './testimonial.qare.mdx';
import * as qobra from './testimonial.qobra.mdx';
import * as steeple from './testimonial.steeple.mdx';
import type { Testimonial } from '~/utils/parsers';
import { testimonialFromModule } from '~/utils/parsers';
import { AiFillFunnelPlot } from 'react-icons/ai';
import { FiTag } from 'react-icons/fi';
import { Tag } from '~/components/Tag';

export async function loader() {
  return json({
    title: 'Ocobo • Ils nous font confiance',
    description:
      "Ocobo Le Nouvel Ops, c'est le média qui accompagne les Business Ops d'aujourd'hui et de demain. L’idée ? Vous éclairer sur diverses thématiques en vous partageant des articles sur les tendances du marché, les méthodologies, les bonnes pratiques & benchmarks qui gravitent autour de notre passionnant métier",
    coverImage: 'https://www.ocobo.co/cover.png',
    posts: [
      testimonialFromModule(steeple),
      testimonialFromModule(qobra),
      testimonialFromModule(qare),
      testimonialFromModule(leeway),
    ],
  });
}

const Item: React.FunctionComponent<Testimonial> = ({
  slug,
  title,
  logo,
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
            <img src={logo} alt={title} className="my-2 h-10" />
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
      <h1 className="font-title font-normal">Ils nous font confiance</h1>

      <ol className="list-none space-y-4 p-0">
        {posts.map((post) => (
          <Item key={post.slug} {...post} />
        ))}
      </ol>
    </div>
  );
}
