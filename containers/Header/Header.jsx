import { mergeClasses } from '@griffel/react';

import useGlobalContext from '$shared/utils/useGlobalContext';
import useHeader from '@/utils/useHeader';
import headerMenuItems from '@/utils/headerMenuItems';
import Menu from '@/components/Menu';
import UserMenu from '@/components/UserMenu';
import Container from '@/components/Container';

import { useClasses } from './Header.classes';

function Header() {
  const classes = useClasses();
  const ctx = useGlobalContext();
  const isTransparentHeader = useHeader({
    transparent: ctx.headerTransparent,
    trigger: 0,
  });

  const solidHeader = mergeClasses(classes.header, classes.solid);
  const transparentHeader = mergeClasses(classes.header, classes.transparent);

  return (
    <header
      className={isTransparentHeader ? transparentHeader : solidHeader}
    >
      <Container className={classes.inner}>
        <div>Logotype</div>
        <Menu items={headerMenuItems} isTransparent={isTransparentHeader} />

        <UserMenu isTransparent={isTransparentHeader} />
      </Container>
    </header>
  );
}

export default Header;
