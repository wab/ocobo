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
import { createHybridLoader } from '~/modules/cache';
import { fetchStories } from '~/modules/content';
import type { MarkdocFile, StoryFrontmatter } from '~/types';
import { getLang } from '~/utils/lang';
import { getMetaTags } from '~/utils/metatags';
import { redirectWithLocale } from '~/utils/redirections';
import { getImageOgFullPath } from '~/utils/url';

export const loader = createHybridLoader(
  async (args: LoaderFunctionArgs) => {
    await redirectWithLocale(args);
    const t = await i18nServer.getFixedT(getLang(args.params), 'home');

    const [status, state, storiesData] = await fetchStories();

    // Handle errors gracefully
    if (status !== 200 || !storiesData) {
      console.error(`Failed to fetch stories: ${state}`);
      return {
        title: t('meta.title'),
        description: t('meta.description'),
        stories: [],
        ogImageSrc: getImageOgFullPath('homepage', args.request.url),
      };
    }

    // Use Fisher-Yates shuffle algorithm
    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const stories = shuffleArray(
      storiesData as MarkdocFile<StoryFrontmatter>[],
    ).map((item: MarkdocFile<StoryFrontmatter>) => {
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
    });

    return {
      title: t('meta.title'),
      description: t('meta.description'),
      stories,
      ogImageSrc: getImageOgFullPath('homepage', args.request.url),
    };
  },
  'story', // Use story cache strategy
);

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
