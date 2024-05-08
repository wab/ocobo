import { NavLink } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { css, cva, cx } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';
import { flex } from '@ocobo/styled-system/patterns';

import { useLocalizedPathname } from '~/hooks/useLocalizedPathname';
import { url } from '~/utils/url';

import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { SubMenu } from './SubMenu';
import { Accordion } from './ui/Accordion';
import { Button } from './ui/Button';
import { ScrollArea } from './ui/ScrollArea';

const triggerStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all',
    cursor: 'pointer',
    textStyle: 'nav',
    fontWeight: 'bold',
  },
});

const itemStyles = cva({
  base: {
    p: '8',
  },
});

const AccordionTrigger = styled(Accordion.Trigger, triggerStyles);
const AccordionItem = styled(Accordion.Item, itemStyles);

const MainMobileMenu = () => {
  const { t } = useTranslation('common');
  const getLocalizedPath = useLocalizedPathname();
  return (
    <MobileMenu>
      <Header />
      <ScrollArea>
        <Accordion.Root
          type="single"
          collapsible
          className={flex({
            direction: 'column',
            minHeight: 'calc(100vh - var(--main-header-height))',
          })}
        >
          <AccordionItem value="services">
            <AccordionTrigger>
              {t('navigation.services.title', { ns: 'common' })}
            </AccordionTrigger>
            <Accordion.Content>
              <SubMenu.Root>
                <SubMenu.Item variant="yellow">
                  <NavLink to={getLocalizedPath(url.strategy)}>
                    {t('navigation.services.strategy')}
                  </NavLink>
                </SubMenu.Item>
                <SubMenu.Item variant="sky">
                  <NavLink to={getLocalizedPath(url.projects)}>
                    {t('navigation.services.revops')}
                  </NavLink>
                </SubMenu.Item>
              </SubMenu.Root>
            </Accordion.Content>
          </AccordionItem>

          <NavLink to="/stories" className={cx(itemStyles(), triggerStyles())}>
            {t('navigation.stories')}
            <ChevronRight />
          </NavLink>

          <AccordionItem value="about">
            <AccordionTrigger>
              {t('navigation.company.title', { ns: 'common' })}
            </AccordionTrigger>
            <Accordion.Content>
              <SubMenu.Root>
                <SubMenu.Item variant="coral">
                  <NavLink to="/about">{t('navigation.company.about')}</NavLink>
                </SubMenu.Item>
                <SubMenu.Item variant="coral">
                  <NavLink to="/jobs">{t('navigation.company.jobs')}</NavLink>
                </SubMenu.Item>
              </SubMenu.Root>
            </Accordion.Content>
          </AccordionItem>
          <AccordionItem value="resources">
            <AccordionTrigger>
              {t('navigation.resources.title', { ns: 'common' })}
            </AccordionTrigger>
            <Accordion.Content>
              <SubMenu.Root>
                <SubMenu.Item>
                  <NavLink to="/news">{t('navigation.resources.news')}</NavLink>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavLink to="/webinars">
                    {t('navigation.resources.webinars')}
                  </NavLink>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavLink to="/blog">{t('navigation.resources.blog')}</NavLink>
                </SubMenu.Item>
                <SubMenu.Item>
                  <NavLink to="/tools">
                    {t('navigation.resources.tools')}
                  </NavLink>
                </SubMenu.Item>
              </SubMenu.Root>
            </Accordion.Content>
          </AccordionItem>

          <div
            className={css(itemStyles.raw(), {
              mt: 'auto',
              textAlign: 'center',
            })}
          >
            <Button asChild variant="solid">
              <NavLink to={getLocalizedPath(url.contact)}>
                {t('contact.cta', { ns: 'common' })}
              </NavLink>
            </Button>
          </div>
        </Accordion.Root>
      </ScrollArea>
    </MobileMenu>
  );
};

export { MainMobileMenu };
