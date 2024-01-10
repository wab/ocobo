import { contactLink } from '~/utils/contact';
import { Section } from './Section';

import { FiCoffee } from 'react-icons/fi';

export function Hero() {
  return (
    <div className="desktop:bg-hero">
      <Section.Container>
        <header className="min-h-[550px] grid-cols-12 items-center gap-4 pt-12 desktop:grid desktop:min-h-[700px]">
          <div className="col-span-5">
            <h1 className="font-title text-4xl font-light tracking-wider lgDesktop:text-6xl">
              Faites plus
              <br /> avec moins
            </h1>
            <p className="mt-8 text-xl leading-relaxed">
              Optimisez votre efficacité commerciale et boostez vos revenus en étant accompagné par
              la première agence française spécialisée en Business Operations.
            </p>
            <p className="mt-8 space-x-2">
              <a
                href={contactLink}
                className="btn btn--primary btn--large btn--outlined"
                target="_blank"
                rel="noreferrer"
              >
                <FiCoffee />
                Discutons-en
              </a>
            </p>
          </div>
          <div className="col-span-7 mt-8 place-items-end self-end">
            <img src="illustrations/hero.svg" alt="" />
          </div>
        </header>
      </Section.Container>
    </div>
  );
}
