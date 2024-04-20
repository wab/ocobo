import * as accordion from './accordion';
import * as navigationMenu from './navigation-menu';
import * as scrollArea from './scroll-area';
import * as select from './select';

export const slotRecipes = {
  ...navigationMenu,
  ...select,
  ...scrollArea,
  ...accordion,
};
