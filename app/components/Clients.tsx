const LogoImage: React.FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img className="inline-block max-h-[50px] max-w-[90px]" {...props} /> //eslint-disable-line jsx-a11y/alt-text
);

export function Clients() {
  return (
    <div className="hidden px-4 py-8 desktop:block">
      <ul className="flex items-center justify-center gap-12">
        <li className="text-center">
          <a href="https://www.getleeway.com" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/leeway-logo.png" alt="leeway" />
          </a>
        </li>
        <li>
          <a href="https://www.qare.fr" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/qare-logo.png" alt="qare" />
          </a>
        </li>
        <li>
          <a href="https://fr.qobra.co" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/qobra-logo.png" alt="qobra" />
          </a>
        </li>
        <li>
          <a href="https://citron.io" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/citron-logo.png" alt="citron" />
          </a>
        </li>
        <li>
          <a href="https://qonto.com" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/qonto-logo.png" alt="qonto" />
          </a>
        </li>
        <li>
          <a href="https://www.sortlist.fr" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/sortlist-logo.png" alt="sortlist" />
          </a>
        </li>
        <li>
          <a href="https://www.resilience.care" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/resilience-logo.png" alt="resilience" />
          </a>
        </li>
        <li>
          <a href="https://steeple.com" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/steeple-logo.png" alt="steeple" />
          </a>
        </li>
        <li>
          <a href="https://fabriq.tech" target="_blank" rel="noreferrer">
            <LogoImage src="/logos/fabriq-logo.png" alt="fabriq" />
          </a>
        </li>
      </ul>
    </div>
  );
}
