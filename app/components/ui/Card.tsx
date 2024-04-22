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

const Title: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  const { variant } = useCardContext('card');
  return (
    <div
      className={css({
        textStyle: 'heading2',
        borderBottom: 'thin',
        borderColor: variant,
        pl: '8',
        pr: '[25%]',
        py: '6',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'content-box',
      })}
    >
      {props.children}
    </div>
  );
};

const Content: React.FunctionComponent<React.PropsWithChildren> = (props) => {
  return (
    <div
      className={css({
        p: '8',
        pr: '[25%]',
      })}
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
