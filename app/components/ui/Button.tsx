import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';

import { HTMLStyledProps, styled } from '@ocobo/styled-system/jsx';
import { button } from '@ocobo/styled-system/recipes';

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    children?: React.ReactNode;
  }
>(({ asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp ref={ref} {...props}>
      {children}
    </Comp>
  );
});

BaseButton.displayName = 'Button';

const Button = styled(BaseButton, button);
type ButtonProps = HTMLStyledProps<typeof Button>;

export { Button, BaseButton };
export type { ButtonProps };
