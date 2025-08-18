import * as React from 'react';

import { type LoaderFunctionArgs, MetaFunction } from 'react-router';
import { Await, useLoaderData } from 'react-router';

import { css } from '@ocobo/styled-system/css';

import { BlogList } from '~/components/blog';
import { Container } from '~/components/ui/Container';
import { Loader } from '~/components/ui/Loader';
import { fetchBlogPosts } from '~/modules/utils.server';
import { getMetaTags } from '~/utils/metatags';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag');
  const refresh = searchParams.has('refresh');

  const cacheControl = refresh
    ? 'no-cache, no-store, must-revalidate'
    : 'public, max-age=7200, s-maxage=7200';

  const posts = fetchBlogPosts(refresh).then(([status, state, data]) => {
    if (status !== 200 || !data) {
      throw new Error(`Failed to fetch blog posts: ${state}`);
    }

    // Pre-filter and sort efficiently
    const filteredPosts = tag
      ? data.filter((entry) => entry.frontmatter.tags.includes(tag))
      : data;

    // Cache date objects to avoid repeated parsing
    return filteredPosts
      .map((entry) => ({
        ...entry,
        _sortDate: new Date(entry.frontmatter.date).getTime(),
      }))
      .sort((a, b) => b._sortDate - a._sortDate)
      .map(({ _sortDate, ...entry }) => entry); // Remove the sort helper
  });

  return {
    posts,
    headers: {
      'Cache-Control': cacheControl,
      Vary: 'Accept-Encoding, Accept, X-Requested-With',
    },
  };
}

export const meta: MetaFunction<typeof loader> = () => {
  return getMetaTags({
    title: 'Le blog des Revenue Operations',
    description:
      "Le blog d'Ocobo éclaire les leaders Revenue et les équipes RevOps avec des ressources sur les tendances et les meilleures pratiques du marché.",
  });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div>
      <Container>
        <React.Suspense fallback={<Loader className={css({ h: '75vh' })} />}>
          <Await resolve={posts}>{(posts) => <BlogList items={posts} />}</Await>
        </React.Suspense>
      </Container>
    </div>
  );
}
