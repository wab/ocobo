import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css } from 'styled-system/css';

import { LocalizedLink } from './LocalizedLink';

const Navigation = () => {
  const { t, i18n } = useTranslation();

  return (
    <nav className={css({ py: '4' })}>
      <ul className={css({ display: 'flex', gap: '4' })}>
        <li>
          <LocalizedLink to="/">
            {t('navigation.home', { ns: 'common' })}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink to="/contact">
            {t('navigation.contact', { ns: 'common' })}
          </LocalizedLink>
        </li>
        {i18n.language === 'fr' && (
          <li>
            <Link to="/blog" reloadDocument>
              Le nouvel ops
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export { Navigation };
