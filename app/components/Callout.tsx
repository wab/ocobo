import * as React from 'react';
import clsx from 'clsx';

export const Callout: React.FunctionComponent<
  React.PropsWithChildren<{ variant?: 'papaya' | 'blue' | 'mint' | 'fuchsia' }>
> = ({ children, variant = 'papaya' }) => {
  return (
    <aside
      className={clsx(
        'rounded-lg border-2 border-dashed border-papaya bg-papaya bg-opacity-10 px-6 py-4',
        variant === 'papaya' && 'border-papaya bg-papaya bg-opacity-10',
        variant === 'blue' && 'border-blue bg-blue bg-opacity-10',
        variant === 'mint' && 'border-mint bg-mint bg-opacity-10',
        variant === 'fuchsia' && 'border-fuchsia bg-fuchsia bg-opacity-10',
      )}
    >
      {children}
    </aside>
  );
};
