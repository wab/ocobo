import en_common from "../../locales/en/common.json";
import en_contact from "../../locales/en/contact.json";
import en_home from "../../locales/en/home.json";
import fr_common from "../../locales/fr/common.json";
import fr_contact from "../../locales/fr/contact.json";
import fr_home from "../../locales/fr/home.json";

export const languages = ["en", "fr"] as const;

export const resources = {
  fr: { common: fr_common, home: fr_home, contact: fr_contact },
  en: { common: en_common, home: en_home, contact: en_contact },
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
