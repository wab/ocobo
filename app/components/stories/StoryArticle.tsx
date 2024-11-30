import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';

import type { MarkdocFile, StoryFrontmatter } from '~/types';

import { StoryDeliverables } from './StoryDeliverables';
import { StoryHeader } from './StoryHeader';
import { StoryMarkdownContainer, YoutubePlayer } from './StoryMarkdownContainer';
import { StoryMetas } from './StoryMetas';

import { LayoutPost } from '../LayoutPost';
import { Breadcrumb } from '../ui/Breadcrumb';

interface StoryArticleProps {
  article: MarkdocFile<StoryFrontmatter>;
}

const StoryArticle: React.FunctionComponent<StoryArticleProps> = ({
  article,
}) => {
  const { t } = useTranslation();
  return (
    <LayoutPost.Root>
      <LayoutPost.Aside>
        <StoryMetas
          item={article.frontmatter}
          slug={article.slug}
          className={css({
            hideBelow: 'lg',
          })}
        />
        <StoryDeliverables items={article.frontmatter.deliverables} />
      </LayoutPost.Aside>

      <LayoutPost.Main>
        <Breadcrumb>
          {t('navigation.stories')} / {article.frontmatter.name}
        </Breadcrumb>
        <StoryHeader item={article.frontmatter} slug={article.slug} />
        <StoryMarkdownContainer content={article.content} />
        {article.frontmatter.youtubeId && (
          <YoutubePlayer
            id={article.frontmatter.youtubeId}
            className={css({ mt: 8 })}
          />
        )}
      </LayoutPost.Main>
    </LayoutPost.Root>
  );
};

StoryArticle.displayName = 'StoryArticle';

export { StoryArticle };
