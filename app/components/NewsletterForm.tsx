import * as React from 'react';

import { useHydrated } from 'remix-utils/use-hydrated';

import { createHubSpotForm, newsletterFormId } from '~/utils/hubspot';

const NewsletterForm: React.FunctionComponent = () => {
  const isHydrated = useHydrated();

  React.useEffect(() => {
    if (!isHydrated) return;

    createHubSpotForm(newsletterFormId, '.newsletter-form');
  }, [isHydrated]);

  return <div className="newsletter-form" />;
};

NewsletterForm.displayName = 'NewsletterForm';

export { NewsletterForm };
