import { css, cva, cx } from '@ocobo/styled-system/css';

const input = cva({
  base: {
    width: 'full',
    height: 'input',
    px: '2',
    border: 'thin',
    borderColor: 'white',
    backgroundColor: 'white',

    _placeholder: { color: 'gray' },

    _focusVisible: {
      outline: 'none',
      borderColor: 'gray',
    },

    _disabled: {
      pointerEvents: 'none',
      bg: 'gray.light',
      borderColor: 'gray.light',
      color: 'gray',
      cursor: 'not-allowed',
    },
  },
  variants: {
    error: {
      true: {
        '&:not(:focus)': {
          color: 'coral.dark',
          borderColor: 'coral.dark',
        },
      },
    },
  },
});

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isError?: boolean;
}

const Input: React.FunctionComponent<InputProps> = ({
  className,
  isError,
  ...props
}) => (
  <input
    className={cx(
      input({ error: isError }),
      css({ textStyle: 'small' }),
      className,
    )}
    {...props}
  />
);

Input.displayName = 'Input';
export { Input };
