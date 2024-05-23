import { NavLink } from '@remix-run/react';
import { Trans, useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { button, section } from '@ocobo/styled-system/recipes';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';
import { url } from '~/utils/url';

import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const Choose = () => {
  const { t } = useTranslation('strategy');
  const getLocalizedPath = useLocalizedPathname();

  const items = t('choose.items', {
    returnObjects: true,
    interpolation: { escapeValue: false },
  });

  return (
    <section className={section()}>
      <Container>
        <div
          className={css({
            maxW: { base: 'full', lg: '2/3' },
            mx: 'auto',
            bg: 'yellow.light',
            px: { base: '4', lg: '24' },
            py: { base: '16', lg: '24' },
            textAlign: 'center',
            position: 'relative',
          })}
        >
          <Illustration
            name="strategy_choose"
            className={css({
              w: '200px',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
            })}
          />
          <h2
            className={css({
              textStyle: 'heading2',
            })}
          >
            {t('choose.title')}
          </h2>
          {Array.isArray(items) &&
            items.map((item, index) => {
              return (
                <p key={index}>
                  <Trans
                    i18nKey={item}
                    components={[<strong key={`strong-${index}`} />]}
                  />
                </p>
              );
            })}
          <p>
            <NavLink
              to={getLocalizedPath(url.contact)}
              className={button({ variant: 'solid' })}
            >
              {t('contact.cta', { ns: 'common' })}
            </NavLink>
          </p>
        </div>
      </Container>
    </section>
  );
};

export { Choose };
