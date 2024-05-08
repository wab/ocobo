import { useSnapCarousel } from 'react-snap-carousel';

import { css } from '@ocobo/styled-system/css';

interface CarouselProps<T> extends React.HTMLAttributes<HTMLElement> {
  readonly items: T[];
  readonly renderItem: (
    props: CarouselRenderItemProps<T>,
  ) => React.ReactElement<CarouselItemProps>;
  shouldDisplayDots?: boolean;
}

interface CarouselRenderItemProps<T> {
  readonly item: T;
  readonly isSnapPoint: boolean;
}

export const Carousel = <T extends object>({
  items,
  renderItem,
  shouldDisplayDots,
  ...props
}: CarouselProps<T>) => {
  const { scrollRef, snapPointIndexes, pages, activePageIndex, goTo } =
    useSnapCarousel();
  return (
    <div {...props}>
      <ul
        className={css({
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          py: '4',
          '&::-webkit-scrollbar': {
            width: 0,
          },
        })}
        ref={scrollRef}
      >
        {items.map((item, i) =>
          renderItem({
            item,
            isSnapPoint: snapPointIndexes.has(i),
          }),
        )}
      </ul>
      <div
        aria-hidden
        className={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        {shouldDisplayDots &&
          pages.map((_, i) => (
            <button
              key={i}
              className={css({
                margin: '0.5rem',
              })}
              onClick={() => goTo(i)}
            >
              <svg
                className={css({
                  fill: activePageIndex === i ? 'yellow' : 'white',
                  stroke: 'yellow',
                  width: '12px',
                })}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </button>
          ))}
      </div>
    </div>
  );
};

interface CarouselItemProps {
  readonly isSnapPoint: boolean;
  readonly children?: React.ReactNode;
}

export const CarouselItem = ({ isSnapPoint, children }: CarouselItemProps) => (
  <li
    className={css({
      //flexShrink: 0,
      scrollSnapAlign: isSnapPoint ? 'start' : 'none',
    })}
  >
    {children}
  </li>
);
