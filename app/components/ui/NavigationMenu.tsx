import * as React from 'react';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { createStyleContext } from '@shadow-panda/style-context';
import { ChevronDown } from 'lucide-react';

import { cx } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';
import { navigationMenu } from '@ocobo/styled-system/recipes';

const { withProvider, withContext } = createStyleContext(navigationMenu);

const BaseNavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} {...props}>
    {children}
    {/* <Viewport /> */}
  </NavigationMenuPrimitive.Root>
));
BaseNavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const BaseNavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger ref={ref} {...props}>
    {children} <ChevronDown aria-hidden="true" />
  </NavigationMenuPrimitive.Trigger>
));
BaseNavigationMenuTrigger.displayName =
  NavigationMenuPrimitive.Trigger.displayName;

const ViewportWrapper = withContext(styled('div'), 'viewportWrapper');

const BaseNavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ViewportWrapper>
    <NavigationMenuPrimitive.Viewport
      className={cx(className)}
      ref={ref}
      {...props}
    />
  </ViewportWrapper>
));
BaseNavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const Root = withProvider(styled(BaseNavigationMenu), 'root');
const List = withContext(styled(NavigationMenuPrimitive.List), 'list');
const Item = withContext(styled(NavigationMenuPrimitive.Item), 'item');
const Trigger = withContext(styled(BaseNavigationMenuTrigger), 'trigger');
const Content = withContext(styled(NavigationMenuPrimitive.Content), 'content');
const Link = withContext(styled(NavigationMenuPrimitive.Link), 'link');
const Viewport = withContext(styled(BaseNavigationMenuViewport), 'viewport');
const Indicator = withContext(
  styled(NavigationMenuPrimitive.Indicator),
  'indicator',
  { children: <div /> },
);

export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Link,
  Viewport,
  Indicator,
};
