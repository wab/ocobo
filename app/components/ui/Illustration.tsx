interface IllustrationProps extends React.HTMLAttributes<HTMLImageElement> {
  name: string;
  alt?: string;
}

const Illustration: React.FunctionComponent<IllustrationProps> = ({
  name,
  alt,
  ...rest
}) => {
  return <img src={`/illus/${name}.svg`} alt={alt ?? ''} {...rest} />;
};

Illustration.displayName = 'Illustration';

export { Illustration };
