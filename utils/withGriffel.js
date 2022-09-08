import hoistNonReactStatics from 'hoist-non-react-statics';

import { isServer } from '$shared/utils/stage';

import GriffelRendererProvider from '@/utils/GriffelRendererProvider';
import injectGlobalStyles from '@/styles/globals';

const withGriffel = (WrappedComponent) => {
  const WithGriffelRenderer = (props) => {
    if (isServer) {
      injectGlobalStyles();
    }
    return (
      <GriffelRendererProvider renderer={props.renderer}>
        <WrappedComponent {...props} />
      </GriffelRendererProvider>
    );
  };

  return hoistNonReactStatics(WithGriffelRenderer, WrappedComponent);
};

export default withGriffel;
