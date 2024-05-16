import * as React from 'react';

import { defer, type LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import { ClientCarousel } from '~/components/ClientCarousel';
import { Hero, StoryList } from '~/components/stories';
import { fetchStories } from '~/modules/utils.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag');

  const files = await fetchStories();

  const entries = files
    .filter((entry) => !tag || entry.frontmatter.tags.includes(tag))
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return defer(
    { entries },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export default function Index() {
  const { entries } = useLoaderData<typeof loader>();

  return (
    <div>
      <Hero />
      <ClientCarousel />

      <React.Suspense fallback={<div>loading...</div>}>
        <Await resolve={entries}>
          {(entries) => <StoryList items={entries} />}
        </Await>
      </React.Suspense>
    </div>
  );
}
