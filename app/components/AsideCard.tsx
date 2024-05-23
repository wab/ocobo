import { createContext } from '@radix-ui/react-context';

import { css, cx } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';

interface CardProps {
  variant?: 'page' | 'post';
}

const [CardProvider, useCardContext] = createContext<CardProps>('card');

const Root: React.FunctionComponent<
  React.PropsWithChildren<CardProps & React.ComponentPropsWithoutRef<'div'>>
> = ({ children, variant = 'page', className, ...rest }) => {
  return (
    <CardProvider variant={variant}>
      <div
        className={cx(
          css({
            mb: 8,
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

const Section: React.FunctionComponent<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = (props) => {
  const { variant } = useCardContext('card');
  return (
    <div
      className={cx(
        css({
          bg: variant === 'page' ? 'mint.light' : 'sky.light',
          borderColor: variant === 'page' ? 'mint' : 'sky',
          borderBottom: 'thin',
          p: 6,

          _last: {
            borderBottom: 'none',
          },
        }),
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

const Title: React.FunctionComponent<
  React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>
> = (props) => {
  const { variant } = useCardContext('card');
  return (
    <h2
      className={cx(
        css({
          fontWeight: 'bold',
          bg: variant === 'page' ? 'mint' : 'sky',
          height: '90px',
          display: 'flex',
          alignItems: 'center',
          p: 6,
        }),
        props.className,
      )}
    >
      {props.children}
    </h2>
  );
};

const List = styled('ul', {
  base: {
    pl: 6,
    listStyleType: 'disc',

    '& li': {
      mb: 4,
      _last: {
        mb: 0,
      },
    },
  },
});

export const AsideCard = { Root, Title, Section, List };
