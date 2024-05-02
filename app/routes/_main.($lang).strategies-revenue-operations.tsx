import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';

import { Choose, Hero, Method, Needs, Team } from '~/components/strategy';
import i18nServer from '~/localization/i18n.server';
import { getLang } from '~/utils/lang';

export async function loader({ params }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(getLang(params), 'strategy');
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
      <Needs />
      <Method />
      <Team />
      <Choose />
    </div>
  );
}
