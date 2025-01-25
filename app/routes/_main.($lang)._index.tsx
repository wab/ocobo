import * as React from 'react';

import {
  type LoaderFunctionArgs,
  type MetaFunction,
  defer,
} from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';

import { css } from '@ocobo/styled-system/css';

import { ClientCarousel } from '~/components/ClientCarousel';
import {
  Aligned,
  Better,
  Contact,
  Faster,
  Hero,
  Stories,
  Stronger,
  Tools,
} from '~/components/homepage';
import { Loader } from '~/components/ui/Loader';
import i18nServer from '~/localization/i18n.server';
import { fetchStories } from '~/modules/utils.server';
import type { MarkdocFile, StoryFrontmatter } from '~/types';
import { getLang } from '~/utils/lang';
import { getMetaTags } from '~/utils/metatags';
import { redirectWithLocale } from '~/utils/redirections';
import { getImageOgFullPath } from '~/utils/url';

export async function loader(args: LoaderFunctionArgs) {
  await redirectWithLocale(args);
  const t = await i18nServer.getFixedT(getLang(args.params), 'home');
  const url = new URL(args.request.url);
  const refresh = url.searchParams.has('refresh');

  const cacheControl = refresh
    ? 'no-cache, no-store, must-revalidate'
    : 'public, max-age=7200, s-maxage=7200';

  const stories = fetchStories(refresh).then(([status, state, data]) => {
    if (status !== 200 || !data) {
      throw new Error(`Failed to fetch stories: ${state}`);
    }

    return (data as MarkdocFile<StoryFrontmatter>[])
      .sort((a, b) => {
        return (
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
        );
      })
      .map((item: MarkdocFile<StoryFrontmatter>) => ({
        id: item.slug,
        slug: item.slug,
        speaker: item.frontmatter.speaker,
        role: item.frontmatter.role,
        name: item.frontmatter.name,
        quote:
          item.frontmatter.quotes[
            Math.floor(Math.random() * item.frontmatter.quotes.length)
          ],
      }));
  });

  return defer(
    {
      title: t('meta.title'),
      description: t('meta.description'),
      stories,
      ogImageSrc: getImageOgFullPath('homepage', args.request.url),
    },
    {
      headers: {
        'Cache-Control': cacheControl,
        Vary: 'Accept-Encoding, Accept, X-Requested-With',
      },
    },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return [];
  }
  return getMetaTags({
    title: data.title,
    description: data.description,
    image: data.ogImageSrc,
    locale: getLang(params),
  });
};

export default function Index() {
  const { stories } = useLoaderData<typeof loader>();

  return (
    <div>
      <Hero />
      <ClientCarousel shouldDisplayTitle />
      <Stories.Section>
        <ClientOnly>
          {() => (
            <React.Suspense
              fallback={
                <Loader
                  className={css({
                    h: 'full',
                    translateY: '50px',
                  })}
                />
              }
            >
              <Await resolve={stories}>
                {(stories) => <Stories.Inner items={stories} />}
              </Await>
            </React.Suspense>
          )}
        </ClientOnly>
      </Stories.Section>
      <Faster />
      <Better />
      <Aligned />
      <Stronger />
      <Tools />
      <Contact />
    </div>
  );
}
