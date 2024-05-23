import * as React from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { createStyleContext } from '@shadow-panda/style-context';
import { ChevronRight } from 'lucide-react';

import { styled } from '@ocobo/styled-system/jsx';
import { accordion } from '@ocobo/styled-system/recipes';

const { withProvider, withContext } = createStyleContext(accordion);

const Header = withContext(styled(AccordionPrimitive.Header), 'header');

const TriggerBase = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <Header>
    <AccordionPrimitive.Trigger ref={ref} {...props}>
      {children}
      <ChevronRight />
    </AccordionPrimitive.Trigger>
  </Header>
));
TriggerBase.displayName = AccordionPrimitive.Trigger.displayName;

const ContentBase = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} {...props}>
    <div>{children}</div>
  </AccordionPrimitive.Content>
));
ContentBase.displayName = AccordionPrimitive.Content.displayName;

const Root = withProvider(styled(AccordionPrimitive.Root), 'root');
const Item = withContext(styled(AccordionPrimitive.Item), 'item');
const Trigger = withContext(styled(TriggerBase), 'trigger');
const Content = withContext(styled(ContentBase), 'content');

export const Accordion = { Root, Item, Trigger, Content };
