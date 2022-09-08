import { makeStyles, shorthands } from '@griffel/react';

export const useClasses = makeStyles({
  floating: {
    zIndex: 'var(--zIndexes-popover)',
    ...shorthands.borderRadius('var(--radius-default)'),
    boxShadow: 'inset 0 0 0 1px var(--colors-border), 0 4px 18px var(--colors-shadow)',
    '@supports (backdrop-filter: saturate(250%) blur(10px))': {
      backdropFilter: 'saturate(250%) blur(10px)',
      backgroundColor: 'var(--colors-paperTransparent)',
    },
    '@supports not (backdrop-filter: saturate(250%) blur(10px))': {
      backgroundColor: 'var(--colors-paperTransparentFallback)',
    },
  },
});