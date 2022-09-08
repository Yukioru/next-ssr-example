import cx from 'classnames';

import useGlobalContext from '$shared/utils/useGlobalContext';
import Header from '@/containers/Header';
import Footer from '@/containers/Footer';

const MainLayout = ({ children }) => {
  const ctx = useGlobalContext();
  return (
    <>
      <Header />
      <main
        className={cx({
          'main--offset': ctx.headerTransparent,
        })}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
