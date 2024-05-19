import { css } from '@ocobo/styled-system/css';

import type { BlogpostFrontmatter, MarkdocFile } from '~/types';

import { BlogItem } from './BlogItem';

import { Container } from '../ui/Container';

interface BlogListProps {
  items: MarkdocFile<BlogpostFrontmatter>[];
}

const BlogList: React.FunctionComponent<BlogListProps> = ({ items }) => {
  return (
    <Container>
      <ul
        className={css({
          py: { base: 6, lg: 12 },
          display: 'grid',
          gridTemplateColumns: { base: '1', lg: 'repeat(2, 1fr)' },
          gap: 8,
          alignItems: 'stretch',
        })}
      >
        {items.map((entry, i) => (
          <li
            key={entry.slug}
            className={css({
              position: 'relative',
            })}
          >
            <BlogItem slug={entry.slug} item={entry.frontmatter} index={i} />
          </li>
        ))}
      </ul>
    </Container>
  );
};

BlogList.displayName = 'BlogList';

export { BlogList };
