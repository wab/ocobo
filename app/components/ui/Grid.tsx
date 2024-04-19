import { cx } from '@ocobo/styled-system/css';
import { grid } from '@ocobo/styled-system/patterns';

type GridHTMLProps = React.HTMLAttributes<HTMLElement>;
type GridElement = 'div' | 'ul' | 'ol';

type GridProps = GridHTMLProps & { as?: GridElement };

function Grid(props: GridProps) {
  const { as: Component = 'div', className, ...restProps } = props;
  return (
    <Component
      className={cx(grid({ columns: 12, gap: '4' }), className)}
      {...restProps}
    />
  );
}

export { Grid };
