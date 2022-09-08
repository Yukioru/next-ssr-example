import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  header: {
    position: 'fixed',
    top: '0px',
    width: '100%',
    zIndex: 'var(--zIndexes-header)',
    height: 'var(--sizes-headerHeight)',
  },
  solid: {
    boxShadow: 'inset 0 -1px 0 0 var(--colors-border)',
    '@supports (backdrop-filter: saturate(250%) blur(10px))': {
      backdropFilter: 'saturate(250%) blur(10px)',
      backgroundColor: 'var(--colors-paperHeaderTransparent)',
    },
    '@supports not (backdrop-filter: saturate(250%) blur(10px))': {
      backgroundColor: 'var(--colors-paperHeaderTransparentFallback)',
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    color: 'var(--colors-lightText)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
});
