import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/node';

import { ClientCarousel } from '~/components/ClientCarousel';
import { Hero, Levers, Team } from '~/components/projects';
import { Contact } from '~/components/projects/Contact';
import i18nServer from '~/localization/i18n.server';
import { getLang } from '~/utils/lang';
import { getMetaTags } from '~/utils/metatags';
import { redirectWithLocale } from '~/utils/redirections';
import { getImageOgFullPath } from '~/utils/url';

export async function loader(args: LoaderFunctionArgs) {
  await redirectWithLocale(args);
  const t = await i18nServer.getFixedT(getLang(args.params), 'projects');
  return json({
    title: t('meta.title'),
    description: t('meta.description'),
    ogImageSrc: getImageOgFullPath('revops', args.request.url),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return [];
  }
  return getMetaTags({
    title: data.title,
    description: data.description,
    locale: getLang(params),
    image: data.ogImageSrc,
  });
};

export default function Index() {
  return (
    <div>
      <Hero />
      <ClientCarousel shouldDisplayTitle />
      <Levers />
      <Team />
      <Contact />
    </div>
  );
}
