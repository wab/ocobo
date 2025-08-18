import { Params } from 'react-router';

import { type Language, languages } from '~/localization/resources';

export function getLang(params: Params<string>) {
  const lang = params.lang ?? 'fr';

  if (!languages.includes(lang as Language)) {
    throw new Response(null, {
      status: 404,
      statusText: `Not Found: Invalid language ${lang}`,
    });
  }
  return lang as Language;
}

export function getLocaleFromPathname(pathname: string) {
  return pathname.split('/')[1] as Language;
}
