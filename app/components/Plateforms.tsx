import React from 'react';

const LogoImage: React.FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img className="mx-auto max-h-[40px] max-w-[80px] grayscale" {...props} /> //eslint-disable-line jsx-a11y/alt-text
);

export function Plateforms() {
  return (
    <div className="hidden border-t-2 border-light bg-light bg-opacity-20 px-4 pb-28 pt-8 desktop:block">
      <ul className="grid grid-cols-6 items-center justify-center gap-8 lgDesktop:grid-cols-12">
        <li className="text-center">
          <LogoImage src="/plateforms/salesforce.png" alt="salesforce" />
        </li>
        <li>
          <LogoImage src="/plateforms/hubspot.png" alt="hubspot" />
        </li>
        <li>
          <LogoImage src="/plateforms/zendesk.png" alt="zendesk" />
        </li>
        <li>
          <LogoImage src="/plateforms/intercom.svg" alt="intercom" />
        </li>
        <li>
          <LogoImage src="/plateforms/amalia.png" alt="amalia" />
        </li>
        <li>
          <LogoImage src="/plateforms/tableau.png" alt="tableau" />
        </li>
        <li>
          <LogoImage src="/plateforms/qobra.png" alt="qobra" />
        </li>
        <li>
          <LogoImage src="/plateforms/gainsight.png" alt="gainsight" />
        </li>
        <li>
          <LogoImage src="/plateforms/chargebee.png" alt="chargebee" />
        </li>
        <li>
          <LogoImage src="/plateforms/planhat.png" alt="planhat" />
        </li>
        <li>
          <LogoImage src="/plateforms/echobot.png" alt="echobot" />
        </li>
        <li>
          <LogoImage src="/plateforms/zapier.png" alt="zapier" />
        </li>
      </ul>
    </div>
  );
}
