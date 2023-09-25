import { Baseline } from './Baseline';
import { FiCalendar, FiMic, FiSmile } from 'react-icons/fi';
import { ImNewspaper } from 'react-icons/im';
import { Logo } from '~/components/Logo';
import { NavLink } from '~/components/Link';

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
                <NavLink to="/qui-sommes-nous">
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
                <a
                  href="https://meetings-eu1.hubspot.com/benjamin-boileux/discovery"
                  target="_blank"
                  className="btn btn--small btn--secondary"
                  rel="noreferrer"
                >
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
