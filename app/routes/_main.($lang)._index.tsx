import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { useTranslation } from 'react-i18next';

import { LocalizedLink } from '~/components/LocalizedLink';
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
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <h1>{t('hero.title', { ns: 'home' })}</h1>
        <p>
          <strong>{t('hero.subtitle', { ns: 'home' })}</strong>
        </p>
        <p>{t('hero.description', { ns: 'home' })}</p>
        <LocalizedLink to="/contact">
          {t('hero.cta', { ns: 'home' })}
        </LocalizedLink>
      </div>
    </div>
  );
}
