import { useMutation, useQueryClient } from 'react-query';

import fetcher from '$shared/utils/fetcher';
import redirectBackIfPossible from '$shared/utils/redirectBackIfPossible';
import useGlobalContext from '$shared/utils/useGlobalContext';

function Login() {
  const ctx = useGlobalContext();
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation((user) =>
    fetcher.post('/api/auth/login', user)
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const user = await mutateAsync(data);
    await queryClient.removeQueries('user');
    ctx.setContext('user', user);
    redirectBackIfPossible('/');
  }

  return (
    <div style={{ maxWidth: 320, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email">Электронная почта</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="mail@example.com"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="superPassword3000"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{ width: '100%', marginTop: 8 }}
        >
          {isLoading ? 'Подождите' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

Login.redirectAuthenticatedTo = '/';
// Login.redirectAuthenticatedTo = (ctx) => {
//   return ctx.isAuth ? '/demo' : '/auth/register';
// };

export default Login;
