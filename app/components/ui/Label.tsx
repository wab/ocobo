import { css, cx } from '@ocobo/styled-system/css';

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

const Label: React.FunctionComponent<LabelProps> = ({
  className,
  htmlFor,
  ...props
}) => (
  <label
    htmlFor={htmlFor}
    className={cx(
      css({
        display: 'block',
        mb: '1',
      }),
      className,
    )}
    {...props}
  />
);

Label.displayName = 'Label';
export { Label };
