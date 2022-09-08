import { makeStyles } from '@griffel/react';

export const useClasses = makeStyles({
  container: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '1rem',
    paddingLeft: '1rem',
    '@media (min-width: 640px)': {
      maxWidth: '640px',
    },
    '@media (min-width: 768px)': {
      maxWidth: '768px',
    },
    '@media (min-width: 1024px)': {
      maxWidth: '1024px',
    },
    '@media (min-width: 1280px)': {
      maxWidth: '1280px',
    },
  },
});
