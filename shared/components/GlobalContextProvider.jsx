import React, { useCallback, useEffect, useMemo, useState } from 'react';
import merge from 'lodash/merge';

import GlobalContext from '$shared/utils/GlobalContext';
import { isDev } from '$shared/utils/stage';
import setUserTheme from '$shared/utils/setUserTheme';

const GlobalContextProvider = ({ initialContext = {}, runtimeContext = {}, children }) => {
  const [state, setState] = useState(initialContext);

  // Fix blinking in HMR reload
  useEffect(() => {
    if (isDev) setUserTheme(state.theme);
  }, [state]);

  const setContext = useCallback((field, value) => {
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const changeTheme = useCallback(() => {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    setUserTheme(nextTheme);
    setContext('theme', nextTheme);
  }, [setContext, state]);

  const context = useMemo(() => {
    return {
      user: state.user,
      isAuth: Boolean(Object.keys(state.user || {}).length),
      theme: state.theme,
      host: state.host,
      headerTransparent: Boolean(runtimeContext.headerTransparent),
      setContext,
      changeTheme,
    };
  }, [state, runtimeContext, setContext, changeTheme]);

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
