import { Link, useLocation, useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { supportedLngs } from "~/localization/i18n";
import { getLang } from "~/utils/lang";

const LanguageSwitcher = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const lang = getLang(params);
  const { t, i18n } = useTranslation();

  const convertPathname = (lng: string) => {
    return pathname.replace(`/${lang}`, `/${lng}`);
  };

  return (
    <ul>
      {supportedLngs.map((lng) => (
        <li key={lng}>
          <Link
            to={convertPathname(lng)}
            onClick={() => {
              i18n.changeLanguage(lng);
            }}
            reloadDocument
          >
            {t(`common:language.${lng}`)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export { LanguageSwitcher };
