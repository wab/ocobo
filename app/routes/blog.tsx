import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "'Ocobo • le Nouvel Ops" },
    {
      name: "description",
      content:
        "Ocobo Le Nouvel Ops, c'est le média qui accompagne les Business Ops d'aujourd'hui et de demain. L’idée ? Vous éclairer sur diverses thématiques en vous partageant des articles sur les tendances du marché, les méthodologies, les bonnes pratiques & benchmarks qui gravitent autour de notre passionnant métier",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <header>
        <h1>Le nouvel ops</h1>
        <Link to="/">Retour à l&apos;accueil</Link>
      </header>
      <Outlet />
    </div>
  );
}
