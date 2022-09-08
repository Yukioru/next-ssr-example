const headerMenuItems = [
  {
    key: 'home',
    title: 'menu.home',
    href: '/',
  },
  {
    key: 'overview',
    title: 'menu.dropdown',
    items: [
      {
        key: 'about',
        title: 'menu.test1',
        href: '/about',
      },
      {
        key: 'about2',
        title: 'menu.test2',
        href: '/about',
      },
      {
        key: 'about3',
        title: 'menu.test3',
        href: '/about',
      },
      {
        key: 'about4',
        title: 'menu.test4',
        href: '/about',
      },
    ],
  },
  {
    key: 'demo',
    title: 'menu.demo',
    href: '/demo',
  },
];

export default headerMenuItems;
