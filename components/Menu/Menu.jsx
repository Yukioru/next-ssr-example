import useLocale from '$shared/utils/useLocale';
import { mergeClasses } from '@griffel/react';
import cx from 'classnames';
import Link from 'next/link';
import { Fragment } from 'react';

import Popover from '../Popover';
import MenuPopoverContent from '../MenuPopoverContent';
import { useClasses } from './Menu.classes';

function Menu({ items = [], isTransparent }) {
  const classes = useClasses();
  const { t } = useLocale();
  const itemTransparent = mergeClasses(classes.item, classes.itemTransparent);
  const itemTransparentActive = mergeClasses(
    classes.item,
    classes.itemTransparent,
    classes.itemTransparentActive
  );
  const itemActive = mergeClasses(classes.item, classes.itemActive);

  return (
    <menu className={classes.menu}>
      {items.map((root) => {
        const renderComponent = ({ ref, open } = {}) => {
          const Component = root.href ? 'a' : 'div';
          return (
            <Component
              ref={ref}
              className={cx({
                [classes.item]: !isTransparent && !open,
                [itemTransparent]: isTransparent && !open,
                [itemTransparentActive]: isTransparent && open,
                [itemActive]: !isTransparent && open,
              })}
            >
              {t(root.title)}
            </Component>
          );
        };

        if (root.href) {
          return (
            <Link key={root.key} href={root.href}>
              {renderComponent()}
            </Link>
          );
        }

        if (root.items) {
          return (
            <Popover
              key={root.key}
              placement="bottom-start"
              offset={18}
              render={<MenuPopoverContent items={root.items} />}
            >
              {renderComponent}
            </Popover>
          );
        }

        return <Fragment key={root.key}>{content}</Fragment>;
      })}
    </menu>
  );
}

export default Menu;
