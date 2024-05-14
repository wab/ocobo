import { css } from '@ocobo/styled-system/css';

import { StoryFrontmatter } from '~/modules/validation.server';
import type { MarkdocFile } from '~/types';

import { Avatar } from '../ui/Avatar';

interface StorySpeakerProps {
  item: MarkdocFile<StoryFrontmatter>['frontmatter'];
  slug: string;
}

const StorySpeaker: React.FunctionComponent<StorySpeakerProps> = ({
  item,
  slug,
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        py: 6,
      })}
    >
      <div>
        <Avatar src={`/clients/${slug}-avatar.png`} alt={item.name} />
      </div>
      <div>
        <strong>{item.speaker}</strong>
        <div>{`${item.role} @ ${item.name}`}</div>
      </div>
    </div>
  );
};

StorySpeaker.displayName = 'StorySpeaker';

export { StorySpeaker };
