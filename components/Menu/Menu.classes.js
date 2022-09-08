import { makeStyles, shorthands } from '@griffel/react';

export const useClasses = makeStyles({
  menu: {
    display: 'flex',
    columnGap: '2px',
    paddingLeft: '0px',
  },
  item: {
    paddingLeft: '.85em',
    paddingRight: '.85em',
    paddingTop: '.6em',
    paddingBottom: '.6em',
    fontWeight: 500,
    fontSize: '.875rem',
    lineHeight: '1.25rem',
    backgroundColor: 'transparent',
    color: 'inherit',
    ...shorthands.borderRadius('var(--radius-default)'),
    transitionProperty: 'background-color',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-out',
    willChange: 'background-color',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--colors-menuHovered)',
    },
  },
  itemTransparent: {
    ':hover': {
      backgroundColor: 'var(--colors-menuTransparentHovered)',
    },
  },
  itemTransparentActive: {
    backgroundColor: 'var(--colors-menuTransparentHovered)',
  },
  itemActive: {
    backgroundColor: 'var(--colors-menuHovered)',
  },
});
