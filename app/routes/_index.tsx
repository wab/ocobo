import { json } from '@remix-run/node';

import { Navbar } from '~/components/Navbar';
import { Hero } from '~/components/Hero';
import { Section } from '~/components/Section';
import { Plateforms } from '~/components/Plateforms';
import { Footer } from '~/components/Footer';
import { FiSmile, FiMic } from 'react-icons/fi';
import {
  AiFillFunnelPlot,
  AiOutlineSetting,
  AiOutlineDashboard,
  AiOutlineAim,
  AiOutlineCompass,
  AiOutlineDeploymentUnit,
  AiOutlineHeatMap,
  AiOutlineTrophy,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineClockCircle,
} from 'react-icons/ai';

import { AnchorLink, NavButton } from '~/components/Link';
import { testimonialFromModule } from '~/utils/parsers';

import * as leeway from './testimonial.leeway.mdx';
import * as qare from './testimonial.qare.mdx';
import * as qobra from './testimonial.qobra.mdx';
import type { MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  return json({
    title: 'Ocobo • Business Ops Expert•e•s',
    description:
      'Optimisez votre efficacité commerciale et boostez vos revenus en étant accompagné par la première agence française de conseil en Business Operations.',
    coverImage: 'https://ocobo.co/cover-coral.png',
    testimonials: [
      testimonialFromModule(qobra),
      testimonialFromModule(qare),
      testimonialFromModule(leeway),
    ],
  });
};

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return [
    { title: data?.title },
    { name: 'description', content: data?.description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: data?.title },
    { name: 'og:type', content: 'siteweb' },
    { name: 'og:url', content: `https://ocobo.co${location.pathname}` },
    { name: 'og:description', content: data?.description },
    { name: 'og:image', content: data?.coverImage },
  ];
};

