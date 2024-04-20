import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { css, cva, cx } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';
import { flex } from '@ocobo/styled-system/patterns';

import { Header } from './Header';
import { LocalizedLink } from './LocalizedLink';
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
                  <LocalizedLink to="/strategy">
                    {t('navigation.services.strategy')}
                  </LocalizedLink>
                </SubMenu.Item>
                <SubMenu.Item variant="sky">
                  <LocalizedLink to="/revops">
                    {t('navigation.services.revops')}
                  </LocalizedLink>
                </SubMenu.Item>
              </SubMenu.Root>
            </Accordion.Content>
          </AccordionItem>

          <LocalizedLink
            to="/stories"
            className={cx(itemStyles(), triggerStyles())}
          >
            {t('navigation.stories')}
            <ChevronRight />
          </LocalizedLink>

          <AccordionItem value="about">
            <AccordionTrigger>
              {t('navigation.company.title', { ns: 'common' })}
            </AccordionTrigger>
            <Accordion.Content>
              <SubMenu.Root>
                <SubMenu.Item variant="coral">
                  <LocalizedLink to="/about">
                    {t('navigation.company.about')}
                  </LocalizedLink>
                </SubMenu.Item>
                <SubMenu.Item variant="coral">
                  <LocalizedLink to="/jobs">
                    {t('navigation.company.jobs')}
                  </LocalizedLink>
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
                  <LocalizedLink to="/news">
                    {t('navigation.resources.news')}
                  </LocalizedLink>
                </SubMenu.Item>
                <SubMenu.Item>
                  <LocalizedLink to="/webinars">
                    {t('navigation.resources.webinars')}
                  </LocalizedLink>
                </SubMenu.Item>
                <SubMenu.Item>
                  <LocalizedLink to="/blog">
                    {t('navigation.resources.blog')}
                  </LocalizedLink>
                </SubMenu.Item>
                <SubMenu.Item>
                  <LocalizedLink to="/tools">
                    {t('navigation.resources.tools')}
                  </LocalizedLink>
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
              <LocalizedLink to="/contact">
                {t('contact.cta', { ns: 'common' })}
              </LocalizedLink>
            </Button>
          </div>
        </Accordion.Root>
      </ScrollArea>
    </MobileMenu>
  );
};

export { MainMobileMenu };
