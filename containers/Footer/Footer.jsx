import useLocale from '$shared/utils/useLocale';
import Container from '@/components/Container';
import useGlobalContext from '$shared/utils/useGlobalContext';

import { useClasses } from './Footer.classes';

function Footer() {
  const classes = useClasses();
  const ctx = useGlobalContext();
  const { changeLocale, locale } = useLocale();
  return (
    <footer className={classes.footer}>
      <Container>
        <b>Footer</b>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <b>Язык: </b>
          <button
            onClick={() => changeLocale('ru')}
            style={{ background: locale === 'ru' ? 'gold' : 'unset' }}
          >
            Русский
          </button>
          <button
            onClick={() => changeLocale('en')}
            style={{ background: locale === 'en' ? 'gold' : 'unset' }}
          >
            English
          </button>
          <div style={{ marginLeft: 22 }}>
            <b>Тема: </b>
            <button onClick={() => ctx.changeTheme()}>Изменить</button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
