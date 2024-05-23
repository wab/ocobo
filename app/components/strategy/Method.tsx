import { css, cx } from '@ocobo/styled-system/css';
import { section } from '@ocobo/styled-system/recipes';

import { MethodEvaluation } from './MethodEvaluation';
import { MethodExecution } from './MethodExecution';
import { MethodHeader } from './MethodHeader';
import { MethodRoadmap } from './MethodRoadmap';

const Method = () => {
  return (
    <section className={css({})}>
      <div className={cx(section(), css({ bg: 'yellow.light' }))}>
        <MethodHeader />
        <MethodEvaluation />
      </div>
      <MethodRoadmap />
      <MethodExecution />
    </section>
  );
};

export { Method };
