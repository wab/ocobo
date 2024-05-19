import { NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { VisuallyHidden } from '@ocobo/styled-system/jsx';
import { link } from '@ocobo/styled-system/recipes';

import type { MarkdocFile, StoryFrontmatter } from '~/types';
import { url } from '~/utils/url';

import { StorySpeaker } from './StorySpeaker';

interface StoryItemProps {
  item: MarkdocFile<StoryFrontmatter>['frontmatter'];
  slug: string;
  index: number;
}

const defaultTemplateAreas =
  '". logo logo logo logo . content content content content content ."';
const reverseTemplateAreas =
  '". content content content content content . logo logo logo logo ."';
const mobileTemplateAreas = '"logo" "content"';

const StoryItem: React.FunctionComponent<StoryItemProps> = ({
  item,
  slug,
  index,
}) => {
  const { t } = useTranslation();

  const isOdd = index % 2 === 0;

  return (
    <article
      className={css({
        display: 'grid',
        gridTemplateColumns: { base: '1', lg: 'repeat(12, 1fr)' },
        gap: '4',
        gridTemplateAreas: {
          base: mobileTemplateAreas,
          lg: isOdd ? defaultTemplateAreas : reverseTemplateAreas,
        },
        position: 'relative',
      })}
    >
      <div
        className={css({
          gridArea: 'logo',
        })}
      >
        <NavLink
          to={`${url.stories}/${slug}`}
          className={cx(
            'group',
            css({
              height: { base: 150, lg: 300 },
              display: 'grid',
              placeItems: 'center',
              maxWidth: { base: '2/3', lg: 'none' },
              bgColor: {
                base: isOdd ? 'mint.light' : 'white',
                lg: 'mint.light',
              },
              transition: 'background-color 0.5s',
            }),
          )}
        >
          <VisuallyHidden>{item.name}</VisuallyHidden>

          <img
            src={`/clients/${slug}-dark.png`}
            alt="logo"
            className={css({
              display: 'inline-block',
              maxW: '1/2',
              _groupHover: {
                display: 'none',
              },
            })}
          />
          <img
            src={`/clients/${slug}-color.png`}
            alt="logo"
            className={css({
              display: 'none',
              maxW: '1/2',
              _groupHover: {
                display: 'inline-block',
              },
            })}
          />
        </NavLink>
      </div>

      <div
        className={css({
          gridArea: 'content',
        })}
      >
        <h2
          className={css({
            textStyle: 'heading2',
            bleft: 'mint',
          })}
        >
          {item.title}
        </h2>
        <p
          className={css({
            hideBelow: 'lg',
          })}
        >
          {item.subtitle}
        </p>
        <p>
          <NavLink to={`${url.stories}/${slug}`} className={link()}>
            {t('see_more')}
          </NavLink>
        </p>
        <div
          className={css({
            hideBelow: 'lg',
            my: 4,
          })}
        >
          <hr />
          <StorySpeaker item={item} slug={slug} />
        </div>
      </div>
    </article>
  );
};

StoryItem.displayName = 'StoryItem';

export { StoryItem };
