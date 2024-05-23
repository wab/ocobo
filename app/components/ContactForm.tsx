import * as React from 'react';

import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form';
import { useHydrated } from 'remix-utils/use-hydrated';

import { contactFormId, portalId } from '~/utils/hubspot';

import { HubspotFormWrapper } from './ui/HubspotFormWrapper';
import { Loader } from './ui/Loader';

const ContactForm: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const isHydrated = useHydrated();
  const [isFormReady, setIsFormReady] = React.useState(false);
  useHubspotForm({
    portalId,
    formId: contactFormId,
    target: '#contactForm',
    cssClass: 'contact-form',
    onFormReady: () => setIsFormReady(true),
  });

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {!isFormReady && <Loader />}
      <HubspotFormWrapper id="contactForm" {...props} />

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
                window.distro = new Distro({ routerId: '9' })
                distro.schedule('hsForm_${contactFormId}')
              `,
        }}
      />
    </>
  );
};

export { ContactForm };
