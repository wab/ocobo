import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ocobo | Agence RevOps & Stratégies Revenus" },
    {
      name: "description",
      content:
        "Ocobo vous permet de faire plus avec moins. Organisez vos équipes, déployez des processus de pointe et boostez vos performances.",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <div>la liste des articles</div>
    </div>
  );
}
