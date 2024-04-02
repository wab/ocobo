import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

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
      <div>
        <h1>RevOps pour Entreprises Modernes.</h1>
        <p>
          <strong>
            Agence leader en Revenue Operations et Stratégies Revenus B2B & B2C
          </strong>
        </p>
        <p>
          Nous vous aidons à transformer l’organisation et les processus de vos
          équipes Revenues pour les rendre plus performantes et vous permettre
          d’atteindre vos objectifs de croissance et de rentabilité.
        </p>
        <Link to="/contact">Prendre rendez-vous</Link>
      </div>
      <div>
        <h2>Plus vite à vos fins.</h2>
        <p>
          Profitez de la double compétence métier et technique de ceux qui l’ont
          déjà fait. Atteignez vos objectifs et accélérez les initiatives de vos
          équipes Revenues - Marketing, Sales, Clients - grâce aux meilleures
          stratégies RevOps, et de l’aide d’experts intégrés à votre équipe.
          Nous évaluons votre organisation, identifions les bons leviers de
          croissance et travaillons dans le détail avec vous pour y parvenir.
        </p>
        <ul>
          <li>Faites plus avec moins de ressources</li>
          <li>
            Gagnez en performance avec des stratégies et des process de pointe
          </li>
          <li>Planifiez, lancez et scalez des projets RevOps</li>
        </ul>
      </div>
    </div>
  );
}
