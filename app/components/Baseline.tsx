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
    <div className="relative pl-[2px] font-title text-xs tablet:text-sm">
      operational connection between&hellip;&nbsp;
      <span className="text-coral">{text}</span>
      <Cursor />
    </div>
  );
};
