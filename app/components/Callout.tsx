import * as React from 'react';

export const Callout: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
  return (
    <aside className="rounded-lg border-2 border-dashed border-papaya bg-papaya bg-opacity-10 p-8">
      {children}
    </aside>
  );
};
