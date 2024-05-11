import { TimerIcon, MessageSquareTextIcon, WrenchIcon } from 'lucide-react';

import { css } from '@ocobo/styled-system/css';
import { flex } from '@ocobo/styled-system/patterns';
import { icon } from '@ocobo/styled-system/recipes';

import { StoryFrontmatter } from '~/modules/validation.server';

import { Card } from './Card';

interface StoryMetasProps {
  item: StoryFrontmatter;
}

const StoryMetas: React.FunctionComponent<StoryMetasProps> = ({ item }) => {
  return (
    <Card.Root>
      <Card.Title>
        <img
          src={`/clients/${item.slug}-white.png`}
          alt={item.name}
          width={100}
        />
      </Card.Title>
      <Card.Section>
        <ul>
          {item.tags.map((item) => {
            return (
              <li
                key={item}
                className={css({
                  fontWeight: 'bold',
                })}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </Card.Section>
      <Card.Section>
        <div className={flex({ gap: 3 })}>
          <TimerIcon className={icon({ size: 'lg' })} />
          {item.duration}
        </div>
      </Card.Section>
      <Card.Section>
        <div className={flex({ gap: 3 })}>
          <MessageSquareTextIcon className={icon({ size: 'lg' })} />
          <ul>
            {item.scopes.map((item) => {
              return (
                <li key={item} className={css({})}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </Card.Section>
      <Card.Section>
        <div className={flex({ gap: 3 })}>
          <WrenchIcon className={icon({ size: 'lg' })} />
          <ul>
            {item.tools.map((item) => {
              return (
                <li key={item} className={css({})}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </Card.Section>
    </Card.Root>
  );
};

StoryMetas.displayName = 'StoryMetas';

export { StoryMetas };
