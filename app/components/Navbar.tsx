import { Baseline } from './Baseline';
import {
  // FiMic,
  // FiBookOpen,
  FiMail,
  FiSmile,
} from 'react-icons/fi';
import { Logo } from '~/components/Logo';
import { NavLink } from '~/components/Link';

export function Navbar() {
  return (
    <div className="z-10 w-full bg-white bg-opacity-90 text-dark desktop:fixed">
      <div className="border-b-2 border-light border-opacity-20 bg-white bg-opacity-20">
        <div className="container mx-auto px-4">
          <nav className="items-center gap-4 py-4 desktop:flex desktop:h-28">
            <NavLink to="/" className="flex w-full flex-1 flex-col gap-1">
              <Logo width={150} className="text-dark" />
              <Baseline />
            </NavLink>
            <ul className="flex flex-col gap-4 py-4 font-title tablet:flex-row tablet:items-center">
              {/* <li>
                <NavLink>
                  <FiBookOpen />
                  Articles
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <FiMic />
                  Nous recrutons
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/qui-sommes-nous">
                  <FiSmile />
                  Qui sommes-nous ?
                </NavLink>
              </li>
              <li>
                <a href="mailto:contact@ocobo.co" className="btn btn--small btn--secondary">
                  <FiMail />
                  Écrivez-nous
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
