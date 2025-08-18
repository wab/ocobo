import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { css } from '@ocobo/styled-system/css';
import { link } from '@ocobo/styled-system/recipes';

import type { MarkdocFile, StoryFrontmatter } from '~/types';
import { url } from '~/utils/url';

interface StoryItemProps {
  item: MarkdocFile<StoryFrontmatter>['frontmatter'];
  slug: string;
  index?: number;
}

const StoryItem: React.FunctionComponent<StoryItemProps> = React.memo(
  ({ item, slug, index = 0 }) => {
    const { t } = useTranslation();

    return (
      <article
        className={css({
          display: 'grid',
          gridTemplateRows: '340px auto auto 1fr',
          height: '100%',
          bg: 'white',
          gap: 2,
          overflow: 'hidden',
        })}
      >
        <NavLink
          to={`${url.stories}/${slug}`}
          className={css({
            display: 'block',
            height: '340px',
            minHeight: '340px',
            maxHeight: '340px',
            borderRadius: '8',
            position: 'relative',
            lineHeight: 0,
            margin: 0,
            padding: 0,
            verticalAlign: 'top',
          })}
        >
          <img
            src={`/clients/${slug}-avatar.png`}
            alt="logo"
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            width={340}
            height={340}
            fetchPriority={index < 2 ? 'high' : 'auto'}
            className={css({
              width: '100%',
              height: '340px',
              borderRadius: '8',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              filter: 'brightness(0.7)',
              transition: 'filter 0.3s ease',
              _hover: {
                filter: 'brightness(1)',
              },
            })}
          />
          <div
            className={css({
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translateY(40%)',
              bg: 'black',
              px: 2,
              py: 1,
              borderRadius: '8px 0 8px 0',
            })}
          >
            <img
              src={`/clients/${slug}-white.png`}
              alt={item.name}
              loading="lazy"
              decoding="async"
              width={32}
              height={16}
              className={css({
                width: 32,
                height: 16,
                objectFit: 'contain',
              })}
            />
          </div>
        </NavLink>

        <div>
          <h2 className={css({ textStyle: 'heading3', pr: '150px' })}>
            {item.speaker}
          </h2>
          <span className={css({ fontStyle: 'italic' })}>{item.role}</span>
        </div>
        <div>{item.title}</div>
        <div>
          <NavLink to={`${url.stories}/${slug}`} className={link()}>
            {t('see_more')}
          </NavLink>
        </div>
      </article>
    );
  },
);

StoryItem.displayName = 'StoryItem';

export { StoryItem };