export default function Index() {
  const { testimonials } = useLoaderData<typeof loader>();
  const testimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
  return (
    <div className="relative">
      <Navbar />
      <div className="relative z-0 bg-white leading-relaxed text-dark desktop:pt-28">
        <Hero />
        <Plateforms />
        <Section.Root className="relative z-10 py-0 desktop:-mt-32">
          <Section.Container>
            <Section.Grid className="rounded-lg bg-white p-8 shadow-lg lgDesktop:p-16">
              <div className="col-span-5 hidden desktop:block">
                <img src="/illustrations/about-us.svg" alt="" className="" />
              </div>
              <div />
              <div className="col-span-6">
                <Section.Title>Qui sommes-nous ?</Section.Title>
                <p className="mb-8">
                  Anciens Operations Director, Head of Revenue Ops et Business Analysts, nous avons
                  vécu et soutenu l'hyper-croissance des plus belles startups & scale-ups françaises
                  depuis plus de 10 ans.
                </p>
                <p className="mb-8">
                  Pionniers de la discipline en France, nous mettons à profit cette expérience pour
                  vous proposer le meilleur des méthodologies Business Operations et renforcer la
                  synergie entre vos équipes Sales, Marketing, Customer Success et Finance.
                </p>
                <p>
                  <NavButton to="/about-us" className="btn btn--secondary btn--small">
                    <FiSmile />
                    Découvrez-nous
                  </NavButton>
                </p>
              </div>
            </Section.Grid>
          </Section.Container>
        </Section.Root>
        <Section.Root className="border-b-2 border-light bg-light bg-opacity-20 desktop:-mt-16 desktop:pt-32">
          <Section.Container>
            <Section.Title className="text-center text-current">
              Ils nous font confiance
            </Section.Title>
            <Section.Grid>
              <div className="col-span-1" />
              <div className="col-span-3">
                <div className="h-[240px] w-[240px] overflow-hidden rounded-full border-4 border-mint shadow-lg">
                  <img src={testimonial.coverImage} alt="" className="h-[240px] object-cover" />
                </div>
              </div>
              <div className="col-span-8">
                <img src={testimonial.logo} alt={testimonial.title} className="mb-4 h-10" />

                <p className="mb-4 text-xl italic leading-relaxed">
                  "{testimonial.quotes[Math.floor(Math.random() * testimonial.quotes.length)]}"
                </p>
                <p className="mb-4 text-lg">
                  <strong>{testimonial.guest}</strong> • {testimonial.position}
                </p>
                <p className="mb-4">
                  <NavButton to={`/testimonial/${testimonial.slug}`}>
                    <FiMic /> Lire son témoignage
                  </NavButton>
                </p>
              </div>
            </Section.Grid>
            <div className="p-6 text-center">
              <AnchorLink href="/testimonial">Tous les témoignages</AnchorLink>
            </div>
          </Section.Container>
        </Section.Root>
        <Section.Root>
          <Section.Container>
            <h2 className="mt-6 text-center font-title text-3xl text-current desktop:text-4xl">
              Notre mission : les Ops à 360°
            </h2>
            <Section.Grid hasBorder>
              <div className="col-span-12">
                <img
                  src="/illustrations/360.jpg"
                  alt=""
                  className="mx-auto my-8 w-[400px] max-w-[70vw]"
                />
              </div>
            </Section.Grid>
            <Section.Grid id="strategie" hasBorder>
              <div className="order-2 col-span-5 desktop:order-1">
                <Section.SubTitle>
                  Connectez votre <strong className="font-normal text-fuchsia">stratégie</strong>
                  <br />à la réalité du terrain
                </Section.SubTitle>

                <p className="mb-8">
                  Optimisez vos opérations commerciales et alignez l'ensemble de la chaîne de revenu
                  pour atteindre vos objectifs, en proposant la meilleure expérience à vos clients.
                </p>

                <ul className="space-y-4 italic">
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-fuchsia">
                      <AiOutlineSetting />
                    </div>
                    <div>
                      <strong>Fluidifiez</strong> la coopération entre vos équipes
                      <br /> Sales, Marketing & Customer Success
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-fuchsia">
                      <AiFillFunnelPlot />
                    </div>
                    <div>
                      <strong>Simplifiez</strong> votre funnel de vente
                      <br /> avec des outils et des process rationalisés
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-fuchsia">
                      <AiOutlineDashboard />
                    </div>
                    <div>
                      <strong>Définissez</strong> les meilleurs
                      <br />
                      indicateurs de performance
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-fuchsia">
                      <AiOutlineAim />
                    </div>
                    <div>
                      <strong>Construisez</strong> des plans de commissionnement
                      <br /> motivants et lisibles
                    </div>
                  </li>
                </ul>
              </div>
              <div className="order-1 col-span-6 col-start-7 max-w-[70vw]">
                <img src="/illustrations/strategie.svg" alt="" />
              </div>
            </Section.Grid>
            <Section.Grid id="deploiement" hasBorder>
              <div className="col-span-6 max-w-[70vw]">
                <img src="/illustrations/deploiement.svg" alt="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-5">
                <Section.SubTitle>
                  Confiez-nous le
                  <br />
                  <strong className="font-normal text-blue">déploiement</strong> opérationnel
                </Section.SubTitle>
                <p>Laissez vos équipes se concentrer sur ce qu’elles ont à faire&nbsp;!</p>
                <p className="mb-8">
                  Appuyez-vous sur nos meilleurs profils Ops pour construire et automatiser des
                  solutions de process, outils et analytics à fort impact, qui amélioreront la vie
                  de vos équipes.
                </p>
                <ul className="space-y-4 italic">
                  <li className="flex gap-4">
                    <div className="pt-2 text-3xl text-blue">
                      <AiOutlineShop />
                    </div>
                    <div>
                      <strong className="block">Ops as a Service&nbsp;:</strong>
                      laissez-nous construire et déployer vos solutions clés en main
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="pt-2 text-3xl text-blue">
                      <AiOutlineShoppingCart />
                    </div>
                    <div>
                      <strong className="block">Équipez-vous&nbsp;:</strong>
                      nous renforçons vos équipes de façon ponctuelle ou permanente pour vous aider
                      à créer des outils qui cartonnent.
                    </div>
                  </li>
                </ul>
              </div>
            </Section.Grid>
            <Section.Grid id="organisation" hasBorder>
              <div className="order-2 col-span-5 desktop:order-1">
                <Section.SubTitle>
                  Développez votre <strong className="font-normal text-papaya">organisation</strong>
                  <br /> Business Operations
                </Section.SubTitle>
                <p className="mb-4">
                  Déployez la meilleure <strong>organisation orientée opérations</strong>.
                </p>
                <p className="mb-8">
                  Business Operations Managers, Operations Engineers, Revenue Analysts, Strategic
                  Project Managers, Enablement Managers… nous connaissons ces métiers sur le bout
                  des doigts.
                </p>
                <ul className="space-y-4 italic">
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-papaya">
                      <AiOutlineCompass />
                    </div>
                    <div>
                      <strong>Définissez</strong> une gouvernance Ops
                      <br />
                      au sein de l'entreprise
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-papaya">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <div>
                      <strong>Organisez</strong> vos équipes Ops
                      <br />
                      et attirez les meilleurs profils
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-papaya">
                      <AiOutlineHeatMap />
                    </div>
                    <div>
                      <strong>Développez</strong> vos parcours de carrières
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-papaya">
                      <AiOutlineTrophy />
                    </div>
                    <div>
                      <strong>Coachez</strong> vos équipes
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-span-1" />
              <div className="order-1 col-span-6 col-start-7 max-w-[70vw]">
                <img src="/illustrations/organisation.svg" alt="" />
              </div>
            </Section.Grid>
            <Section.Grid id="formations">
              <div className="col-span-6 max-w-[70vw]">
                <img src="/illustrations/formation.svg" alt="" />
              </div>
              <div className="col-span-1" />
              <div className="col-span-5">
                <Section.SubTitle>
                  Accédez à des <br />
                  <strong className="font-normal text-mint">formations</strong> personnalisées
                </Section.SubTitle>
                <p className="mb-4">
                  <strong>Renforcez</strong> vos compétences et celles de vos équipes.
                </p>
                <p className="mb-8">
                  Nous formons vos Business Operations Managers à nos méthodes de travail pour les
                  aider à identifier et adresser les problèmes communs de vos équipes.
                </p>
                <ul className="space-y-4 italic">
                  <li className="flex items-center gap-4">
                    <div className="text-3xl text-mint">
                      <AiOutlineClockCircle />
                    </div>
                    Bientôt disponible
                  </li>
                </ul>
              </div>
            </Section.Grid>
          </Section.Container>
        </Section.Root>
      </div>
      <Footer />
    </div>
  );
}
