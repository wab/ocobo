import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { css } from '@ocobo/styled-system/css';

import { useWindowSize } from '~/hooks/useWindowSize';

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

const itemWidth = 150;
const itemGap = 32;

const ToolCarousel = () => {
  const browserWidth = useWindowSize();

  const slideWidth = useMemo(
    () => itemWidth * items.length + itemGap * (items.length + 1),
    [],
  );

  const delta = useMemo(
    () => slideWidth - browserWidth.width,
    [slideWidth, browserWidth.width],
  );

  const duplicateItems = useMemo(() => [...items, ...items], []);
  return (
    <div
      className={css({
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
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
          x: [0, -delta + 'px', 0],
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
              width: itemWidth,
              flexShrink: 0,
            })}
          >
            <img
              src={item.src}
              alt={item.title}
              className={css({
                maxHeight: 50,
                maxWidth: 150,
                display: 'block',
                mx: 'auto',
              })}
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export { ToolCarousel };
