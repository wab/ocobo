import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

import i18nServer from "~/localization/i18n.server";
import { getLang } from "~/utils/lang";

export async function loader({ params }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(getLang(params), "contact");
  return json({
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    { name: "description", content: data?.description },
  ];
};
export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <h1>{t("title", { ns: "contact" })}</h1>
        <p>{t("desc.1", { ns: "contact" })}</p>
        <p>{t("desc.2", { ns: "contact" })}</p>
        <p>{t("desc.3", { ns: "contact" })}</p>
      </div>
    </div>
  );
}
