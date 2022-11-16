import { Logo } from '~/components/Logo';
import { Baseline } from '~/components/Baseline';

const colorsClasseNames = [
  { text: 'text-coral', background: 'bg-white', texture: 'bg-blue' },
  { text: 'text-dark', background: 'bg-light' },
  { text: 'text-dark', background: 'bg-blue' },
  { text: 'text-white', background: 'bg-dark' },
  { text: 'text-dark', background: 'bg-papaya' },
  { text: 'text-dark', background: 'bg-mint' },
  { text: 'text-dark', background: 'bg-coral' },
];

export default function Index() {
  const randomIndex = Math.floor(Math.random() * colorsClasseNames.length);
  return (
    <div
      className={`grid h-screen place-items-center ${colorsClasseNames[randomIndex]['background']} ${colorsClasseNames[randomIndex]['text']}`}
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <Logo width={280} className="absolute top-[1px] left-[2px] opacity-10" />
          <Logo width={280} className="relative" />
        </div>
        <Baseline />
      </div>
    </div>
  );
}
4;
