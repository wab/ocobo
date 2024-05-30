import * as React from 'react';

import { useHydrated } from 'remix-utils/use-hydrated';

import {
  createHubSpotForm,
  scheduleDistro,
  contactFormId,
} from '~/utils/hubspot';

const ContactForm: React.FunctionComponent = () => {
  const isHydrated = useHydrated();

  React.useEffect(() => {
    if (!isHydrated) return;

    createHubSpotForm(contactFormId, '.hbspt-form');
    scheduleDistro(contactFormId);
  }, [isHydrated]);

  return <div className="hbspt-form" />;
};

export { ContactForm };
