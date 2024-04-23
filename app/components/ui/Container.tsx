import { cx } from '@ocobo/styled-system/css';
import { container } from '@ocobo/styled-system/patterns';

const Container: React.FunctionComponent<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, className, ...props }) => {
  return (
    <div
      className={cx(
        container({
          maxWidth: { base: 'mobile', lg: 'desktop', '2xl': 'xlarge' },
        }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export { Container };
