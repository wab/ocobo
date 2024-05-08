import en_common from '../../locales/en/common.json';
import en_contact from '../../locales/en/contact.json';
import en_home from '../../locales/en/home.json';
import en_projects from '../../locales/en/projects.json';
import en_strategy from '../../locales/en/strategy.json';
import fr_common from '../../locales/fr/common.json';
import fr_contact from '../../locales/fr/contact.json';
import fr_home from '../../locales/fr/home.json';
import fr_projects from '../../locales/fr/projects.json';
import fr_strategy from '../../locales/fr/strategy.json';

export const languages = ['en', 'fr'] as const;

export const resources = {
  fr: {
    common: fr_common,
    home: fr_home,
    strategy: fr_strategy,
    projects: fr_projects,
    contact: fr_contact,
  },
  en: {
    common: en_common,
    home: en_home,
    strategy: en_strategy,
    projects: en_projects,
    contact: en_contact,
  },
};

export type Language = (typeof languages)[number];

export const returnLanguageIfSupported = (
  lang?: string,
): Language | undefined => {
  if (languages.includes(lang as Language)) {
    return lang as Language;
  }
  return undefined;
};
