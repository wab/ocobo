import type { MarkdocFile } from '~/types';
import type { OfferFrontmatter } from '~/modules/schemas';
import { LayoutPost } from '~/components/LayoutPost';
import { OfferHeader } from './OfferHeader';
import { OfferSidebar } from './OfferSidebar';
import { OfferContent } from './OfferContent';

interface OfferArticleProps {
  offer: MarkdocFile<OfferFrontmatter>;
}

export function OfferArticle({ offer }: OfferArticleProps) {
  return (
    <LayoutPost.Root>
      <LayoutPost.Aside>
        <OfferSidebar frontmatter={offer.frontmatter} />
      </LayoutPost.Aside>
      <LayoutPost.Main>
        <OfferHeader frontmatter={offer.frontmatter} />
        <OfferContent content={offer.content} />
      </LayoutPost.Main>
    </LayoutPost.Root>
  );
}
