import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { type HTMLStyledProps, styled } from '@ocobo/styled-system/jsx';
import { link } from '@ocobo/styled-system/recipes';

import { IconArrow } from '../icons/Arrow';

const BaseLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    children?: React.ReactNode;
  }
>(({ asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp ref={ref} {...props}>
      <>
        {children}
        <IconArrow />
      </>
    </Comp>
  );
});
BaseLink.displayName = 'Link';

export const Link = styled(BaseLink, link);
export type LinkProps = HTMLStyledProps<typeof Link>;
