import React, { useMemo } from 'react';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';

import { useWindowSize } from '~/hooks/useWindowSize';

const items = [
  {
    src: '/clients/epack-white.png',
    title: 'ePack Hygiène - CHR group',
  },
  {
    src: '/clients/citron-white.png',
    title: 'Citron',
  },
  {
    src: '/clients/wttj-white.png',
    title: 'Welcome To The Jungle',
  },
  {
    src: '/clients/fabriq-white.png',
    title: 'Fabriq',
  },
  {
    src: '/clients/idex-white.png',
    title: 'Idex',
  },
  {
    src: '/clients/tomorro-white.png',
    title: 'Tomorro',
  },

  {
    src: '/clients/qonto-white.png',
    title: 'Qonto',
  },
  {
    src: '/clients/qare-white.png',
    title: 'Qare',
  },
  {
    src: '/clients/qobra-white.png',
    title: 'Qobra',
  },
  {
    src: '/clients/movivolt-white.png',
    title: 'Movivolt',
  },
  {
    src: '/clients/resilience-white.png',
    title: 'Resilience',
  },
  {
    src: '/clients/sortlist-white.png',
    title: 'Sortlist',
  },
  {
    src: '/clients/steeple-white.png',
    title: 'Steeple',
  },
  {
    src: '/clients/dotworld-white.png',
    title: 'Dotworld',
  },
  {
    src: '/clients/cybelangel-white.png',
    title: 'CybelAngel',
  },
  {
    src: '/clients/yousign-white.png',
    title: 'Yousign',
  },
  {
    src: '/clients/vibe-co-white.png',
    title: 'Vibe.co',
  },
];

const itemWidth = 140;
const itemGap = 16;

const ClientCarousel: React.FunctionComponent<{
  shouldDisplayTitle?: boolean;
}> = ({ shouldDisplayTitle }) => {
  const { t } = useTranslation('common');
  const browserWidth = useWindowSize();

  const slideWidth = useMemo(
    () => (itemWidth * items.length + itemGap * (items.length + 1)) * 2,
    [],
  );

  const delta = useMemo(
    () => slideWidth - browserWidth.width,
    [slideWidth, browserWidth.width],
  );

  const duplicateItems = useMemo(() => [...items, ...items, ...items], []);

  if (browserWidth.width === 0) {
    return null;
  }

  return (
    <section>
      <div
        className={css({
          bg: 'dark',
          color: 'white',
          py: { base: '6', lg: '10' },
          textAlign: 'center',
        })}
      >
        {shouldDisplayTitle && (
          <p
            className={css({
              textStyle: 'heading2',
              mb: 6,
            })}
          >
            {t('clients.title')}
          </p>
        )}
        <div
          className={css({
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            textAlign: 'left',
          })}
        >
          <motion.ul
            className={css({
              display: 'inline-flex',
              alignItems: 'center',
              gap: itemGap + 'px',
              w: 'auto',
              px: itemGap + 'px',
            })}
            animate={{
              x: [0, -delta + 'px'],
              transition: {
                ease: 'linear',
                duration: delta / 15,
                repeat: Infinity,
              },
            }}
          >
            {duplicateItems.map((item, i) => (
              <li
                key={item.src + i}
                className={css({
                  w: itemWidth,
                  flexShrink: 0,
                })}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className={css({
                    maxH: '60px',
                    w: 'auto',
                    display: 'block',
                    mx: 'auto',
                  })}
                />
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export { ClientCarousel };
