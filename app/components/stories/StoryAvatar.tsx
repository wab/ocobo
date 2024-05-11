import { css } from '@ocobo/styled-system/css';
import { circle } from '@ocobo/styled-system/patterns';

import { StoryFrontmatter } from '~/modules/validation.server';
import type { MarkdocFile } from '~/types';

interface StoryAvatarProps {
  item: MarkdocFile<StoryFrontmatter>['frontmatter'];
  slug: string;
}

const StoryAvatar: React.FunctionComponent<StoryAvatarProps> = ({
  item,
  slug,
}) => {
  return (
    <div
      className={css({
        hideBelow: 'lg',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        py: 6,
      })}
    >
      <div>
        <img
          src={`/clients/${slug}-avatar.png`}
          alt={item.name}
          className={circle({ size: '70px' })}
        />
      </div>
      <div>
        <strong>{item.speaker}</strong>
        <div>{`${item.role} @ ${item.name}`}</div>
      </div>
    </div>
  );
};

StoryAvatar.displayName = 'StoryAvatar';

export { StoryAvatar };
