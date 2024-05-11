import { useTranslation } from 'react-i18next';

import { StoryFrontmatter } from '~/modules/validation.server';
import type { MarkdocFile } from '~/types';

import { StoryDeliverables } from './StoryDeliverables';
import { StoryHeader } from './StoryHeader';
import { StoryMarkdownContainer } from './StoryMarkdownContainer';
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
        <StoryMetas item={article.frontmatter} />
        <StoryDeliverables items={article.frontmatter.deliverables} />
      </LayoutPost.Aside>

      <LayoutPost.Main>
        <Breadcrumb>
          {t('navigation.stories')} / {article.frontmatter.name}
        </Breadcrumb>
        <StoryHeader item={article.frontmatter} slug={article.slug} />
        <StoryMarkdownContainer content={article.content} />
      </LayoutPost.Main>
    </LayoutPost.Root>
  );
};

StoryArticle.displayName = 'StoryArticle';

export { StoryArticle };
