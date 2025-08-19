import { css } from '@ocobo/styled-system/css';

import { ASSETS_BASE_URL } from '~/config/assets';
import type { MarkdocFile, StoryFrontmatter } from '~/types';

import { circle } from '@ocobo/styled-system/patterns';
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
        display: 'grid',
        alignItems: 'center',
        gap: 8,
        py: 6,

        md: {
          gridTemplateColumns: 'auto 1fr',
        },
      })}
    >
      <div>
        <Avatar
          src={`${ASSETS_BASE_URL}/clients/${slug}-avatar.png`}
          alt={item.name}
          className={circle({
            size: 140,
          })}
        />
      </div>
      <div>
        <div className={css({ textStyle: 'heading3' })}>{item.speaker}</div>
        <div className={css({ fontStyle: 'italic' })}>{item.role}</div>
        <div className={css({})}>{item.description}</div>
      </div>
    </div>
  );
};

StorySpeaker.displayName = 'StorySpeaker';

export { StorySpeaker };
