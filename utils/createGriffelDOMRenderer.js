import { isClient } from '@/shared/utils/stage';
import { createDOMRenderer } from '@griffel/react';

const mediaQueryOrder = [
  '(min-width: 640px)',
  '(min-width: 768px)',
  '(min-width: 1024px)',
  '(min-width: 1280px)',
];

function compareMediaQueries(a, b) {
  return mediaQueryOrder.indexOf(a) - mediaQueryOrder.indexOf(b);
}

export function createGriffelDOMRenderer() {
  return createDOMRenderer(isClient ? document : undefined, {
    compareMediaQueries,
  });
}
