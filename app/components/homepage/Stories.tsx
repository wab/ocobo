import { QuoteIcon } from 'lucide-react';

import { css, cx } from '@ocobo/styled-system/css';
import { circle } from '@ocobo/styled-system/patterns';
import { icon } from '@ocobo/styled-system/recipes';

import { Avatar } from '../ui/Avatar';
import { Carousel } from '../ui/Carousel';
import { Container } from '../ui/Container';

type TItem = {
  id: string;
  slug: string;
  quote: string;
  name: string;
  speaker: string;
  role: string;
};

const StoryCard: React.FunctionComponent<{ item: TItem }> = ({ item }) => {
  const colors = ['mint', 'coral', 'sky', 'yellow'];
  const color = colors[(item.id.length + 1) % colors.length];

  return (
    <Carousel.Item
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        bg: `${color}.light`,
        py: '8',
        px: '80px',
        borderTop: 'thick',
        borderColor: color,
        minH: 'full',
      })}
    >
      <div
        className={css({
          flexShrink: 0,
        })}
      >
        <Avatar
          src={`/clients/${item.slug}-avatar.png`}
          alt={item.speaker}
          className={circle({ size: '120px' })}
        />
      </div>
      <div>
        <blockquote>
          <QuoteIcon
            className={cx(
              icon({ size: 'lg' }),
              css({
                display: 'inline-block',
                mr: '0.5em',
                color,
              }),
            )}
          />
          {item.quote}
          <aside>
            <cite
              className={css({
                textStyle: 'small',
                fontWeight: 'bold',
                fontStyle: 'normal',
              })}
            >
              {item.speaker} {item.role} @ {item.name}
            </cite>
          </aside>
        </blockquote>
      </div>
    </Carousel.Item>
  );
};

const Stories: React.FunctionComponent<{ items: TItem[] }> = ({ items }) => {
  return (
    <section
      className={css({
        hideBelow: 'lg',
        position: 'relative',

        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '50%',
          bg: 'dark',
        },
      })}
    >
      <Container>
        <Carousel.Root
          renderItem={({ item }) => <StoryCard item={item} />}
          items={items}
          className={css({
            width: '4/6',
            mx: 'auto',
            bg: 'transparent',
            h: '250px',
          })}
        />
      </Container>
    </section>
  );
};

export { Stories };
