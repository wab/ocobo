import { useTranslation } from 'react-i18next';

import { StoryFrontmatter } from '~/types';

import { AsideCard } from '../AsideCard';

interface StoryDeliverablesProps {
  items: StoryFrontmatter['deliverables'];
}

const StoryDeliverables: React.FunctionComponent<StoryDeliverablesProps> = ({
  items,
}) => {
  const { t } = useTranslation();
  return (
    <AsideCard.Root>
      <AsideCard.Title>{t('clients.deliverables')}</AsideCard.Title>
      <AsideCard.Section>
        <AsideCard.List>
          {items.map((item, i) => {
            return <li key={`deliverable-${i}`}>{item}</li>;
          })}
        </AsideCard.List>
      </AsideCard.Section>
    </AsideCard.Root>
  );
};

StoryDeliverables.displayName = 'StoryDeliverables';

export { StoryDeliverables };
