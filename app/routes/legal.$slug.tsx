import {
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { PageMarkdownContainer } from '~/components/PageMarkdownContainer';
import { fetchPage } from '~/modules/utils.server';
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

  if (slug === 'politique-confidentialite') {
    throw redirect('/legal/confidentialite', 301);
  }

  const page = await fetchPage('legal', slug);

  return json(
    { page },
    { headers: { 'cache-control': 'public, max-age=7200' } },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  return getMetaTags({
    title: data?.page.frontmatter.title,
    description: data?.page.frontmatter.description,
    locale: getLang(params),
  });
};

export default function Index() {
  const { page } = useLoaderData<typeof loader>();
  return (
    <article
      className={css({
        padding: '2rem 0',
      })}
    >
      <PageMarkdownContainer content={page.content} />
    </article>
  );
}
