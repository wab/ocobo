import { css } from '@ocobo/styled-system/css';

import { StoryFrontmatter } from '~/types';

import { StorySpeaker } from './StorySpeaker';

interface StoryHeaderProps {
  item: StoryFrontmatter;
  slug: string;
}

const StoryHeader: React.FunctionComponent<StoryHeaderProps> = ({
  item,
  slug,
}) => {
  return (
    <header
      className={css({
        mb: '8',
      })}
    >
      <h1
        className={css({
          textStyle: 'heading2',
        })}
      >
        {item.title}
      </h1>
      <StorySpeaker item={item} slug={slug} />
    </header>
  );
};

StoryHeader.displayName = 'StoryHeader';

export { StoryHeader };
