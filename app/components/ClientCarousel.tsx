import * as React from 'react';

import { useTranslation } from 'react-i18next';
import { useSnapCarousel } from 'react-snap-carousel';

import { css } from '@ocobo/styled-system/css';
import { carousel, carouselItem } from '@ocobo/styled-system/patterns';

const items = [
  {
    src: '/clients/chr-group-white.png',
    title: 'Chr group',
  },
  {
    src: '/clients/citron-white.png',
    title: 'Citron',
  },
  {
    src: '/clients/dotworld-white.png',
    title: 'Dotworld',
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
    src: '/clients/leeway-white.png',
    title: 'Leeway',
  },
  {
    src: '/clients/movivolt-white.png',
    title: 'Movivolt',
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
    src: '/clients/qonto-white.png',
    title: 'Qonto',
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
    src: '/clients/wttj-white.png',
    title: 'Welcome To The Jungle',
  },
];

const ClientCarousel = () => {
  const { t } = useTranslation('common');
  const { scrollRef, snapPointIndexes, pages, activePageIndex, goTo } =
    useSnapCarousel();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (activePageIndex === pages.length - 1) {
        goTo(0);
      } else {
        goTo(activePageIndex + 1);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [activePageIndex, pages, goTo]);

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
        <p
          className={css({
            textStyle: 'heading2',
            mb: 6,
          })}
        >
          {t('clients.title')}
        </p>

        <ul ref={scrollRef} className={carousel()}>
          {items.map((item, i) => (
            <li
              key={item.src}
              className={carouselItem({
                shouldScrollSnapAlignStart: snapPointIndexes.has(i),
                width: 'auto',
                height: '60px',
                placeContent: 'center',
              })}
            >
              <img
                src={item.src}
                alt={item.title}
                className={css({
                  maxHeight: '60px',
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { ClientCarousel };
