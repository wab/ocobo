import { NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';
import { button } from '@ocobo/styled-system/recipes';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';
import { url } from '~/utils/url';

const desktopTemplateAreas =
  '"aside aside aside . main main main main main main main main"';
const mobileTemplateAreas = '"main" "aside"';

const Root = styled('article', {
  base: {
    display: 'grid',
    gridTemplateColumns: { base: '1', lg: 'repeat(12, 1fr)' },
    gap: '4',
    gridTemplateAreas: {
      base: mobileTemplateAreas,
      lg: desktopTemplateAreas,
    },
    position: 'relative',
    py: '16',
  },
});

const AsideWrapper = styled('aside', {
  base: {
    gridArea: 'aside',
  },
});

const Aside: React.FunctionComponent<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { t } = useTranslation();
  const getLocalizedPath = useLocalizedPathname();
  return (
    <AsideWrapper>
      <div
        className={css({
          position: { base: 'static', lg: 'sticky' },
          top: 'var(--main-header-height)',
          pt: '8',
        })}
      >
        {children}
        <div className={css({ py: 4 })}>
          <p className={css({ fontWeight: 'bold', mb: '0.5rem' })}>
            {t('contact.meet')}
          </p>

          <NavLink to={getLocalizedPath(url.contact)} className={button()}>
            {t('contact.cta')}
          </NavLink>
        </div>
      </div>
    </AsideWrapper>
  );
};

const Main = styled('main', {
  base: {
    gridArea: 'main',
    position: 'relative',
  },
});

export const LayoutPost = { Root, Aside, Main };
