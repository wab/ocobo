import { css } from '@ocobo/styled-system/css';

import { type StoryFrontmatter } from '~/modules/validation.server';
import type { MarkdocFile } from '~/types';

import { StoryItem } from './StoryItem';

import { Container } from '../ui/Container';

interface StoryListProps {
  items: MarkdocFile<StoryFrontmatter>[];
}

const StoryList: React.FunctionComponent<StoryListProps> = ({ items }) => {
  return (
    <Container>
      <ul
        className={css({
          py: { base: 0, lg: 12 },
        })}
      >
        {items.map((entry, i) => (
          <li
            key={entry.slug}
            className={css({
              py: 8,
              position: 'relative',
            })}
          >
            <div
              className={css({
                position: 'absolute',
                top: 0,
                left: '50%',
                right: 0,
                bottom: 0,
                width: '100vw',
                translateX: '-50%',
                bg: i % 2 === 0 ? 'transparent' : 'mint.light',
                hideFrom: 'lg',
              })}
            />
            <StoryItem slug={entry.slug} item={entry.frontmatter} index={i} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

StoryList.displayName = 'StoryList';

export { StoryList };
