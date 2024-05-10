import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';

import { ClientCarousel } from '~/components/ClientCarousel';
import { Hero, Levers, Team } from '~/components/projects';
import { Contact } from '~/components/projects/Contact';
import i18nServer from '~/localization/i18n.server';
import { getLang } from '~/utils/lang';
import { redirectWithLocale } from '~/utils/redirections';

export async function loader(args: LoaderFunctionArgs) {
  redirectWithLocale(args);
  const t = await i18nServer.getFixedT(getLang(args.params), 'projects');
  return json({
    title: t('meta.title'),
    description: t('meta.description'),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: 'description', content: data?.description },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
      <ClientCarousel />
      <Levers />
      <Team />
      <Contact />
    </div>
  );
}
