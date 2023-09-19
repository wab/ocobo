import * as React from 'react';

const HubspotForm: React.FunctionComponent<{
  formId: string;
}> = ({ formId }) => {
  React.useEffect(() => {
    // @ts-ignore
    const portalId = window.ENV.HUBSPOT_PORTAL_ID;
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @ts-ignore
      if (window.hbspt) {
        // @ts-ignore
        window.hbspt.forms.create({
          region: 'eu1',
          portalId,
          formId,
          target: '#hubspotForm',
        });
      }
    });
  }, [formId]);

  return (
    <div className="rounded-md bg-blue bg-opacity-20 p-8 shadow-sm">
      <div id="hubspotForm" />
    </div>
  );
};

export { HubspotForm };
