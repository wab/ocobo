import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { container, grid, gridItem } from '@ocobo/styled-system/patterns';
import { button, typography } from '@ocobo/styled-system/recipes';

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
    <div className={container()}>
      <div
        className={grid({
          columns: 12,
          gap: '4',
          gridTemplateRows: '[800px]',
          alignItems: 'center',
        })}
      >
        <div className={gridItem({ colSpan: 6 })}>
          <h1 className={typography({ variant: 'heading1' })}>
            {t('hero.title', { ns: 'home' })}
          </h1>
          <div
            className={css({
              pr: '36',
              mt: '4',
            })}
          >
            <p className={typography({ variant: 'heading3' })}>
              {t('hero.subtitle', { ns: 'home' })}
            </p>
            <p>{t('hero.description', { ns: 'home' })}</p>
            <p>
              <LocalizedLink to="/contact" className={button()}>
                {t('contact.cta', { ns: 'common' })}
              </LocalizedLink>
            </p>
          </div>
        </div>
        <div className={gridItem({ colStart: 8, colEnd: 13 })}>
          <img src="/illus/homepage_hero.svg" alt="" />
        </div>
      </div>
      <div
        className={grid({
          columns: 12,
          gap: '4',
          gridTemplateRows: '[800px]',
          alignItems: 'center',
        })}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nam
          asperiores soluta suscipit molestiae, ex iste optio commodi sed,
          maiores in corporis? Delectus eos repudiandae totam ullam molestias
          labore dolorum.
        </div>
      </div>
    </div>
  );
}
