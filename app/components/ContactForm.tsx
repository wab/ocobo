import * as React from 'react';

import { useHydrated } from 'remix-utils/use-hydrated';

import {
  contactFormId,
  createHubSpotForm,
  loadDistroScript,
  loadHubSpotScript,
  scheduleDistro,
} from '~/utils/hubspot';

const ContactForm: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const isHydrated = useHydrated();
  const scriptsLoaded = React.useRef(false);

  React.useEffect(() => {
    if (!isHydrated || scriptsLoaded.current) return;

    loadHubSpotScript()
      .then(() => {
        createHubSpotForm(contactFormId, '.hbspt-form');
        return loadDistroScript();
      })
      .then(() => {
        scheduleDistro(contactFormId);
      })
      .catch((error) => {
        console.error('Error loading scripts', error);
      });

    scriptsLoaded.current = true;
  }, [isHydrated]);

  return (
    <div>
      <div className="hbspt-form" />
      {children}
    </div>
  );
};

export { ContactForm };
