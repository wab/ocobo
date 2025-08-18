import * as React from 'react';

import { useHydrated } from 'remix-utils/use-hydrated';

import {
  createHubSpotForm,
  loadHubSpotScript,
  newsletterFormId,
} from '~/utils/hubspot';

const NewsletterForm: React.FunctionComponent<{
  className?: string;
}> = ({ className }) => {
  const isHydrated = useHydrated();
  const scriptsLoaded = React.useRef(false);

  React.useEffect(() => {
    if (!isHydrated || scriptsLoaded.current) return;
    loadHubSpotScript()
      .then(() => {
        createHubSpotForm(newsletterFormId, '.newsletter-form');
      })
      .catch((error) => {
        console.error('Error loading scripts', error);
      });
    scriptsLoaded.current = true;
  }, [isHydrated]);

  return <div className={`newsletter-form ${className || ''}`} />;
};

NewsletterForm.displayName = 'NewsletterForm';

export { NewsletterForm };
