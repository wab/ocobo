import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { LocalizedLink } from "./LocalizedLink";

const Navigation = () => {
  const { t, i18n } = useTranslation();

  return (
    <nav>
      <ul>
        <li>
          <LocalizedLink to="/">
            {t("navigation.home", { ns: "common" })}
          </LocalizedLink>
        </li>
        <li>
          <LocalizedLink to="/contact">
            {t("navigation.contact", { ns: "common" })}
          </LocalizedLink>
        </li>
        {i18n.language === "fr" && (
          <li>
            <Link to="/blog" reloadDocument>
              Le nouvel ops
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export { Navigation };
