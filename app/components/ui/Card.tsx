import { createContext } from '@radix-ui/react-context';

import { css, cx } from '@ocobo/styled-system/css';

interface CardProps {
  variant?: 'yellow' | 'sky' | 'mint' | 'coral';
}

const [CardProvider, useCardContext] = createContext<CardProps>('card');

interface CardRootProps
  extends CardProps,
    React.ComponentPropsWithoutRef<'div'> {
  isColoured?: boolean;
}

const Root: React.FunctionComponent<React.PropsWithChildren<CardRootProps>> = ({
  children,
  isColoured,
  variant = 'yellow',
  className,
  ...rest
}) => {
  return (
    <CardProvider variant={variant}>
      <div
        className={cx(
          css({
            backgroundColor: isColoured ? `${variant}.light` : 'white',
            boxShadow: 'base',
            borderLeft: 'thick',
            borderColor: variant,
            display: 'flex',
            flexDirection: 'column',
          }),
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </CardProvider>
  );
};

const Title: React.FunctionComponent<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = (props) => {
  const { variant } = useCardContext('card');
  return (
    <div
      className={cx(
        css({
          textStyle: 'heading2',
          borderBottom: 'thin',
          borderColor: variant,
          p: '0.5em 2rem 0.5em 2rem',
          minHeight: '3em',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'content-box',
        }),
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

const Content: React.FunctionComponent<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = (props) => {
  return (
    <div
      className={cx(
        css({
          py: '2.375rem',
          px: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '4',
          flexGrow: 1,
        }),
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

export const Card = {
  Root,
  Title,
  Content,
};
