import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { Navbar } from '~/components/Navbar';
import { Footer } from '~/components/Footer';
import { AnchorLink } from '~/components/Link';
import { FiTv, FiCloud } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

export const loader = async () => {
  return json({
    title: "Ocobo • l'équipe",
    description:
      "Anciens Operations Director, Head of Revenue Ops et Business Analysts, nous avons vécu et soutenu l'hyper-croissance des plus belles startups & scale-ups françaises depuis plus de 10 ans.",
    coverImage: 'https://ocobo.co/illustrations/about-us.svg',
  });
};

export const meta: MetaFunction = ({ data, location }) => {
  return {
    title: data.title,
    description: data.description,
    'twitter:card': 'summary_large_image',
    'og:title': data.title,
    'og:type': 'article',
    'og:url': `https://ocobo.co${location.pathname}`,
    'og:description': data.description,
    'og:image': data.coverImage,
  };
};

export default function Index() {
  return (
    <div className="relative">
      <Navbar />
      <div className="relative z-0 bg-white  leading-relaxed text-dark desktop:pt-28">
        <div className="container mx-auto px-4 py-12">
          <div className="grid-cols-12 items-center gap-8 border-b border-light pb-12 desktop:grid">
            <div className="col-span-4 mb-8">
              <img src="/illustrations/about-us.svg" alt="" className="" />
            </div>
            <div />
            <div className="col-span-7 space-y-4">
              <h1 className="font-title text-4xl">À propos d’Ocobo</h1>
              <p>
                L’équipe fondatrice d’<strong>Ocobo</strong> s'est rencontrée et a travaillé
                ensemble chez <strong>TheFork/Tripadvisor</strong> dans l'équipe{' '}
                <strong>Business Operations</strong>, qui a vu en 5 ans l’entreprise évoluer de 200
                à 1000+ employés et opérer dans plus de 20 pays.
              </p>
              <p>
                Au-delà de cette expérience commune, leurs parcours variés dans des scale-ups en
                forte croissance, parmi lesquelles <strong>Spendesk</strong> et{' '}
                <strong>Yousign</strong>, ou en <strong>cabinet de conseil</strong>, leur permettent
                aujourd’hui de s’affirmer en tant qu’experts des thématiques liées aux opérations
                commerciales : process et outils commerciaux, suivi de la performance, organisation,
                compensation, pricing, CRM, automatisation, customer journey, retention, scoring ou
                encore forecasting.
              </p>
              <p>
                Présents depuis la création, ils sont membres actifs de la communauté{' '}
                <a
                  className="font-bold underline hover:text-coral"
                  href="https://businessops.io/nous-rejoindre"
                >
                  Business Ops Network
                </a>
                , fondée par Aude en octobre 2019, qui rassemble aujourd’hui plus de 1000 membres.
                Ils participent à l’animation de différents meet-ups sur des sujets d’organisation
                en Ops, afin d’échanger sur des problématiques communes et de partager les bonnes
                pratiques de la discipline.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-3 items-center gap-12 border-b border-light py-12">
            <li>
              <img
                src="/team/benjamin.jpeg"
                alt="Benjamin Boileux"
                className="mx-auto w-full max-w-[240px] rounded-full border-8 border-mint shadow-lg"
              />
            </li>
            <li>
              <img
                src="/team/aude.jpeg"
                alt="Aude Cadiot"
                className="mx-auto w-full max-w-[240px] rounded-full border-8 border-papaya shadow-lg"
              />
            </li>

            <li>
              <img
                src="/team/corentin.jpeg"
                alt="Corentin Guérin"
                className="mx-auto w-full max-w-[240px] rounded-full border-8 border-blue shadow-lg"
              />
            </li>
          </ul>
          <div className="grid-cols-12 gap-12 py-12 desktop:grid">
            <div className="col-span-7 space-y-4">
              <h1 className="font-title text-3xl text-mint">Benjamin Boileux</h1>
              <p>
                Ingénieur Systèmes d’Info de formation, Benjamin possède plus de 12 ans d’expérience
                dans les Operations, le CRM et le Product Management.
              </p>
              <p>
                Il débute sa carrière au sein du GIE Comutitres où il gère l’évolution du CRM des
                clients Navigo d’Île-de-France et la construction de marchés publics dans la gestion
                de la relation client.
              </p>
              <p>
                Il rejoint <strong>TheFork/Tripadvisor</strong> en 2015 en tant que{' '}
                <strong>Sales & Service Ops Manager</strong> puis{' '}
                <strong>responsable de l’équipe produit</strong> en charge des sujets Ops. Il
                associe méthodologies de développement en Product Management et Ops pour soutenir la
                croissance des équipes Revenue TheFork mais aussi Tripadvisor Restaurants monde dans
                l’atteinte de leurs objectifs.
              </p>
              <p>
                Sa dernière expérience en scale-up post-série A chez <strong>Yousign</strong> (de 90
                à 200 employés en 18 mois) en tant que <strong>Directeur des Opérations</strong>,
                lui offre l’opportunité de construire de zéro une équipe Business Ops d’une
                quinzaine de personnes aux profils variés. Il dirige la refonte complète de
                l’organisation commerciale, ainsi que des process, des outils, de l’analytics et des
                plans compensation au service de la nouvelle stratégie de l’entreprise.
              </p>
            </div>
            <div />
            <aside className="col-span-4 mt-8 rounded-lg border-2 border-dashed border-mint bg-mint bg-opacity-10 p-4 text-sm desktop:mt-0">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <FiCloud /> Réseaux
              </h3>
              <ul className="mb-4 space-y-2">
                <li>
                  <AnchorLink target="_blank" href="https://www.linkedin.com/in/benjaminboileux/">
                    <FaLinkedin />
                    Linkedin
                  </AnchorLink>
                </li>
              </ul>
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <FiTv /> Articles, Events & Webinars
              </h3>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://www.maddyness.com/2021/12/07/sales-ops-element-cle-structurer-strategie-commerciale/"
                    isUnderline
                  >
                    Les Sales Ops, élément clé pour structurer sa stratégie commerciale
                  </AnchorLink>
                  <span className="text-sm italic">Podcast chez Maddyness</span>
                </li>
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://www.avizio.fr/expert-insight/sales-ops-perf"
                    isUnderline
                  >
                    Sales Ops & Perf : Like a Sales Machine !
                  </AnchorLink>
                  <span className="text-sm italic">Webinar organisé par Avizio</span>
                </li>
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://docs.google.com/presentation/d/17yz5drFH0FNqx975lfLchyu2b1Y4HuEXJN_L_kGuzH4/edit#slide=id.p"
                    isUnderline
                  >
                    Structurer son équipe RevOps
                  </AnchorLink>
                  <span className="text-sm italic">Meet-up organisé par Business Ops Network</span>
                </li>
              </ul>
            </aside>
            <div className="col-span-12 my-8 border-b border-light desktop:my-0" />
            <div className="col-span-7 space-y-4">
              <h1 className="font-title text-3xl text-papaya">Aude Cadiot</h1>
              <p>Aude a plus de 8 ans d'expérience dans les Revenue Operations.</p>
              <p>
                Aude commence chez <strong>TheFork/TripAdvisor</strong> en tant que{' '}
                <strong>Sales Operations</strong> puis évolue en tant que{' '}
                <strong>Business Analyst</strong>.
              </p>
              <p>
                Elle rejoint par la suite, <strong>Spendesk</strong> (post-Série A) en tant que{' '}
                Customer Success Operations, puis évolue en tant que{' '}
                <strong>Head of Revenue Operations</strong> voyant l’organisation évoluer de 80 à
                600+ employés.
              </p>
              <p>
                Durant cette expérience, elle répond à de nombreuses problématiques autour du
                Customer Journey, de l’efficacité des équipes commerciales et Customer Success
                (outils, process et plans de compensation), mais également des enjeux
                d’organisation, de retention et de recrutement d’une équipe Revenue Operations, qui
                a évolué de 2 à 25+ personnes.
              </p>
              <p>
                En parallèle, Aude est très active sur la scène Business Ops en France, notamment à
                travers la création de Business Operations Network.
              </p>
            </div>
            <div />
            <aside className="col-span-4 mt-8 rounded-lg border-2 border-dashed border-papaya bg-papaya bg-opacity-10 p-4 text-sm desktop:mt-0">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <FiCloud /> Réseaux
              </h3>
              <ul className="mb-4 space-y-2">
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://www.linkedin.com/in/aude-cadiot-9597096b/"
                  >
                    <FaLinkedin />
                    Linkedin
                  </AnchorLink>
                </li>
              </ul>
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <FiTv /> Articles, Events & Webinars
              </h3>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://www.spendesk.com/blog/customer-success-operations-team/"
                    isUnderline
                  >
                    How to build an effective customer success operations team
                  </AnchorLink>
                  <span className="text-sm italic">Article écrit pour Spendesk</span>
                </li>
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://www.youtube.com/watch?v=a4qi_xMF8SU"
                    isUnderline
                  >
                    Comment passer au niveau supérieur en abandonnant Excel pour un logiciel de
                    calcul des commissions ?
                  </AnchorLink>
                  <span className="text-sm italic">Webinar organisé par Qobra</span>
                </li>
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://www.youtube.com/watch?v=H8YRO72PcvQ&list=PLEx1Y46sk1Y_MYTBzgkhu5xX-KXAbVybF"
                    isUnderline
                  >
                    Meet-up BizOps - C'est la rentrée - CSM x Ops : Quelle stack d’outils pour
                    quelle organisation ?
                  </AnchorLink>
                  <span className="text-sm italic">
                    Meet-up organisé pour Business Operations Network
                  </span>
                </li>
                <li>
                  <AnchorLink
                    target="_blank"
                    href="https://www.followtribes.io/customer-success-score-de-sante/"
                    isUnderline
                  >
                    Pourquoi créer un Health Score, ou score de santé ?
                  </AnchorLink>
                  <span className="text-sm italic">Contributeur pour Follow Tribes</span>
                </li>
              </ul>
            </aside>
            <div className="col-span-12 my-8 border-b border-light desktop:my-0" />
            <div className="col-span-7 space-y-4">
              <h1 className="font-title text-3xl text-blue">Corentin Guérin</h1>
              <p>
                Corentin travaille depuis plus de 8 ans dans le domaine des Business Operations et
                du conseil.
              </p>
              <p>
                Formé à la finance d’entreprise, Corentin démarre sa carrière en fonds
                d’investissement puis en conseil, chez <strong>Deloitte</strong>, où il accompagne
                différents acteurs sur leurs opérations de M&A, au sein de l’équipe Transactions
                Services.
              </p>
              <p>
                Corentin rejoint Aude et Benjamin chez <strong>TheFork</strong> en tant que{' '}
                <strong>Business Analyst</strong>, où il évolue ensuite en tant que{' '}
                <strong>Sales Ops</strong> puis <strong>Business Ops Manager</strong>.
              </p>
              <p>
                En parallèle de la gestion de projets stratégiques Ops, Corentin se spécialise sur
                les sujets de compensation, de pricing, de forecasting/modelling et de suivi de la
                performance. Il design, gère et automatise notamment une dizaine de plans de
                commissions pour 500+ commerciaux dans 10+ pays, et participe à la refonte complète
                du pricing B2B.
              </p>
              <p>
                Après 4 ans chez <strong>TheFork</strong>, Corentin se lance dans{' '}
                <strong>l’entrepreneuriat</strong> et effectue des missions indépendantes autour des
                sujets Ops dans des startups/scale-ups à forte croissance.
              </p>
            </div>
            <div />
            <aside className="col-span-4 mt-8 rounded-lg border-2 border-dashed border-blue bg-blue bg-opacity-10 p-4 text-sm desktop:mt-0">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <FiCloud /> Réseaux
              </h3>
              <ul className="mb-8 space-y-2">
                <li>
                  <AnchorLink target="_blank" href="https://www.linkedin.com/in/corentinguerin/">
                    <FaLinkedin />
                    Linkedin
                  </AnchorLink>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
