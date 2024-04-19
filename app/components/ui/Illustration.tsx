interface IllustrationProps {
  name: string;
}

const Illustration: React.FunctionComponent<IllustrationProps> = ({ name }) => {
  return <img src={`/illus/${name}.svg`} alt="" />;
};

Illustration.displayName = 'Illustration';

export { Illustration };
