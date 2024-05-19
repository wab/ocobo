import { MetaFunction, json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { BlogList } from '~/components/blog';
import { Container } from '~/components/ui/Container';
import { fetchBlogPosts } from '~/modules/utils.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.get('tag');

  const files = await fetchBlogPosts();

  const posts = files
    .filter((entry) => !tag || entry.frontmatter.tags.includes(tag))
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return json(
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
        <BlogList items={posts} />
      </Container>
    </div>
  );
}
