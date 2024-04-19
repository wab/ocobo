import { Link, NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';
import { container, flex } from '@ocobo/styled-system/patterns';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';

import { LocalizedLink } from './LocalizedLink';
import { Button } from './ui/Button';
import { Logocobo } from './ui/Logocobo';
import { NavigationMenu } from './ui/NavigationMenu';

const SubMenuRoot = styled('ul', {
  base: {
    p: '6',
  },
});
const SubMenuItem = styled('li', {
  base: {
    borderLeft: 'thick',
    textStyle: 'nav',

    '& > a': {
      px: '2',
      py: '1',
      display: 'block',
      transition: 'colors',
      transitionDuration: 'normal',
      transitionBehavior: 'smooth',
    },

    '& + &': {
      mt: '6',
    },
  },

  variants: {
    variant: {
      yellow: {
        borderColor: 'yellow',
        '& > a': {
          _hover: {
            bga: 'yellow/5',
            color: 'yellow',
          },
        },
      },
      sky: {
        borderColor: 'sky',
        '& > a': {
          _hover: {
            bga: 'sky/5',
            color: 'sky',
          },
        },
      },
      coral: {
        borderColor: 'coral',
        '& > a': {
          _hover: {
            bga: 'coral/5',
            color: 'coral',
          },
        },
      },
      mint: {
        borderColor: 'mint',
        '& > a': {
          _hover: {
            bga: 'mint/10',
            color: 'mint',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'mint',
  },
});

const SubMenu = { Root: SubMenuRoot, Item: SubMenuItem };

const Navigation = () => {
  const { t } = useTranslation();

  const localizedPathname = useLocalizedPathname();

  return (
    <div className={css({ borderBottom: 'thin', borderColor: 'gray.light' })}>
      <div className={container({})}>
        <div
          className={flex({
            alignItems: 'center',
            gap: '6',
            height: '[110px]',
          })}
        >
          <LocalizedLink to={localizedPathname('/')}>
            <Logocobo height="52" />
          </LocalizedLink>
          <div className={css({ ml: 'auto' })}>
            <NavigationMenu.Root>
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>
                    {t('navigation.services.title', { ns: 'common' })}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <SubMenu.Root>
                      <SubMenu.Item variant="yellow">
                        <NavigationMenu.Link asChild>
                          <NavLink to="/strategy">
                            {t('navigation.services.strategy', {
                              ns: 'common',
                            })}
                          </NavLink>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                      <SubMenu.Item variant="sky">
                        <NavigationMenu.Link asChild>
                          <NavLink to="/revops">
                            {t('navigation.services.revops', { ns: 'common' })}
                          </NavLink>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                    </SubMenu.Root>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Link to="/docs">
                      {t('navigation.stories', { ns: 'common' })}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>
                    {t('navigation.company.title', { ns: 'common' })}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <SubMenu.Root>
                      <SubMenu.Item variant="coral">
                        <NavigationMenu.Link asChild>
                          <NavLink to="/about">
                            {t('navigation.company.about', { ns: 'common' })}
                          </NavLink>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                      <SubMenu.Item variant="coral">
                        <NavigationMenu.Link asChild>
                          <a href="https://www.ocobo.co">
                            {t('navigation.company.jobs', { ns: 'common' })}
                          </a>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                    </SubMenu.Root>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>
                    {t('navigation.resources.title', { ns: 'common' })}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <SubMenu.Root className={css()}>
                      <SubMenu.Item>
                        <NavigationMenu.Link asChild>
                          <NavLink to="/news">
                            {t('navigation.resources.news', { ns: 'common' })}
                          </NavLink>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                      <SubMenu.Item>
                        <NavigationMenu.Link asChild>
                          <NavLink to="/webinars">
                            {t('navigation.resources.webinars', {
                              ns: 'common',
                            })}
                          </NavLink>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                      <SubMenu.Item>
                        <NavigationMenu.Link asChild>
                          <NavLink to="/blog">
                            {t('navigation.resources.blog', { ns: 'common' })}
                          </NavLink>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                      <SubMenu.Item>
                        <NavigationMenu.Link asChild>
                          <NavLink to="/tools">
                            {t('navigation.resources.tools', { ns: 'common' })}
                          </NavLink>
                        </NavigationMenu.Link>
                      </SubMenu.Item>
                    </SubMenu.Root>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <Button asChild variant="solid">
                    <Link to={localizedPathname('/contact')}>
                      {t('contact.cta', { ns: 'common' })}
                    </Link>
                  </Button>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navigation };
