import { Trans, useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { section } from '@ocobo/styled-system/recipes';

import { url } from '~/utils/url';

import { LocalizedLink } from '../LocalizedLink';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Illustration } from '../ui/Illustration';

const Choose = () => {
  const { t } = useTranslation('strategy');

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
            <Button variant="solid" asChild>
              <LocalizedLink to={url.contact}>
                {t('contact.cta', { ns: 'common' })}
              </LocalizedLink>
            </Button>
          </p>
        </div>
      </Container>
    </section>
  );
};

export { Choose };
