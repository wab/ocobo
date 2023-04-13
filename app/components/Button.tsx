const textSize = 'text-base lg:text-lg';
const rounded = 'rounded-l lg:rounded-2xl';

const padding = 'px-7 lg:px-10 py-3 lg:py-4';

const color = {
  primary: 'text-white',
  white: 'text-coral',
  dark: 'text-white',
  secondary: 'text-slate-700 dark:text-slate-200',
  text: 'text-slate-700 hover:text-white dark:text-slate-200 dark:hover:text-white',
};

const backgroundColors = {
  primary: 'bg-coral',
  secondary: 'bg-transparent',
  white: 'bg-white',
  dark: 'bg-dark',
  text: 'bg-light-button hover:bg-blue-500 dark:bg-gray-800 dark:hover:bg-blue-500',
};

const border = {
  primary: 'border-none',
  white: 'border-none',
  dark: 'border-none',
  secondary: 'border-2 border-gray-800 dark:border-white',
  text: 'border-none',
};

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'text' | 'white' | 'dark';
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  variant = 'secondary',
  className,
  disabled,
  children,
  onClick,
  ...rest
}) => {
  const disabledStyle = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'transition ease-in-out duration-300 hover:cursor-pointer';

  let baseClasses = [
    textSize,
    rounded,
    border[variant],
    backgroundColors[variant],
    color[variant],
    padding,
    disabledStyle,
  ];

  if (className) {
    baseClasses = [...baseClasses, ...className.split(' ')];
  }
  return (
    <button onClick={onClick} className={baseClasses.join(' ')} {...rest}>
      {children}
    </button>
  );
};
