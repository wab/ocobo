import { NavLink } from '@remix-run/react';
import { CoffeeIcon, DotIcon, PenToolIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { flex } from '@ocobo/styled-system/patterns';
import { icon, link } from '@ocobo/styled-system/recipes';

import type { BlogpostFrontmatter, MarkdocFile } from '~/types';
import { getAuthor, getTag } from '~/utils/labels';
import { url } from '~/utils/url';

import { Tag } from '../ui/Tag';

interface BlogItemProps {
  item: MarkdocFile<BlogpostFrontmatter>['frontmatter'];
  slug: string;
  index: number;
}

const BlogItem: React.FunctionComponent<BlogItemProps> = ({ item, slug }) => {
  const { t } = useTranslation();

  return (
    <article
      className={flex({
        direction: 'column',
        gap: 4,
        position: 'relative',
        height: 'full',
      })}
    >
      <NavLink to={`${url.blog}/${slug}`}>
        <img
          src={item.image}
          alt="logo"
          className={css({ borderRadius: '8' })}
        />
      </NavLink>

      <div className={css({})}>
        <h2
          className={css({
            textStyle: 'heading2',
          })}
        >
          {item.title}
        </h2>

        <div
          className={css({
            display: 'flex',
            gap: '2',
            alignItems: 'center',
            my: 4,
            textStyle: 'small',
          })}
        >
          <PenToolIcon className={icon({ size: 'md' })} />
          {getAuthor(item.author)}
          <DotIcon className={icon({ size: 'md' })} />
          <CoffeeIcon className={icon({ size: 'md' })} />
          {item.read}
        </div>

        <ul className={flex({ gap: 3, alignItems: 'center', my: 4 })}>
          {item.tags.map((item) => {
            return (
              <li key={item} className={css({})}>
                <Tag>{getTag(item)}</Tag>
              </li>
            );
          })}
        </ul>

        <p
          className={css({
            hideBelow: 'lg',
            lineClamp: 4,
          })}
        >
          {item.description}
        </p>
      </div>
      <p
        className={css({
          textStyle: 'small',
          mt: 'auto',
        })}
      >
        <NavLink to={`${url.blog}/${slug}`} className={link()}>
          {t('see_more')}
        </NavLink>
      </p>
    </article>
  );
};

BlogItem.displayName = 'BlogItem';

export { BlogItem };
