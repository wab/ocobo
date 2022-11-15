import { useTypewriter, Cursor } from 'react-simple-typewriter';

export const Baseline = () => {
  const [text] = useTypewriter({
    words: [
      'organizations',
      'marketing',
      'revenue',
      'data',
      'product',
      'engineering',
      'finance',
      'service',
      'success',
      'care',
      'legal',
      'people',
      'organizations',
    ],
  });
  return (
    <h1 className="relative text-center font-title text-xl font-normal desktop:text-4xl desktop:leading-[3rem]">
      operational connection between&hellip;
      <br />
      {text}
      <Cursor />
    </h1>
  );
};
