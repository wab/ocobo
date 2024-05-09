import * as React from 'react';

import { useTranslation } from 'react-i18next';
import { useSnapCarousel } from 'react-snap-carousel';

import { css } from '@ocobo/styled-system/css';
import { carousel, carouselItem } from '@ocobo/styled-system/patterns';

const items = [
  {
    src: '/logos/qobra.png',
    title: 'Qobra',
  },
  {
    src: '/logos/tableau.png',
    title: 'Tableau',
  },
  {
    src: '/logos/intercom.png',
    title: 'Intercom',
  },
  {
    src: '/logos/make.png',
    title: 'Make',
  },
  {
    src: '/logos/chargebee.png',
    title: 'Chargebee',
  },
  {
    src: '/logos/hubspot.png',
    title: 'Hubspot',
  },
  {
    src: '/logos/salesforce.png',
    title: 'salesforce',
  },
  {
    src: '/logos/lemlist.png',
    title: 'lemlist',
  },
  {
    src: '/logos/pipedrive.png',
    title: 'pipedrive',
  },
  {
    src: '/logos/planhat.png',
    title: 'planhat',
  },
  {
    src: '/logos/zendesk.png',
    title: 'zendesk',
  },
];

const ToolCarousel = () => {
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
    <ul ref={scrollRef} className={carousel()}>
      {items.map((item, i) => (
        <li
          key={item.src}
          className={carouselItem({
            shouldScrollSnapAlignStart: snapPointIndexes.has(i),
          })}
        >
          <img
            src={item.src}
            alt={item.title}
            className={css({
              maxHeight: 50,
              maxWidth: 150,
            })}
          />
        </li>
      ))}
    </ul>
  );
};

export { ToolCarousel };
