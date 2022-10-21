import { Logo } from '~/components/Logo';

const colorsClasseNames = [
  { text: 'fill-coral', background: 'bg-white' },
  { text: 'fill-dark', background: 'bg-light' },
  { text: 'fill-dark', background: 'bg-blue' },
  { text: 'fill-black', background: 'bg-dark' },
  { text: 'fill-dark', background: 'bg-papaya' },
  { text: 'fill-dark', background: 'bg-mint' },
  { text: 'fill-dark', background: 'bg-coral' },
];

export default function Index() {
  const randomIndex = Math.floor(Math.random() * colorsClasseNames.length);
  return (
    <div
      className={`grid h-screen place-items-center ${colorsClasseNames[randomIndex]['background']}`}
    >
      <Logo className={colorsClasseNames[randomIndex]['text']} />
    </div>
  );
}
