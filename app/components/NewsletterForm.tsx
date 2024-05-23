import * as React from 'react';

import { newsletterFormId } from '~/utils/hubspot';

import { HubspotForm } from './HubspotForm';

const NewsletterForm: React.FunctionComponent = () => {
  return <HubspotForm formId={newsletterFormId} />;
};

NewsletterForm.displayName = 'NewsletterForm';

export { NewsletterForm };
