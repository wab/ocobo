import { css } from '@ocobo/styled-system/css';

import type { MarkdocFile, StoryFrontmatter } from '~/types';

import { StoryItem } from './StoryItem';

interface StoryListProps {
  items: MarkdocFile<StoryFrontmatter>[];
}

const StoryList: React.FunctionComponent<StoryListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div
        className={css({
          py: { base: 12, lg: 24 },
          textAlign: 'center',
          color: 'gray.medium',
        })}
      >
        <p className={css({ fontSize: 'lg', mb: 4 })}>
          Aucun témoignage client disponible
        </p>
        <p className={css({ fontSize: 'sm' })}>
          Découvrez bientôt les retours d'expérience de nos clients.
        </p>
      </div>
    );
  }

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
