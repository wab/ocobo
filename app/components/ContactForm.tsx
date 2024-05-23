import * as React from 'react';

import { contactFormId } from '~/utils/hubspot';

import { HubspotForm } from './HubspotForm';

const ContactForm: React.FunctionComponent = () => {
  return <HubspotForm formId={contactFormId} />;
};

export { ContactForm };
