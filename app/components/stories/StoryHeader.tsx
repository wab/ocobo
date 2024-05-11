import { css } from '@ocobo/styled-system/css';

import { StoryFrontmatter } from '~/modules/validation.server';

import { StoryAvatar } from './StoryAvatar';

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
      <p
        className={css({
          textStyle: 'large',
        })}
      >
        {item.subtitle}
      </p>
      <StoryAvatar item={item} slug={slug} />
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
