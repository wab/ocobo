import * as React from 'react';

function setHeightProperty() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export const useSetViewportHeight = () => {
  return React.useEffect(() => {
    setHeightProperty();
    window.addEventListener('resize', setHeightProperty);
    return () => {
      window.removeEventListener('resize', setHeightProperty);
    };
  }, []);
};
