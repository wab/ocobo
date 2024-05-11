import * as React from 'react';

import { defer, redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import { token } from '@ocobo/styled-system/tokens';

import { StoryArticle } from '~/components/stories';
import { Container } from '~/components/ui/Container';
import { fetchStory } from '~/modules/utils.server';

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

  const [status, state, article] = await fetchStory(slug);

  if (status !== 200 || !article) {
    throw Error(`Error (${status}) ${state}: Failed to fetch blog articles.`);
  }

  return defer(
    { article },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export default function Index() {
  const { article } = useLoaderData<typeof loader>();

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--scroll-progress-bar-color',
      token('colors.mint'),
    );

    return () => {
      document.documentElement.style.removeProperty(
        '--scroll-progress-bar-color',
      );
    };
  }, []);

  return (
    <Container>
      <React.Suspense fallback={<div>loading...</div>}>
        <Await resolve={article}>
          {(article) => <StoryArticle article={article} />}
        </Await>
      </React.Suspense>
    </Container>
  );
}
