import * as React from 'react';

import { useHydrated } from 'remix-utils/use-hydrated';

import {
  createHubSpotForm,
  scheduleDistro,
  contactFormId,
  loadHubSpotScript,
  loadDistroScript,
} from '~/utils/hubspot';

const ContactForm: React.FunctionComponent = () => {
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

  return <div className="hbspt-form" />;
};

export { ContactForm };
