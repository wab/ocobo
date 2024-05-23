import * as React from 'react';

import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form';

import { contactFormId, portalId } from '~/utils/hubspot';

import { HubspotFormWrapper } from './ui/HubspotFormWrapper';
import { Loader } from './ui/Loader';

const ContactForm: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [isFormReady, setIsFormReady] = React.useState(false);
  useHubspotForm({
    portalId,
    formId: contactFormId,
    target: '#contactForm',
    cssClass: 'contact-form',
    onFormReady: () => setIsFormReady(true),
  });

  return (
    <>
      {!isFormReady && <Loader />}
      <HubspotFormWrapper id="contactForm" {...props} />
    </>
  );
};

export { ContactForm };
