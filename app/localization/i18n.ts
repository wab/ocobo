import { languages, resources } from './resources';

// This is the list of languages your application supports
export const supportedLngs = [...languages];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = 'fr';

// The default namespace of i18next is "translation", but you can customize it
// here
export const defaultNS = 'common';

export { resources };

// export const debug = process.env.NODE_ENV !== "production";
