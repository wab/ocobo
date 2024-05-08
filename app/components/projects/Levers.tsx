import { LeversData } from './LeversData';
import { LeversHeader } from './LeversHeader';
import { LeversIncome } from './LeversIncome';
import { LeversProcess } from './LeversProcess';
import { LeversTeam } from './LeversTeam';

const Levers = () => {
  return (
    <section>
      <LeversHeader />
      <LeversTeam />
      <LeversProcess />
      <LeversData />
      <LeversIncome />
    </section>
  );
};

export { Levers };
