/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { mergeClasses } from '@griffel/react';
import Link from 'next/link';

import useLocale from '$shared/utils/useLocale';

import { useClasses } from './MenuPopoverContent.classes';

function MenuPopoverContent({ items, close }) {
  const [hoveredKey, setHoveredKey] = useState(items?.[0]?.key);
  const classes = useClasses();
  const { t } = useLocale();

  function handleClose() {
    close?.();
  }

  const isExtraSection = items.some((root) => root.items);
  const hoveredItem = items.find((root) => root.key === hoveredKey);
  const rootItemHovered = mergeClasses(
    classes.rootItem,
    classes.rootItemHovered
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        {items.map((root) => {
          function handleSelectHovered() {
            setHoveredKey(root.key);
          }

          function handleClick(event) {
            if (root.onClick) root.onClick(event);
            handleClose();
          }

          const title = t(root.title);
          const Component = root.href ? 'a' : 'button';

          const content = (
            <Component
              key={root.key}
              type={!root.href ? 'button' : undefined}
              className={
                hoveredKey === root.key ? rootItemHovered : classes.rootItem
              }
              onClick={handleClick}
              onPointerEnter={handleSelectHovered}
            >
              {root.icon && <root.icon size={22} />}
              {title}
            </Component>
          );

          if (!root.href) {
            return content;
          }

          return (
            <Link key={root.key} href={root.href}>
              {content}
            </Link>
          );
        })}
      </div>
      {isExtraSection && (
        <div className={classes.extra}>
          {hoveredItem.items?.map((extra) => (
            <Link key={`${hoveredItem.key}-${extra.key}`} href={extra.href}>
              <a className={classes.extraItem} onClick={handleClose}>{t(extra.title)}</a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuPopoverContent;
