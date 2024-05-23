interface IllustrationProps extends React.HTMLAttributes<HTMLImageElement> {
  name: string;
  extension?: 'svg' | 'png';
  alt?: string;
}

const Illustration: React.FunctionComponent<IllustrationProps> = ({
  name,
  extension = 'svg',
  alt,
  ...rest
}) => {
  return <img src={`/illus/${name}.${extension}`} alt={alt ?? ''} {...rest} />;
};

Illustration.displayName = 'Illustration';

export { Illustration };
