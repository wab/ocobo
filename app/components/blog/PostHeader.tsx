import { css } from '@ocobo/styled-system/css';

import { BlogpostFrontmatter } from '~/types';

interface BlogpostHeaderProps {
  item: BlogpostFrontmatter;
}

const PostHeader: React.FunctionComponent<BlogpostHeaderProps> = ({ item }) => {
  return (
    <header
      className={css({
        mb: '8',
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
          bleft: 'sky',
        })}
      >
        {item.description}
      </p>

      <img
        src={item.image}
        alt=""
        className={css({
          display: 'block',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          borderRadius: '8',
          my: 8,
        })}
      />
    </header>
  );
};

PostHeader.displayName = 'PostHeader';

export { PostHeader };
