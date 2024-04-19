import * as React from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { createStyleContext } from '@shadow-panda/style-context';
import { Check, ChevronDown } from 'lucide-react';

import { styled } from '@ocobo/styled-system/jsx';
import { icon, select } from '@ocobo/styled-system/recipes';

const { withProvider, withContext } = createStyleContext(select);

const TriggerBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={icon({ dimmed: true })} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
TriggerBase.displayName = SelectPrimitive.Trigger.displayName;

const Viewport = withContext(SelectPrimitive.Viewport, 'viewport');

const ContentBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      data-position={position}
      {...props}
    >
      <Viewport data-position={position}>{children}</Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
ContentBase.displayName = SelectPrimitive.Content.displayName;

const ItemIndicator = withContext(
  styled(SelectPrimitive.ItemIndicator),
  'itemIndicator',
);

const ItemBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
ItemBase.displayName = SelectPrimitive.Item.displayName;

const Root = withProvider(styled(SelectPrimitive.Root), 'root');
const Group = withContext(styled(SelectPrimitive.Group), 'group');
const Value = withContext(styled(SelectPrimitive.Value), 'value');
const Trigger = withContext(styled(TriggerBase), 'trigger');
const Content = withContext(styled(ContentBase), 'content');
const Label = withContext(styled(SelectPrimitive.Label), 'label');
const Item = withContext(styled(ItemBase), 'item');
const Separator = withContext(styled(SelectPrimitive.Separator), 'separator');

export const Select = {
  Root,
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  Separator,
};
