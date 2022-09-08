import { makeStaticStyles } from '@griffel/react';
import { mauve, mauveDark, blackA, whiteA, sky } from '@radix-ui/colors';

const primaryColors = sky;

const injectGlobalStyles = makeStaticStyles({
  ':root': {
    '--font': "'Inter', 'Murecho', sans-serif",

    '--zIndexes-header': 20,
    '--zIndexes-popover': 30,
    '--radius-small': '6px',
    '--radius-default': '8px',

    '--colors-primary-50': primaryColors['50'],
    '--colors-primary-100': primaryColors['100'],
    '--colors-primary-200': primaryColors['200'],
    '--colors-primary-300': primaryColors['300'],
    '--colors-primary-400': primaryColors['400'],
    '--colors-primary-500': primaryColors['500'],
    '--colors-primary-600': primaryColors['600'],
    '--colors-primary-700': primaryColors['700'],
    '--colors-primary-800': primaryColors['800'],
    '--colors-primary-900': primaryColors['900'],
    '--colors-primary': 'var(--colors-primary-400)',
    '--colors-white': '#ffffff',

    '--sizes-headerHeight': '60px',
    '--sizes-footerHeight': '300px',
  },
  '.light': {
    '--colors-lightText': mauve.mauve1,
    '--colors-menuHovered': blackA.blackA4,
    '--colors-menuTransparentHovered': blackA.blackA7,
    '--colors-backgroundApp': mauve.mauve1,
    '--colors-textColor': mauve.mauve12,
    '--colors-paperHeader': mauve.mauve1,
    '--colors-paperHeaderTransparent': 'hsla(300, 20%, 99%, 0.8)',
    '--colors-paperHeaderTransparentFallback': 'hsla(300, 20%, 99%, 0.98)',
    '--colors-paper': 'var(--colors-white)',
    '--colors-paperTransparent': 'hsla(360, 100%, 100%, 0.8)',
    '--colors-paperTransparentFallback': 'hsla(360, 100%, 100%, 0.98)',
    '--colors-border': blackA.blackA4,
    '--colors-shadow': blackA.blackA3,
    '--colors-logo-1': 'var(--colors-primary)',
    '--colors-logo-2': 'var(--colors-textColor)',
  },
  '.dark': {
    '--colors-lightText': mauve.mauve1,
    '--colors-menuHovered': whiteA.whiteA5,
    '--colors-menuTransparentHovered': blackA.blackA7,
    '--colors-backgroundApp': mauveDark.mauve1,
    '--colors-textColor': mauveDark.mauve12,
    '--colors-paperHeader': mauveDark.mauve1,
    '--colors-paperHeaderTransparent': 'hsla(246, 6%, 9%, 0.8)',
    '--colors-paperHeaderTransparentFallback': 'hsla(246, 6%, 9%, 0.98)',
    '--colors-paper': mauveDark.mauve3,
    '--colors-paperTransparent': 'hsla(241, 5.0%, 14.3%, 0.8)',
    '--colors-paperTransparentFallback': 'hsla(241, 5.0%, 14.3%, 0.98)',
    '--colors-border': whiteA.whiteA4,
    '--colors-shadow': blackA.blackA6,
    '--colors-logo-1': 'var(--colors-primary-100)',
    '--colors-logo-2': 'var(--colors-textColor)',
  },
  'html, body': {
    minHeight: '100%',
    height: '100%',
  },
  body: {
    fontFamily: 'var(--font)',
    backgroundColor: 'var(--colors-backgroundApp)',
    margin: 0,
  },
  '#__next': {
    display: 'grid',
    gridAutoColumns: 'minmax(0, 1fr)',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    columnGap: '0',
    minHeight: '100%',
    gridTemplateRows: 'var(--sizes-headerHeight) 1fr var(--sizes-footerHeight)',
    gridTemplateAreas: '"header" "main" "footer"',
  },
  header: {
    gridRowStart: 'header',
  },
  main: {
    gridRowStart: 'main',
  },
  '.main--offset': {
    marginTop: 'calc(var(--sizes-headerHeight)*-1)',
  },
  footer: {
    gridRowStart: 'footer',
  },
  'body, a': {
    color: 'var(--colors-textColor)',
  },
  a: {
    textDecoration: 'none',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontWeight: 800,
  },
  '.icon': {
    userSelect: 'none',
  },
  '.dark .icon': {
    filter: 'invert(1)',
  },
  '*': {
    boxSizing: 'border-box',
  },
  '.lazy-load-image-background.opacity': {
    opacity: 0,
    transition: 'opacity .15s linear',
    willChange: 'opacity',
  },
  '.lazy-load-image-background.opacity.lazy-load-image-loaded': {
    opacity: 1,
  },
});

export default injectGlobalStyles;
