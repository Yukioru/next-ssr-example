import { useMutation, useQueryClient } from 'react-query';

import useGlobalContext from '$shared/utils/useGlobalContext';
import fetcher from '$shared/utils/fetcher';

import Popover from '@/components/Popover';
import MenuPopoverContent from '@/components/MenuPopoverContent';
import Avatar from '@/components/Avatar';
import Menu from '@/components/Menu';

import { useClasses } from './UserMenu.classes';

function UserMenu({ isTransparent }) {
  const classes = useClasses();
  const ctx = useGlobalContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() =>
    fetcher.post('/api/auth/logout'),
    {
      onSuccess: () => {
        queryClient.removeQueries('user');
        ctx.setContext('user', {});
      },
    }
  );

  if (!ctx.isAuth) {
    return (
      <div className={classes.wrapper}>
        <Menu
          items={[
            {
              key: 'login',
              title: 'menu.login',
              href: '/auth/login',
            },
          ]}
          isTransparent={isTransparent}
        />
      </div>
    );
  }

  const menu = [
    {
      key: 'logout',
      title: 'menu.logout',
      onClick: mutate,
    },
  ];

  return (
    <div className={classes.wrapper}>
      <Popover
        placement="bottom-end"
        offset={18}
        render={<MenuPopoverContent items={menu} />}
      >
        <div className={classes.avatarTrigger}>
          <Avatar src={ctx.user?.avatar} alt={ctx.user?.name} size={36} />
        </div>
      </Popover>
    </div>
  );
}

export default UserMenu;
