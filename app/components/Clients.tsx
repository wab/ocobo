const LogoImage: React.FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img className="inline-block max-h-[50px] max-w-[90px]" {...props} /> //eslint-disable-line jsx-a11y/alt-text
);

export function Clients() {
  return (
    <div className="px-4 py-8">
      <ul className="flex flex-wrap items-center justify-center gap-12">
        <li className="text-center">
          <LogoImage src="/logos/leeway-logo.png" alt="leeway" />
        </li>
        <li>
          <LogoImage src="/logos/qare-logo.png" alt="qare" />
        </li>
        <li>
          <LogoImage src="/logos/qobra-logo.png" alt="qobra" />
        </li>
        {/* <li>
          <LogoImage src="/logos/citron-logo.png" alt="citron" />
        </li> */}
        <li>
          <LogoImage src="/logos/qonto-logo.png" alt="qonto" />
        </li>
        <li>
          <LogoImage src="/logos/sortlist-logo.png" alt="sortlist" />
        </li>
        <li>
          <LogoImage src="/logos/resilience-logo.png" alt="resilience" />
        </li>
        <li>
          <LogoImage src="/logos/steeple-logo.png" alt="steeple" />
        </li>
        <li>
          <LogoImage src="/logos/fabriq-logo.png" alt="fabriq" />
        </li>
      </ul>
    </div>
  );
}
