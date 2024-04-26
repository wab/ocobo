import { useSnapCarousel } from 'react-snap-carousel';

import { css } from '@ocobo/styled-system/css';

interface CarouselProps<T> extends React.HTMLAttributes<HTMLElement> {
  readonly items: T[];
  readonly renderItem: (
    props: CarouselRenderItemProps<T>,
  ) => React.ReactElement<CarouselItemProps>;
}

interface CarouselRenderItemProps<T> {
  readonly item: T;
  readonly isSnapPoint: boolean;
}

export const Carousel = <T extends { src: string }>({
  items,
  renderItem,
  ...props
}: CarouselProps<T>) => {
  const { scrollRef, snapPointIndexes } = useSnapCarousel();
  return (
    <div {...props}>
      <ul
        className={css({
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '10',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          py: '8',
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
      flexShrink: 0,
      scrollSnapAlign: isSnapPoint ? 'start' : 'none',
    })}
  >
    {children}
  </li>
);
