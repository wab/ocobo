import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from '@remix-run/node';

import { Choose, Hero, Method, Needs, Team } from '~/components/strategy';
import i18nServer from '~/localization/i18n.server';
import { getLang } from '~/utils/lang';
import { getMetaTags } from '~/utils/metatags';
import { redirectWithLocale } from '~/utils/redirections';
import { getImageOgFullPath } from '~/utils/url';

export async function loader(args: LoaderFunctionArgs) {
  await redirectWithLocale(args);
  const t = await i18nServer.getFixedT(getLang(args.params), 'strategy');
  return json({
    title: t('meta.title'),
    description: t('meta.description'),
    ogImageSrc: getImageOgFullPath('strategy', args.request.url),
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
      <Needs />
      <Method />
      <Team />
      <Choose />
    </div>
  );
}
