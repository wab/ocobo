import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ocobo | Votre rendez-vous avec un expert RevOps" },
    {
      name: "description",
      content:
        "Présentez vos problématiques à un expert des Revenus Operations Ocobo.",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <div>
        <h1>
          Rencontrez un vrai spécialiste des Revenue Operations. Pas un SDR ni
          un BDR.
        </h1>
        <p>
          Après avoir rempli le formulaire, vous serez invité à choisir un
          horaire de rendez-vous.
        </p>
        <p>
          Lors de notre premier échange, nous déterminons si, et comment, nous
          pouvons vous aider.
        </p>
        <p>
          Ensuite, nous élaborons pour vous un plan sur mesure, que nous
          exécuterons pour atteindre ensemble vos objectifs.
        </p>
      </div>
    </div>
  );
}
