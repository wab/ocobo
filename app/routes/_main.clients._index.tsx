import * as React from 'react';

import { type LoaderFunctionArgs, MetaFunction } from 'react-router';
import { Await, useLoaderData } from 'react-router';

import { css } from '@ocobo/styled-system/css';

import { ClientCarousel } from '~/components/ClientCarousel';
import { Hero, StoryList } from '~/components/stories';
import { Container } from '~/components/ui/Container';
import { Loader } from '~/components/ui/Loader';
import { fetchStories } from '~/modules/utils.server';
import type { MarkdocFile, StoryFrontmatter } from '~/types';
import { getMetaTags } from '~/utils/metatags';
import { getImageOgFullPath } from '~/utils/url';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag');
  const refresh = searchParams.has('refresh');

  const cacheControl = refresh
    ? 'no-cache, no-store, must-revalidate'
    : 'public, max-age=7200, s-maxage=7200';

  const stories = fetchStories(refresh).then(([status, state, data]) => {
    if (status !== 200 || !data) {
      throw new Error(`Failed to fetch stories: ${state}`);
    }

    const entries = data as MarkdocFile<StoryFrontmatter>[];

    // Pre-filter and sort efficiently
    const filteredEntries = tag
      ? entries.filter((entry) => entry.frontmatter.tags.includes(tag))
      : entries;

    // Cache date objects to avoid repeated parsing
    return filteredEntries
      .map((entry) => ({
        ...entry,
        _sortDate: new Date(entry.frontmatter.date).getTime(),
      }))
      .sort((a, b) => b._sortDate - a._sortDate)
      .map(({ _sortDate, ...entry }) => entry); // Remove the sort helper
  });

  return {
    stories,
    ogImageSrc: getImageOgFullPath('clients', request.url),
    headers: {
      'Cache-Control': cacheControl,
      Vary: 'Accept-Encoding, Accept, X-Requested-With',
    },
  };
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
