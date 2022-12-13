import { Baseline } from './Baseline';
import { Logo } from '~/components/Logo';
import { FiMic, FiBookOpen, FiMail } from 'react-icons/fi';

const Link: React.FunctionComponent<React.HTMLProps<HTMLAnchorElement>> = ({ href, children }) => (
  <a
    href={href}
    className="flex cursor-pointer items-center gap-1 text-sm underline-offset-1 transition-colors duration-300 ease-in-out hover:text-coral"
  >
    {children}
  </a>
);

export function Navbar() {
  return (
    <div className="z-10 w-full bg-white bg-opacity-90 text-dark desktop:fixed">
      <div className="border-b-2 border-light border-opacity-20 bg-white bg-opacity-20">
        <div className="container mx-auto px-4">
          <nav className="items-center gap-4 py-4 desktop:flex desktop:h-28">
            <div className="flex w-full flex-1 flex-col gap-1">
              <Logo width={150} className="text-dark" />
              <Baseline />
            </div>
            <ul className="flex flex-col gap-4 py-4 font-title tablet:flex-row tablet:items-center">
              <li>
                <Link>
                  <FiBookOpen />
                  Articles
                </Link>
              </li>
              <li>
                <Link>
                  <FiMic />
                  Nous recrutons
                </Link>
              </li>
              <li>
                <a href="mailto:contact@ocobo.co" className="btn btn--small btn--secondary">
                  <FiMail />
                  Écrivons-nous
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
