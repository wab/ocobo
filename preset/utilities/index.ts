import { Config } from '@pandacss/dev';

import { animate } from './animate';

export const utilities: Config['utilities'] = {
  extend: {
    ...animate,
  },
};
