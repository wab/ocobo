import { MetaFunction, json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { StoryArticle } from '~/components/stories';
import { Container } from '~/components/ui/Container';
import { ScrollProgressBar } from '~/components/ui/ScrollProgressBar';
import { fetchStory } from '~/modules/utils.server';
import { getLang } from '~/utils/lang';
import { getMetaTags } from '~/utils/metatags';

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    // we know we can't render the component
    // so throw immediately to stop executing code
    // and show the not found page
    throw new Response('Not Found', { status: 404 });
  }

  const article = await fetchStory(slug);

  return json(
    { article },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  return getMetaTags({
    title: data?.article.frontmatter.title,
    description: data?.article.frontmatter.subtitle,
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
      <ScrollProgressBar variant="mint" />
      <Container>
        <StoryArticle article={article} />
      </Container>
    </div>
  );
}
