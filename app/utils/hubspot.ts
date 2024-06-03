export const portalId = '27107933';
export const contactFormId = '9e81b014-cc4a-4f34-abdf-c3f3b0adacd7';
export const newsletterFormId = '386c07f1-1344-4019-afcb-39a8279db08c';

export const loadHubSpotScript = () => {
  return new Promise((resolve, reject) => {
    // const existingScript = document.getElementById('hs-form-script-loader');
    // if (existingScript) {
    //   console.log('HubSpot script already loaded');
    //   return resolve('HubSpot script already loaded');
    // }
    const script = document.createElement('script');
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.defer = true;
    // script.id = 'hs-form-script-loader';
    script.onload = () => {
      console.log('HubSpot script loaded');
      resolve('HubSpot script loaded');
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export const loadDistroScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://app.distro.so/inbound.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Distro script loaded');
      resolve('Distro script loaded');
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export const createHubSpotForm = (contactFormId: string, target: string) => {
  // @ts-expect-error - hbspt is a global variable
  window.hbspt.forms.create({
    region: 'eu1',
    portalId,
    formId: contactFormId,
    target,
  });
};

export const scheduleDistro = (contactFormId: string) => {
  // @ts-expect-error - distro is a global variable
  window.distro = new window.Distro({ routerId: '9' });
  // @ts-expect-error - distro is a global variable
  window.distro.schedule(`hsForm_${contactFormId}`);
};
