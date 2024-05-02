import { Trans, useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';

import { Container } from '../ui/Container';

const Root = styled('ol', {
  base: {
    position: 'relative',
    bgImage: {
      base: 'url(/illus/strategy_pyramid_mobile.png)',
      lg: 'url(/illus/strategy_pyramid_tablet.png)',
      xl: 'url(/illus/strategy_pyramid_desktop.png)',
    },
    bgRepeat: 'no-repeat',
    bgPosition: 'center',
    bgSize: { base: 'contain', lg: '620px' },
    overflow: 'hidden',
    minHeight: '600px',
    py: '12',
    mb: '12',
  },
});
const Item = styled('li', {
  base: {
    position: 'absolute',
    w: { base: 'calc(50% + 50px)', lg: '3/12' },

    '&:nth-child(1)': {
      top: { base: '98px', lg: '76px', xl: '128px' },
      left: { base: '50%', lg: '62%' },
      translateX: { base: '-60px', lg: 'none' },
    },
    '&:nth-child(2)': {
      top: { base: '198px', lg: '156px', xl: '204px' },
      left: { base: '50%', lg: 0 },
      translateX: { base: '-60px', lg: 'none' },
    },
    '&:nth-child(3)': {
      top: { base: '348px', lg: '360px', xl: '296px' },
      left: { base: '50%', lg: 'auto' },
      right: 0,
      translateX: { base: '-60px', lg: 'none' },
    },
    '&:nth-child(4)': {
      top: { base: '488px', lg: '480px', xl: '444px' },
      left: { base: '50%', lg: 0 },
      translateX: { base: '-60px', lg: 'none' },
    },
  },
});
const Title = styled('h3', {
  base: {
    textStyle: 'large',
    fontWeight: 700,
  },
});
const List = styled('ul', {
  base: {
    textStyle: 'small',
  },
});
const ListItem = styled('li', {
  base: {},
});

const Pyramid = { Root, Item, Title, List, ListItem };

const Needs = () => {
  const { t } = useTranslation('strategy');

  const items = [
    t('needs.0.items', { returnObjects: true }),
    t('needs.1.items', { returnObjects: true }),
    t('needs.2.items', { returnObjects: true }),
    t('needs.3.items', { returnObjects: true }),
  ];

  return (
    <section className={css({ position: 'relative' })}>
      <div
        className={css({
          h: '1px',
          bg: 'dark',
          position: 'absolute',
          w: 'full',
          top: '0.5em',
          textStyle: 'heading1',
        })}
      />
      <div
        className={css({
          position: 'absolute',
          bottom: 0,
          left: 0,
          w: 'full',
          h: '80px',
          bg: 'yellow.light',
          hideBelow: 'lg',
        })}
      />
      <Container isMobileFullWidth>
        <h2
          className={css({
            textAlign: 'center',
            textStyle: 'heading1',
            maxWidth: '5/6',
            mx: 'auto',
            bg: 'white',
            px: { base: '0', lg: '1em' },
            boxSizing: 'border-box',
          })}
        >
          {t('needs.title')}
        </h2>
        <p
          className={css({
            textAlign: 'center',
            textStyle: 'large',
            maxWidth: { base: '5/6', lg: '1/2' },
            mx: 'auto',
          })}
        >
          <Trans
            i18nKey="needs.description"
            components={[<strong key="strong" />]}
            ns="strategy"
          />
        </p>
        <p
          className={css({
            textAlign: 'center',
            textStyle: 'heading2',
            maxWidth: { base: '5/6', lg: '1/2' },
            mx: 'auto',
            bg: 'yellow.light',
            p: '1em',
          })}
        >
          {t('needs.subtitle')}
        </p>
        <Pyramid.Root>
          <Pyramid.Item>
            <Pyramid.Title>{t('needs.0.title')}</Pyramid.Title>
            <Pyramid.List>
              {Array.isArray(items[0]) &&
                items[0].map((item, index) => (
                  <ListItem key={`0-${index}`}>{item}</ListItem>
                ))}
            </Pyramid.List>
          </Pyramid.Item>
          <Pyramid.Item>
            <Pyramid.Title>{t('needs.1.title')}</Pyramid.Title>
            <Pyramid.List>
              {Array.isArray(items[1]) &&
                items[1].map((item, index) => (
                  <ListItem key={`1-${index}`}>{item}</ListItem>
                ))}
            </Pyramid.List>
          </Pyramid.Item>
          <Pyramid.Item>
            <Pyramid.Title>{t('needs.2.title')}</Pyramid.Title>
            <Pyramid.List>
              {Array.isArray(items[2]) &&
                items[2].map((item, index) => (
                  <ListItem key={`2-${index}`}>{item}</ListItem>
                ))}
            </Pyramid.List>
          </Pyramid.Item>
          <Pyramid.Item>
            <Pyramid.Title>{t('needs.3.title')}</Pyramid.Title>
            <Pyramid.List>
              {Array.isArray(items[3]) &&
                items[3].map((item, index) => (
                  <ListItem key={`3-${index}`}>{item}</ListItem>
                ))}
            </Pyramid.List>
          </Pyramid.Item>
        </Pyramid.Root>
        <div
          className={css({
            w: { base: 'full', lg: '5/6' },
            mx: 'auto',
            position: 'relative',
          })}
        >
          <div
            className={cx(
              css({
                position: 'absolute',
                w: 'full',
                h: { base: '60px', lg: '90px' },
                top: '0',
                left: '0',
                translateY: '-50%',
                bgImage: 'url(/illus/planet.svg)',
                bgSize: 'contain',
                bgRepeat: 'no-repeat',
                bgPosition: '90%',
              }),
            )}
          />
          <div
            className={css({
              position: 'absolute',
              bottom: '0',
              left: '0',
              w: 'full',
              h: { base: '90px', lg: '150px' },
              translateY: '25%',
              bgImage: 'url(/illus/accordion.png)',
              bgSize: 'contain',
              bgRepeat: 'no-repeat',
              bgPosition: '10%',
            })}
          />

          <div
            className={css({
              position: 'relative',
              bg: 'dark',
              color: 'white',
              textStyle: 'large',
              textAlign: 'center',
              fontWeight: 700,
              p: '2em',
            })}
          >
            <Trans
              i18nKey="needs.conclusion"
              ns="strategy"
              components={[
                <span
                  key="desktop_only"
                  className={css({ hideBelow: 'lg' })}
                />,
              ]}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export { Needs };
