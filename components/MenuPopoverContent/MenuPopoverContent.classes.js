import { makeStyles, shorthands } from '@griffel/react';

export const useClasses = makeStyles({
  wrapper: {
    ...shorthands.padding('1.25em'),
    color: 'var(--colors-textColor)',
    display: 'flex',
    columnGap: '1em',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '.25em',
    minWidth: '16ch',
  },
  extra: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '.425em',
    ...shorthands.borderLeft('1px', 'solid', 'var(--colors-border)'),
    paddingLeft: '1em',
    minWidth: '20ch',
  },
  rootItem: {
    ...shorthands.borderRadius('var(--radius-small)'),
    ...shorthands.borderWidth('0'),
    cursor: 'pointer',
    paddingBlockStart: '.5em',
    paddingBlockEnd: '.5em',
    paddingInlineStart: '1em',
    paddingInlineEnd: '1em',
    fontSize: '.875rem',
    minHeight: '2.5rem',
    fontWeight: 500,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    columnGap: '.75em',
    transitionProperty: 'background-color',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-out',
    color: 'currentcolor',
    
    ':hover': {
      backgroundColor: 'var(--colors-menuHovered)',
    },
  },
  rootItemHovered: {
    backgroundColor: 'var(--colors-menuHovered)',
  },
  extraItem: {
    fontSize: '.875rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
    opacity: .7,
    transitionProperty: 'opacity',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-out',

    ':hover': {
      opacity: 1,
    },
  },
});