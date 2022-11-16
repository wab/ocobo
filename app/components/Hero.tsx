import { Baseline } from './Baseline';

export function Hero() {
  return (
    <header className="grid h-2/3 place-items-center rounded-2xl  p-16">
      <div className="flex flex-col items-center gap-8 text-center text-dark">
        <Baseline />
        <h2 className="text-3xl">La première agence française experte en Business Operations</h2>
      </div>
    </header>
  );
}
