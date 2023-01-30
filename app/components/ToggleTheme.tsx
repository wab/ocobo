import { Theme, useTheme } from '~/utils/theme-provider';
import { FiMoon, FiSun } from 'react-icons/fi';

export function ToggleTheme() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (
    <button
      className="transition-colors duration-300 ease-in-out hover:text-coral dark:text-light dark:hover:text-coral"
      onClick={toggleTheme}
    >
      <div className="relative top-[2px]">{theme === Theme.LIGHT ? <FiMoon /> : <FiSun />}</div>
    </button>
  );
}
