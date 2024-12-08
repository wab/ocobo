import * as React from 'react';

import { type LoaderFunctionArgs, MetaFunction, defer } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { ClientCarousel } from '~/components/ClientCarousel';
import { Hero, StoryList } from '~/components/stories';
import { Container } from '~/components/ui/Container';
import { Loader } from '~/components/ui/Loader';
import { fetchStories } from '~/modules/utils.server';
import { getMetaTags } from '~/utils/metatags';
import { getImageOgFullPath } from '~/utils/url';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag');

  const storiesPromise = fetchStories();

  const stories = storiesPromise.then((data) =>
    data
      .filter((entry) => !tag || entry.frontmatter.tags.includes(tag))
      .sort((a, b) => {
        return (
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
        );
      }),
  );

  return defer(
    {
      stories,
      ogImageSrc: getImageOgFullPath('clients', request.url),
    },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [];
  }
  return getMetaTags({
    title: 'Témoignages clients',
    description:
      "Découvrez les témoignages, et les retours d'expérience des clients de l'agence.",
    locale: 'fr',
    image: data.ogImageSrc,
  });
};

export default function Index() {
  const { stories } = useLoaderData<typeof loader>();

  return (
    <div>
      <Hero />
      <ClientCarousel />
      <Container>
        <React.Suspense fallback={<Loader className={css({ h: '300px' })} />}>
          <Await resolve={stories}>
            {(stories) => <StoryList items={stories} />}
          </Await>
        </React.Suspense>
      </Container>
    </div>
  );
}
