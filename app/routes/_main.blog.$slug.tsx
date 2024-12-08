import { type LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { BlogArticle } from '~/components/blog';
import { Container } from '~/components/ui/Container';
import { ScrollProgressBar } from '~/components/ui/ScrollProgressBar';
import { fetchBlogPost } from '~/modules/utils.server';
import { getLang } from '~/utils/lang';
import { getMetaTags } from '~/utils/metatags';

export const handle = {
  scripts: () => [{ src: 'https://player.ausha.co/ausha-player.js' }],
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    // we know we can't render the component
    // so throw immediately to stop executing code
    // and show the not found page
    throw new Response('Not Found', { status: 404 });
  }

  const article = await fetchBlogPost(slug);

  return json(
    { article },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  return getMetaTags({
    title: data?.article.frontmatter.title,
    description: data?.article.frontmatter.description,
    image: data?.article.frontmatter.image,
    locale: getLang(params),
  });
};

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
