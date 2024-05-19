import React from 'react';

import {
  defer,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import { ClientCarousel } from '~/components/ClientCarousel';
import {
  Aligned,
  Better,
  Contact,
  Faster,
  Hero,
  Stories,
  Stronger,
  Tools,
} from '~/components/homepage';
import i18nServer from '~/localization/i18n.server';
import { fetchStories } from '~/modules/utils.server';
import { getLang } from '~/utils/lang';
import { redirectWithLocale } from '~/utils/redirections';

export async function loader(args: LoaderFunctionArgs) {
  redirectWithLocale(args);
  const t = await i18nServer.getFixedT(getLang(args.params), 'home');

  const files = await fetchStories();

  const stories = files
    .map((item) => ({
      ...item,
      quote:
        item.frontmatter.quotes[
          Math.floor(Math.random() * item.frontmatter.quotes.length)
        ],
    }))
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return defer({
    title: t('meta.title'),
    description: t('meta.description'),
    stories,
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: 'description', content: data?.description },
  ];
};

export default function Index() {
  const { stories } = useLoaderData<typeof loader>();
  return (
    <div>
      <Hero />
      <ClientCarousel shouldDisplayTitle />
      <React.Suspense fallback={<div>loading...</div>}>
        <Await resolve={stories}>
          {(stories) => (
            <Stories
              items={stories.map((story) => ({
                id: story.slug,
                slug: story.slug,
                speaker: story.frontmatter.speaker,
                role: story.frontmatter.role,
                name: story.frontmatter.name,
                quote: story.quote,
              }))}
            />
          )}
        </Await>
      </React.Suspense>
      <Faster />
      <Better />
      <Aligned />
      <Stronger />
      <Tools />
      <Contact />
    </div>
  );
}
