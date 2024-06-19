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
        maxW: { base: '100%', lg: '5/6' },
      })}
    >
      <h1
        className={css({
          textStyle: 'heading1',
        })}
      >
        {item.title}
      </h1>
      {/* <p
        className={css({
          textStyle: 'large',
          fontWeight: { base: 'bold', lg: 'normal' },
        })}
      >
        {item.subtitle}
      </p> */}
      <StorySpeaker item={item} slug={slug} />
      <p
        className={css({
          textStyle: 'large',
          bleft: 'mint',
        })}
      >
        {item.description}
      </p>
    </header>
  );
};

StoryHeader.displayName = 'StoryHeader';

export { StoryHeader };
