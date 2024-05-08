import { NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { button } from '@ocobo/styled-system/recipes';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';
import { url } from '~/utils/url';

import { SubMenu } from './SubMenu';
import { NavigationMenu } from './ui/NavigationMenu';

const MainMenu = () => {
  const { t } = useTranslation('common');
  const getLocalizedPath = useLocalizedPathname();

  return (
    <div className={css({ ml: 'auto', hideBelow: 'lg' })}>
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              {t('navigation.services.title')}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <SubMenu.Root>
                <SubMenu.Item variant="yellow">
                  <NavigationMenu.Link asChild>
                    <NavLink to={getLocalizedPath(url.strategy)}>
                      {t('navigation.services.strategy')}
                    </NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item variant="sky">
                  <NavigationMenu.Link asChild>
                    <NavLink to={getLocalizedPath(url.projects)}>
                      {t('navigation.services.revops')}
                    </NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
              </SubMenu.Root>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <NavLink to="/stories">{t('navigation.stories')}</NavLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              {t('navigation.company.title')}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <SubMenu.Root>
                <SubMenu.Item variant="coral">
                  <NavigationMenu.Link asChild>
                    <NavLink to="/about">
                      {t('navigation.company.about')}
                    </NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item variant="coral">
                  <NavigationMenu.Link asChild>
                    <NavLink to="/jobs">{t('navigation.company.jobs')}</NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
              </SubMenu.Root>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>
              {t('navigation.resources.title')}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <SubMenu.Root>
                <SubMenu.Item>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/news">
                      {t('navigation.resources.news')}
                    </NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/webinars">
                      {t('navigation.resources.webinars')}
                    </NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/blog">
                      {t('navigation.resources.blog')}
                    </NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavigationMenu.Link asChild>
                    <NavLink to="/tools">
                      {t('navigation.resources.tools')}
                    </NavLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
              </SubMenu.Root>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item className={css({ ml: '8' })}>
            <NavLink
              to={getLocalizedPath(url.contact)}
              className={button({ variant: 'solid' })}
            >
              {t('contact.cta')}
            </NavLink>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Indicator />
      </NavigationMenu.Root>
    </div>
  );
};

export { MainMenu };
