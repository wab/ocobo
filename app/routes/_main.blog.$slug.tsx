import * as React from 'react';

import { defer, redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { BlogArticle } from '~/components/blog';
import { Container } from '~/components/ui/Container';
import { ScrollProgressBar } from '~/components/ui/ScrollProgressBar';
import { fetchBlogPost } from '~/modules/utils.server';

const redirects: Record<string, string | undefined> = {
  'legacy-slug': 'new-slug',
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    // we know we can't render the component
    // so throw immediately to stop executing code
    // and show the not found page
    throw new Response('Not Found', { status: 404 });
  }

  if (Object.keys(redirects).includes(slug)) {
    const newSlug = redirects[slug];
    if (newSlug) {
      return redirect(`/clients/${newSlug}`);
    }
  }
  const article = await fetchBlogPost(slug);

  return defer(
    { article },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export default function Index() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div
      className={css({
        position: 'relative',
      })}
    >
      <ScrollProgressBar variant="sky" />
      <Container>
        <BlogArticle article={article} />
      </Container>
    </div>
  );
}
