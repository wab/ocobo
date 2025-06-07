import { css } from '@ocobo/styled-system/css';

import type { MarkdocFile, StoryFrontmatter } from '~/types';

import { StoryItem } from './StoryItem';

interface StoryListProps {
  items: MarkdocFile<StoryFrontmatter>[];
}

const StoryList: React.FunctionComponent<StoryListProps> = ({ items }) => {
  return (
    <ul
      className={css({
        py: 10,
        display: 'grid',
        gridTemplateColumns: { base: '1', lg: 'repeat(3, 1fr)' },
        gap: 10,
        alignItems: 'stretch',
      })}
    >
      {items.map((entry) => (
        <li key={entry.slug}>
          <StoryItem slug={entry.slug} item={entry.frontmatter} />
        </li>
      ))}
    </ul>
  );
};

StoryList.displayName = 'StoryList';

export { StoryList };
