import { cx } from '@ocobo/styled-system/css';
import {
  typography,
  TypographyVariantProps,
} from '@ocobo/styled-system/recipes';

type HeadingHTMLProps = React.HTMLAttributes<HTMLElement>;
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = TypographyVariantProps &
  HeadingHTMLProps & { as?: HeadingElement };

function Heading(props: HeadingProps) {
  const [variantProps, localProps] = typography.splitVariantProps(props);
  const { as: Component = 'h2', className, ...restProps } = localProps;
  return (
    <Component
      className={cx(typography(variantProps), className)}
      {...restProps}
    />
  );
}

export { Heading };
