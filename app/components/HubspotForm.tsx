import * as React from 'react';

import { portalId } from '~/utils/hubspot';

interface HubspotFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formId: string;
}

const HubspotForm: React.FunctionComponent<HubspotFormProps> = ({
  formId,
  ...props
}) => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @ts-expect-error - hbspt is a global variable
      if (window.hbspt) {
        // @ts-expect-error - hbspt is a global variable
        window.hbspt.forms.create({
          region: 'eu1',
          portalId,
          formId,
          target: `#hubspotForm-${formId}`,
        });
      }
    });
  }, [formId]);

  return <div id={`hubspotForm-${formId}`} {...props} />;
};

export { HubspotForm };
