import * as React from 'react';

import { type LoaderFunctionArgs, type MetaFunction } from 'react-router';
import { Await, useLoaderData } from 'react-router';
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
import { fetchStories } from '~/modules/content';
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

  const _cacheControl = refresh
    ? 'no-cache, no-store, must-revalidate'
    : 'public, max-age=7200, s-maxage=7200';

  const stories = fetchStories()
    .then(([status, state, data]) => {
      // Handle errors gracefully - return empty array instead of throwing
      if (status !== 200 || !data) {
        console.error(`Failed to fetch stories: ${state}`);
        return []; // Return empty array so the page still renders
      }

      // Use a more efficient shuffle algorithm (Fisher-Yates)
      const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };

      return shuffleArray(data as MarkdocFile<StoryFrontmatter>[]).map(
        (item: MarkdocFile<StoryFrontmatter>) => {
          // Pre-select a random quote to avoid multiple random calls
          const randomQuoteIndex = Math.floor(
            Math.random() * item.frontmatter.quotes.length,
          );
          return {
            id: item.slug,
            slug: item.slug,
            speaker: item.frontmatter.speaker,
            role: item.frontmatter.role,
            name: item.frontmatter.name,
            quote: item.frontmatter.quotes[randomQuoteIndex],
          };
        },
      );
    })
    .catch((error) => {
      // Additional error handling in case of unexpected errors
      console.error('Unexpected error fetching stories:', error);
      return []; // Return empty array so the page still renders
    });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    stories,
    ogImageSrc: getImageOgFullPath('homepage', args.request.url),
  };
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
