import * as React from 'react';

import { MetaFunction, defer, type LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { BlogList } from '~/components/blog';
import { Container } from '~/components/ui/Container';
import { Loader } from '~/components/ui/Loader';
import { fetchBlogPosts } from '~/modules/utils.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag');

  const postsPromise = fetchBlogPosts();

  const posts = postsPromise.then((data) =>
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
    { posts },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export const meta: MetaFunction<typeof loader> = () => {
  return [
    { title: 'Blog' },
    { name: 'description', content: 'Découvrez les articles de notre blog' },
  ];
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
