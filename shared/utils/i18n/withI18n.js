import { I18nextProvider } from 'react-i18next';
import hoistNonReactStatics from 'hoist-non-react-statics';

import useI18nInstance from '$shared/utils/i18n/useI18Instance';

const withI18n = (WrappedComponent) => {
  const WithI18Next = (props) => {
    const i18n = useI18nInstance(props.i18Params);

    return (
      <I18nextProvider i18n={i18n}>
        <WrappedComponent {...props} />
      </I18nextProvider>
    );
  };

  return hoistNonReactStatics(WithI18Next, WrappedComponent);
};

export default withI18n;
