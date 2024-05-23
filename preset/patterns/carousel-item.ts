import { definePattern } from '@pandacss/dev';

export const carouselItem = definePattern({
  description: 'A carousel item',
  defaultValues: {
    shouldScrollSnapAlignStart: false,
  },
  properties: {
    // Whether to hide the scrollbar
    shouldScrollSnapAlignStart: { type: 'boolean' },
  },
  // disallow the properties (in TypeScript)
  blocklist: ['scrollSnapAlign'],
  transform(props) {
    const { shouldScrollSnapAlignStart, ...rest } = props;
    return {
      scrollSnapAlign: shouldScrollSnapAlignStart ? 'start' : 'initial',
      flexShrink: 0,
      ...rest,
    };
  },
});
