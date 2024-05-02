import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';

import { url } from '~/utils/url';

import { LocalizedLink } from './LocalizedLink';
import { SubMenu } from './SubMenu';
import { Button } from './ui/Button';
import { NavigationMenu } from './ui/NavigationMenu';

const MainMenu = () => {
  const { t } = useTranslation('common');

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
                    <LocalizedLink to={url.strategy}>
                      {t('navigation.services.strategy')}
                    </LocalizedLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item variant="sky">
                  <NavigationMenu.Link asChild>
                    <LocalizedLink to={url.project}>
                      {t('navigation.services.revops')}
                    </LocalizedLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
              </SubMenu.Root>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <LocalizedLink to="/stories">
                {t('navigation.stories')}
              </LocalizedLink>
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
                    <LocalizedLink to="/about">
                      {t('navigation.company.about')}
                    </LocalizedLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item variant="coral">
                  <NavigationMenu.Link asChild>
                    <LocalizedLink to="/jobs">
                      {t('navigation.company.jobs')}
                    </LocalizedLink>
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
                    <LocalizedLink to="/news">
                      {t('navigation.resources.news')}
                    </LocalizedLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavigationMenu.Link asChild>
                    <LocalizedLink to="/webinars">
                      {t('navigation.resources.webinars')}
                    </LocalizedLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavigationMenu.Link asChild>
                    <LocalizedLink to="/blog">
                      {t('navigation.resources.blog')}
                    </LocalizedLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavigationMenu.Link asChild>
                    <LocalizedLink to="/tools">
                      {t('navigation.resources.tools')}
                    </LocalizedLink>
                  </NavigationMenu.Link>
                </SubMenu.Item>
              </SubMenu.Root>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item className={css({ ml: '8' })}>
            <Button asChild variant="solid">
              <LocalizedLink to={url.contact}>{t('contact.cta')}</LocalizedLink>
            </Button>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Indicator />
      </NavigationMenu.Root>
    </div>
  );
};

export { MainMenu };
