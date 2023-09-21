import * as React from 'react';
import { clsx } from 'clsx';

export const Tag: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
  const isOrganisation = children === 'organisation';
  const isDeployment = children === 'déploiement';
  const isStrategy = children === 'stratégie';
  const isTraining = children === 'formation';
  const isOther = !isOrganisation && !isDeployment && !isStrategy && !isTraining;

  return (
    <span
      className={clsx(
        isOrganisation && 'bg-papaya text-papaya',
        isDeployment && 'bg-blue text-blue',
        isStrategy && 'bg-fuchsia text-fuchsia',
        isTraining && 'bg-mint text-mint',
        isOther && 'bg-sand text-sand',
        'whitespace-nowrap rounded bg-opacity-20 px-2.5 py-0.5 text-xs font-medium',
      )}
    >
      {children}
    </span>
  );
};
