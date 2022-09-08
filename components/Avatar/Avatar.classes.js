import { makeStyles, shorthands } from '@griffel/react';

export const useClasses = makeStyles({
  avatar: {
    ...shorthands.borderRadius('50%'),
    objectFit: 'cover',
    backgroundColor: 'var(--colors-menuHovered)',
  },
});
