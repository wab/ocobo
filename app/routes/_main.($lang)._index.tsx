import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';

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
import i18nServer from '~/localization/i18n.server';
import { getLang } from '~/utils/lang';

export async function loader({ params }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(getLang(params), 'home');
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
      <Stories />
      <Faster />
      <Better />
      <Aligned />
      <Stronger />
      <Tools />
      <Contact />
    </div>
  );
}
