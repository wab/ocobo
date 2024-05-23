import * as React from 'react';

import { NavLink } from '@remix-run/react';

import { css } from '@ocobo/styled-system/css';

import { useMenuItems } from '~/hooks/useMenuItems';

import { SubMenu } from './SubMenu';
import { NavigationMenu } from './ui/NavigationMenu';

const MainMenu = () => {
  const items = useMenuItems();

  return (
    <div className={css({ ml: 'auto', hideBelow: 'lg' })}>
      <NavigationMenu.Root>
        <NavigationMenu.List>
          {items.map(({ key, title, url, subItems, className }) => (
            <NavigationMenu.Item key={key}>
              {url ? (
                <NavigationMenu.Link asChild>
                  <NavLink to={url} className={className}>
                    {title}
                  </NavLink>
                </NavigationMenu.Link>
              ) : (
                <React.Fragment>
                  <NavigationMenu.Trigger>{title}</NavigationMenu.Trigger>
                  {subItems && subItems.length > 0 && (
                    <NavigationMenu.Content>
                      <SubMenu.Root>
                        {subItems
                          .filter((item) => !item.shouldHide)
                          .map(({ key, title, url, variant }) => (
                            <SubMenu.Item key={key} variant={variant}>
                              <NavigationMenu.Link asChild>
                                <NavLink to={url}>{title}</NavLink>
                              </NavigationMenu.Link>
                            </SubMenu.Item>
                          ))}
                      </SubMenu.Root>
                    </NavigationMenu.Content>
                  )}
                </React.Fragment>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
        <NavigationMenu.Indicator />
      </NavigationMenu.Root>
    </div>
  );
};

export { MainMenu };
