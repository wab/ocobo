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
      {items.length === 0 ? (
        <div
          className={css({
            py: { base: 12, lg: 24 },
            textAlign: 'center',
            color: 'gray.medium',
          })}
        >
          <p className={css({ fontSize: 'lg', mb: 4 })}>
            Aucun article de blog disponible
          </p>
          <p className={css({ fontSize: 'sm' })}>
            Revenez bientôt pour découvrir nos derniers contenus sur les Revenue
            Operations.
          </p>
        </div>
      ) : (
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
      )}
    </Container>
  );
};

BlogList.displayName = 'BlogList';

export { BlogList };
