import { makeStyles, shorthands } from '@griffel/react';

export const useClasses = makeStyles({
  wrapper: {
    marginInlineStart: 'auto',
  },
  avatarTrigger: {
    appearance: 'none',
    ...shorthands.margin('0'),
    ...shorthands.padding('0'),
    ...shorthands.borderRadius('50%'),
    ...shorthands.borderWidth('0'),
    outlineWidth: 0,
    cursor: 'pointer',
    display: 'flex',
    ':hover': {
      opacity: 0.8,
    },
  },
});
