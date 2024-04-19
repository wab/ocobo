import { css, cx } from '@ocobo/styled-system/css';
import { typography } from '@ocobo/styled-system/recipes';

interface CalloutProps {
  title?: string;
  variant?: 'yellow' | 'sky' | 'mint' | 'coral';
}

const Callout: React.FunctionComponent<
  React.PropsWithChildren<CalloutProps>
> = ({ variant = 'yellow', title, children }) => {
  return (
    <div
      className={css({
        backgroundColor: `${variant}.light`,
        boxShadow: 'base',
        borderLeft: 'thick',
        borderColor: variant,
      })}
    >
      {title && (
        <div
          className={cx(
            typography({ variant: 'heading2' }),
            css({
              borderBottom: 'thin',
              borderColor: variant,
              padding: '8',
              pr: '[25%]',
            }),
          )}
        >
          {title}
        </div>
      )}
      <div
        className={css({
          p: '8',
          pr: '[25%]',
        })}
      >
        {children}
      </div>
    </div>
  );
};

Callout.displayName = 'Callout';

export { Callout };
