import { useTranslation } from 'react-i18next';

import { StoryFrontmatter } from '~/modules/validation.server';

import { Card } from './Card';

interface StoryDeliverablesProps {
  items: StoryFrontmatter['deliverables'];
}

const StoryDeliverables: React.FunctionComponent<StoryDeliverablesProps> = ({
  items,
}) => {
  const { t } = useTranslation();
  return (
    <Card.Root>
      <Card.Title>{t('clients.deliverables')}</Card.Title>
      <Card.Section>
        <Card.List>
          {items.map((item, i) => {
            return <li key={`deliverable-${i}`}>{item}</li>;
          })}
        </Card.List>
      </Card.Section>
    </Card.Root>
  );
};

StoryDeliverables.displayName = 'StoryDeliverables';

export { StoryDeliverables };
