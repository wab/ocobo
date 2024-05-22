import * as React from 'react';

import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form';

import { newsletterFormId, portalId } from '~/utils/hubspot';

import { HubspotFormWrapper } from './ui/HubspotFormWrapper';

const NewsletterForm: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  useHubspotForm({
    portalId,
    formId: newsletterFormId,
    target: '#newsletterForm',
  });

  return (
    <HubspotFormWrapper id="newsletterForm" {...props}></HubspotFormWrapper>
  );
};

NewsletterForm.displayName = 'NewsletterForm';

export { NewsletterForm };
