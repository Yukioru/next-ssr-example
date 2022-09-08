import { RendererProvider } from '@griffel/react';
import { createGriffelDOMRenderer } from '@/utils/createGriffelDOMRenderer';

function GriffelRendererProvider({ renderer, children }) {
  return (
    <RendererProvider renderer={renderer || createGriffelDOMRenderer()}>
      {children}
    </RendererProvider>
  );
}

export default GriffelRendererProvider;
