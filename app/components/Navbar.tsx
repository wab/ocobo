import { Baseline } from './Baseline';
import { FiCalendar, FiMic, FiSmile } from 'react-icons/fi';
import { ImNewspaper } from 'react-icons/im';
import { Logo } from '~/components/Logo';
import { NavLink } from '~/components/Link';

const mailto = `benjamin.boileux@ocobo.co?bcc=alexis.michel@ocobo.co&subject=1er%20rdv%20de%20discussion&body=Bonjour%20l'%C3%A9quipe%20Ocobo%2C%0D%0A%0D%0AJ'aimerais%20d%C3%A9couvrir%20vos%20services%20afin%20de%20d%C3%A9terminer%20si%20vous%20pouvez%20m'aider%20%C3%A0%20d%C3%A9velopper%20ma%20soci%C3%A9t%C3%A9.%0D%0A%0D%0AVoici%20mes%20prochaines%20disponibilit%C3%A9s%20%3A%0D%0A%0D%0A-%20remplacer%0D%0A-%20remplacer%0D%0A%0D%0ACordialement%2C`;

export function Navbar() {
  return (
    <div className="z-10 w-full bg-white bg-opacity-90 text-dark desktop:fixed">
      <div className="border-b-2 border-light border-opacity-20 bg-white bg-opacity-20">
        <div className="container mx-auto px-4">
          <nav className="items-center gap-4 py-4 desktop:flex desktop:h-28">
            <div className="mr-auto">
              <NavLink to="/" className="">
                <Logo width={150} className="text-dark" />
              </NavLink>
              <Baseline />
            </div>
            <ul className="flex flex-col gap-4 py-4 font-title desktop:flex-row desktop:items-center">
              <li>
                <NavLink to="/about-us">
                  <FiSmile />
                  Qui sommes-nous ?
                </NavLink>
              </li>
              <li>
                <NavLink to="/testimonial">
                  <FiMic />
                  Témoignages clients
                </NavLink>
              </li>
              <li>
                <NavLink to="/media">
                  <ImNewspaper />
                  Le Nouvel Ops
                </NavLink>
              </li>
              <li>
                <a href={`mailto:${mailto}`} className="btn btn--small btn--secondary">
                  <FiCalendar />
                  Prenez rendez-vous
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
