import { useContext } from 'react';
import GlobalContext from './GlobalContext';

function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  return ctx;
}

export default useGlobalContext;
