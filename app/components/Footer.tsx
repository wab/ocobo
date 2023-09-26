import React from 'react';
import { Section } from './Section';
import { Logo } from './Logo';
import { FaLinkedin } from 'react-icons/fa';
// import { FiBookOpen } from 'react-icons/fi';
import { NavLink, AnchorLink } from '~/components/Link';

const ColumnTitle: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <h2 className="mb-6 text-2xl font-bold">{children}</h2>
);

export function Footer() {
  return (
    <footer className="bg-dark pt-12 text-light">
      <Section.Container>
        <Section.Grid align="top">
          <div className="col-span-3 space-y-6">
            <p className="-mt-2 pb-1">
              <Logo width={140} />
            </p>
            <p>Une communauté d'expert•e•s Business Operations au service de votre entreprise.</p>
            <p>
              Basé à Paris 18,
              <br />
              Nous parlons français et anglais.
            </p>
            <p>&copy; 2022</p>
          </div>
          <div />
          <div className="col-span-2">
            <ColumnTitle>Notre offre</ColumnTitle>
            <ul className="space-y-6">
              <li>
                <NavLink to="/#strategie">Stratégie</NavLink>
              </li>
              <li>
                <NavLink to="/#deploiement">Déploiement</NavLink>
              </li>
              <li>
                <NavLink to="/#organisation">Organisation</NavLink>
              </li>
              <li>
                <NavLink to="/#formation">Formation</NavLink>
              </li>
            </ul>
          </div>
          <div />
          <div className="col-span-2">
            <ColumnTitle>Ocobo</ColumnTitle>
            <ul className="space-y-6">
              <li>
                <NavLink to="/about-us">Qui sommes-nous ?</NavLink>
              </li>
              {/* <li>
                <NavLink to="/jobs">Nous rejoindre</NavLink>
              </li> */}
              <li>
                <AnchorLink
                  href="https://meetings-eu1.hubspot.com/benjamin-boileux/discovery"
                  target="_blank"
                  rel="noreferrer"
                >
                  Nous contacter
                </AnchorLink>
              </li>
              <li>
                <AnchorLink href="/legal/cgu">CGU</AnchorLink>
              </li>
              <li>
                <AnchorLink href="/legal/politique-confidentialite">
                  Politique de confidentialité
                </AnchorLink>
              </li>
              {/* <li>
                <NavLink to="/mentions-legales">Mentions légales</NavLink>
              </li> */}
            </ul>
          </div>
          <div />
          <div className="col-span-2">
            <ColumnTitle>Média</ColumnTitle>
            <ul className="space-y-6">
              {/* <li>
                <NavLink to="/blog">
                  <FiBookOpen />
                  Articles
                </NavLink>
              </li> */}
              <li>
                <AnchorLink
                  href="https://www.linkedin.com/company/ocobofr"
                  className="flex items-center gap-1"
                >
                  <FaLinkedin /> linkedin
                </AnchorLink>
              </li>
            </ul>
          </div>
        </Section.Grid>
      </Section.Container>
    </footer>
  );
}
